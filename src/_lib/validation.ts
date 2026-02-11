import { z } from "zod"

export const registerSchema = z.object({
    name: z.string()
        .min(2, "Nome muito curto")
        .max(50, "Nome muito longo")
        .regex(/^[a-zA-Z\s]+$/, "Nome inválido"),
    email: z.string()
        .email("Email inválido")
        .toLowerCase(),
    password: z.string()
        .min(8, "Senha muito curta")
        .max(100, "Senha muito longa")
})

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha obrigatória")
})