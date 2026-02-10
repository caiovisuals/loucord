import { useContext } from "react"
import { AuthContext, type AuthContextType } from "./AuthContext"

export function useSession(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useSession deve ser usado dentro de AuthProvider")
    return context
}