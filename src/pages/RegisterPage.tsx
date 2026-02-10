import { useState } from "react"
import { useSession } from "../_contexts/useSession"

function RegisterPage() {
    const { signIn, isLoading } = useSession()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        try {
            const res = await fetch("http://localhost:3333/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Erro no registro")
            }

            const data = await res.json()
            localStorage.setItem("session", JSON.stringify(data))
            window.location.reload()
        } catch {
            setError(error || "Erro ao processar requisição")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
            <div className="w-full max-w-md p-8 bg-[var(--foreground)] rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Criar Conta
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">
                            Nome
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 bg-[var(--primaryground)] rounded-lg outline-none"
                            placeholder="Seu nome"
                        />
                    </div>

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
                        {isLoading ? "Processando..." : "Criar Conta"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setError("")
                        }}
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Já tem uma conta? Faça login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage