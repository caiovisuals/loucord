import { createContext, useState, type ReactNode } from "react"

type User = {
    id: string
    name: string
    image?: string
}

type Session = {
    user: User
    token: string
}

export type AuthContextType = {
    session: Session | null
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(() => {
        try {
            const stored = localStorage.getItem("session")
            return stored ? (JSON.parse(stored) as Session) : null
        } catch {
            return null
        }
    })

    async function signIn(email: string, password: string) {
        const res = await fetch("http://localhost:3333/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) throw new Error("Erro no login")

        const data: Session = await res.json()
        setSession(data)
        localStorage.setItem("session", JSON.stringify(data))
    }

    function signOut() {
        setSession(null)
        localStorage.removeItem("session")
    }

    return (
        <AuthContext.Provider value={{ session, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}