import { useState } from "react"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import UserSettingsModal from "./components/models/UserSettingsModal"

type User = {
    id: string
    name: string
    image: string
}

const session = {
    user: {
        id: "1",
        name: "João",
        image: "https://i.pravatar.cc/150?img=3",
    },
}

const users = [
    {
        id: "2",
        name: "Caio",
        image: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: "3",
        name: "Ana",
        image: "https://i.pravatar.cc/150?img=2",
    },
]

function App() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex flex-row size-full">
            <Sidebar 
                session={session} 
                users={users} 
                user={selectedUser} 
                onSelectUser={setSelectedUser}
                onOpenUserSettings={() => setIsModalOpen(true)} 
            />
            <Main 
                user={selectedUser}
            />
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

export default App
