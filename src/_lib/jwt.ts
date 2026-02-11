import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets não configurados")
}

export function signToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { 
        expiresIn: "15m"
    })
}

export function signRefreshToken(payload: object) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { 
        expiresIn: "7d" 
    })
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        throw new Error("Token inválido ou expirado")
    }
}

export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET)
    } catch (error) {
        throw new Error("Refresh token inválido")
    }
}