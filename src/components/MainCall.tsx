type User = {
    id: string
    name: string
    image: string
}

type MainCallProps = {
    user: User | null
}

function MainCall({ user }: MainCallProps) {
    return (
        <div className="h-full w-[75%] flex flex-col bg-[var(--middleground)] z-45">
        </div>
    )
}

export default MainCall
