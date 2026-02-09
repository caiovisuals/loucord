type User = {
    id: string
    name: string
    image: string
}

type ChatOptionsModalProps = {
    session?: { user: User | null }
    isOpen: boolean
    onClose: () => void
}

function ChatOptionsModal({ session, isOpen, onClose }: ChatOptionsModalProps) {
    return (
        <div onClick={onClose} className={`modal-popup flex items-center justify-center lou-modal-transition ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`p-10 bg-[var(--background)] rounded-2xl lou-modal-transition ${isOpen ? "scale-100" : "scale-95"}`}>
                
            </div>
        </div>
    )
}

export default ChatOptionsModal
