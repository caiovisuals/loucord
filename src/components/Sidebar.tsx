type User = {
    id: string
    name: string
    image: string
}

type SidebarProps = {
    session?: { user: User | null }
    users: User[]
    user: User | null
    onSelectUser: (user: User | null) => void
    onOpenUserSettings: () => void
    currentView: "chat" | "call" 
    onChangeView: (view: "chat" | "call") => void
}

function Sidebar({ session, users, user: selectedUser, onSelectUser, onOpenUserSettings, currentView, onChangeView }: SidebarProps) {
    return (
        <aside className="h-full w-[25%] flex flex-row z-50">
            <div className="p-2 h-full flex flex-col gap-2 bg-[var(--darkground)]">
                <button onClick={() => onChangeView("chat")} className={`p-2.5 hover:bg-[var(--primaryground)] rounded-full lou-transition cursor-pointer ${
                        currentView === "chat"
                            ? "bg-[var(--foreground)]"
                            : "bg-[var(--middleground)]"
                    }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
                    </svg>
                </button>
                <button onClick={() => onChangeView("call")} className={`p-2.5 hover:bg-[var(--primaryground)] rounded-full lou-transition cursor-pointer ${
                        currentView === "call"
                            ? "bg-[var(--foreground)]"
                            : "bg-[var(--middleground)]"
                    }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
                    </svg>
                </button>
            </div>
            <div className="size-full flex flex-col gap-2 p-3">
                <div className="p-2">
                    <h2 className="text-lg">
                        {currentView === "chat" ? "Mensagens" : "Ligações"}
                    </h2>
                </div>
                <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
                    {users.map(user => {
                        const isSelected = selectedUser?.id === user.id
                        return (
                            <div key={user.id} onClick={() => onSelectUser(user)} className={`flex flex-row items-center gap-3 cursor-pointer hover:bg-[var(--primaryground)] p-2 rounded-xl lou-transition ${isSelected ? "bg-[var(--primaryground)]" : "bg-[var(--foreground)]"} `}>
                            <img src={user.image} alt={user.name} width={512} height={512} className="rounded-full aspect-square size-8"/>
                            <span>{user.name}</span>
                        </div>
                    )})}
                </div>
                {session?.user && (
                    <div key={session.user.id} onClick={onOpenUserSettings} className={`mt-auto justify-self-end flex flex-row items-center gap-3 cursor-pointer bg-[var(--foreground)] hover:bg-[var(--primaryground)] p-2 rounded-xl lou-transition`}>
                        <img src={session.user.image} alt={session.user.name} width={512} height={512} className="rounded-full aspect-square size-8"/>
                        <span>{session.user.name}</span>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar
