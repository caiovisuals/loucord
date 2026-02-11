import { useSession } from "@/_contexts/useSession"
import type { Session } from "@/_contexts/AuthContext"
import { useState, useEffect } from "react"
import MainChat from "@/_components/MainChat"
import MainCall from "@/_components/MainCall"
import Sidebar from "@/_components/Sidebar"
import UserSettingsModal from "@/_components/modals/UserSettingsModal"

type User = {
    id: string
    name: string
    image: string
}

type ViewMode = "chat" | "call"

function Home() {
    const { session } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>("chat")
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (!session) return

        fetch("http://localhost:3333/api/users", {
            headers: {
                Authorization: `Bearer ${session?.token}`,
            },
        })

        .then(res => res.json())
        .then(data => setUsers(data))
    }, [session])

    return (
        <div className="flex flex-row size-full overflow-hidden">
            <Sidebar 
                session={session} 
                users={users} 
                user={selectedUser} 
                onSelectUser={(user) => {
                    setSelectedUser(user)
                    setViewMode("chat")
                }}
                onOpenUserSettings={() => setIsModalOpen(true)}
                currentView={viewMode}
                onChangeView={setViewMode}
            />
            {viewMode === "chat" && (
                <MainChat user={selectedUser} />
            )}
            {viewMode === "call" && (
                <MainCall user={selectedUser} />
            )}
            <>
                <UserSettingsModal 
                    session={session}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </>
        </div>
    )
}

export default Home
