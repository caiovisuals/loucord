type User = {
    id: string
    name: string
    image: string
}

type UserSettingsModalProps = {
    session?: { user: User | null }
    isOpen: boolean
    onClose: () => void
}

function UserSettingsModal({ session, isOpen, onClose }: UserSettingsModalProps) {
    return (
        <div onClick={onClose} className={`modal-background flex items-center justify-center lou-modal-transition ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`p-10 bg-[var(--background)] rounded-2xl lou-modal-transition ${isOpen ? "scale-100" : "scale-95"}`}>
                <div className="flex flex-row items-center gap-3">
                    <img src={session?.user?.image} alt={session?.user?.name} width={512} height={512} className="rounded-full aspect-square size-12"/>
                    <h2 className="text-xl">{session?.user?.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default UserSettingsModal
