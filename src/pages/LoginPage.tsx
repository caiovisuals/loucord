import { useState } from "react"
import { useSession } from "../_contexts/useSession"

function LoginPage() {
    const { signIn, isLoading } = useSession()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        await signIn(email, password)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
            <div className="w-full max-w-md p-8 bg-[var(--foreground)] rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 bg-[var(--primaryground)] rounded-lg outline-none"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full p-3 bg-[var(--primaryground)] rounded-lg outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium lou-transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processando..." : "Entrar"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister)
                            setError("")
                        }}
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Não tem uma conta? Cadastre-se
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage