import { Link } from "react-router-dom"

function App() {
    return (
        <div className="flex flex-col size-full overflow-hidden">
            <header className="flex flex-row w-full p-5">
                <div>Loucord</div>
                <div></div>
                <div>
                    <Link to="/home">Entrar</Link>
                </div>
            </header>
        </div>
    )
}

export default App
