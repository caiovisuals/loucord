import rateLimit from "express-rate-limit"

// Limite de requisições para login
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // número máximo de tentativas por IP dentro do período
    standardHeaders: true, // retorna informações de limite nos headers +RateLimit-+
    legacyHeaders: false,   // desativa headers +X-RateLimit-+
    message: {
        error: "Muitas tentativas de login. Tente novamente em 15 minutos."
    },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json(options.message)
    },
    keyGenerator: (req) => {
        return req.ip || "unknown" // garante que sempre retorne uma string
    }
})

// Você pode criar outros limiters, por exemplo para registro ou reset de senha
export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10,
    message: {
        error: "Muitas tentativas de registro. Tente novamente mais tarde."
    },
    standardHeaders: true,
    legacyHeaders: false
})
