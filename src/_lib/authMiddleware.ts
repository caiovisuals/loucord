import { Request, Response, NextFunction } from "express"
import { verifyToken } from "./jwt"

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: "Token vazio" })
    }

    const [, token] = authHeader.split(" ")

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({ error: "Token inválido" })
    }
}
