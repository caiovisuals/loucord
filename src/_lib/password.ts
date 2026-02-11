import bcrypt from "bcryptjs"

const SALT_ROUNDS = 12 // Aumentar para produção

export async function hashPassword(password: string): Promise<string> {
    if (password.length < 8) {
        throw new Error("Senha deve ter no mínimo 8 caracteres")
    }
    
    if (!/[A-Z]/.test(password)) {
        throw new Error("Senha deve conter ao menos uma letra maiúscula")
    }
    
    if (!/[a-z]/.test(password)) {
        throw new Error("Senha deve conter ao menos uma letra minúscula")
    }
    
    if (!/[0-9]/.test(password)) {
        throw new Error("Senha deve conter ao menos um número")
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
        throw new Error("Senha deve conter ao menos um caractere especial")
    }
    
    return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
    password: string, 
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash)
}