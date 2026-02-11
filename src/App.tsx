import { useSession } from "@/_contexts/useSession"
import { Link } from "react-router-dom"

function App() {
    const { session, isLoading } = useSession()

    if (isLoading) {
        return <div>Carregando...</div>
    }
    
    return (
        <div className="flex flex-col size-full overflow-hidden">
            <header className="flex flex-row w-full p-5">
                <div>Loucord</div>
                <div>teste  </div>
                <div>
                    {session ? (
                        <Link to="/home">Entrar</Link>
                    ) : (
                        <Link to="/login">Faça Login</Link>
                    )}
                </div>
            </header>
        </div>
    )
}

export default App
