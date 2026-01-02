type User = {
    id: string
    name: string
    image: string
}

type SidebarProps = {
    session?: { user: User | null }
    users: User[]
    user: User | null
    onSelectUser: (user: User) => void
    onOpenUserSettings: () => void
}

function Sidebar({ session, users, user: selectedUser, onSelectUser, onOpenUserSettings }: SidebarProps) {
    return (
        <aside className="h-full w-[18%] flex flex-col gap-2 p-3 z-50">
            <div className="p-2">
                <h2 className="text-lg">Mensagens</h2>
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
        </aside>
    )
}

export default Sidebar
