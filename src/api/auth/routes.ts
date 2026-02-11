import { Router } from "express"
import { loginLimiter } from "@/_lib/rateLimiter"
import { registerSchema, loginSchema } from "@/_lib/validation"
import { hashPassword, verifyPassword } from "@/_lib/password"
import { signToken, signRefreshToken } from "@/_lib/jwt"
import { prisma } from "@/_lib/prisma"

const router = Router()

// Registro
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = registerSchema.parse(req.body)
        
        // Verificar se usuário já existe
        const exists = await prisma.user.findUnique({
            where: { email }
        })
        
        if (exists) {
            return res.status(400).json({ 
                error: "Email já cadastrado" 
            })
        }
        
        // Hash da senha
        const hashedPassword = await hashPassword(password)
        
        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                image: ""
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })
        
        // Gerar tokens
        const token = signToken({ 
            userId: user.id, 
            email: user.email 
        })
        
        const refreshToken = signRefreshToken({ 
            userId: user.id 
        })
        
        res.status(201).json({
            user,
            token,
            refreshToken
        })
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                error: error.errors[0].message 
            })
        }
        
        console.error("Erro no registro:", error)
        res.status(500).json({ 
            error: "Erro ao criar conta" 
        })
    }
})

// Login
router.post("/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body)
        
        // Buscar usuário
        const user = await prisma.user.findUnique({
            where: { email }
        })
        
        if (!user) {
            return res.status(401).json({ 
                error: "Credenciais inválidas" 
            })
        }
        
        // Verificar senha
        const isValid = await verifyPassword(password, user.password)
        
        if (!isValid) {
            return res.status(401).json({ 
                error: "Credenciais inválidas" 
            })
        }
        
        // Atualizar último acesso
        await prisma.user.update({
            where: { id: user.id },
            data: { 
                lastSeenAt: new Date(),
                status: "ONLINE"
            }
        })
        
        // Gerar tokens
        const token = signToken({ 
            userId: user.id, 
            email: user.email 
        })
        
        const refreshToken = signRefreshToken({ 
            userId: user.id 
        })
        
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            token,
            refreshToken
        })
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                error: error.errors[0].message 
            })
        }
        
        console.error("Erro no login:", error)
        res.status(500).json({ 
            error: "Erro ao fazer login" 
        })
    }
})

// Refresh Token
router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body
        
        if (!refreshToken) {
            return res.status(401).json({ 
                error: "Refresh token obrigatório" 
            })
        }
        
        const decoded = verifyRefreshToken(refreshToken)
        
        const newToken = signToken({ 
            userId: decoded.userId, 
            email: decoded.email 
        })
        
        res.json({ token: newToken })
        
    } catch (error) {
        res.status(401).json({ 
            error: "Refresh token inválido" 
        })
    }
})

export default router