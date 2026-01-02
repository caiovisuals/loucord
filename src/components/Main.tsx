type User = {
    id: string
    name: string
    image: string
}

type MainProps = {
    user: User | null
}

function Main({ user }: MainProps) {
    return (
        <div className="h-full w-[82%] flex flex-col bg-[var(--middleground)] z-45">
            <header className="flex flex-row gap-4 p-5">                
                {user ? (
                    <>
                        <h1>Conversa com {user.name}</h1>
                    </>
                ) : (
                    <h1>Selecione uma conversa</h1>
                )}
            </header>
            <div>
                
            </div>
        </div>
    )
}

export default Main
