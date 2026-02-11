import { Request, Response, NextFunction } from "express"
import { verifyToken } from "./jwt"

export interface AuthRequest extends Request {
    user?: {
        userId: number
        email: string
    }
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: "Token vazio" })
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ 
            error: "Formato de token inválido" 
        })
    }

    const token = parts[1]

    try {
        const decoded = verifyToken(token) as {
            userId: number
            email: string
        }

        req.user = decoded
        next()
    } catch {
        return res.status(401).json({ error: "Token inválido" })
    }
}