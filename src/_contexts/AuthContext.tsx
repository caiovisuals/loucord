import { createContext, useState, useEffect, type ReactNode } from "react"

type User = {
    id: string
    name: string
    email: string
    image?: string
}

type Session = {
    user: User
    token: string
    refreshToken: string
}

export type AuthContextType = {
    session: Session | null
    isLoading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => void
    refreshSession: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const stored = localStorage.getItem("session")
            if (stored) {
                const parsed = JSON.parse(stored) as Session
                setSession(parsed)
            }
        } catch (error) {
            console.error("Erro ao carregar sessão:", error)
            localStorage.removeItem("session")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!session?.refreshToken) return

        const interval = setInterval(async () => {
            await refreshSession()
        }, 15 * 60 * 1000) // 15 minutos

        return () => clearInterval(interval)
    }, [session])

    async function signIn(email: string, password: string) {
        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:3333/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Erro no login")
            }

            const data: Session = await res.json()
            setSession(data)
            localStorage.setItem("session", JSON.stringify(data))
        } catch (error) {
            console.error("Erro no login:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    async function refreshSession() {
        if (!session?.refreshToken) return

        try {
            const res = await fetch("http://localhost:3333/api/auth/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    refreshToken: session.refreshToken 
                }),
            })

            if (!res.ok) {
                throw new Error("Erro ao renovar sessão")
            }

            const { token } = await res.json()
            
            const newSession = {
                ...session,
                token
            }
            
            setSession(newSession)
            localStorage.setItem("session", JSON.stringify(newSession))
        } catch (error) {
            console.error("Erro ao renovar sessão:", error)
            signOut()
        }
    }

    function signOut() {
        setSession(null)
        localStorage.removeItem("session")
    }

    return (
        <AuthContext.Provider value={{ 
            session, 
            isLoading,
            signIn, 
            signOut,
            refreshSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}