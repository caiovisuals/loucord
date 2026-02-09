    import { useEffect, useRef, useState } from "react"

    type User = {
        id: string
        name: string
        image: string
    }

    type Message = {
        id: string
        senderId: string
        content: string
        createdAt: Date
    }

    type MainChatProps = {
        user: User | null
    }

    function MainChat({ user }: MainChatProps) {
        const [messages, setMessages] = useState<Message[]>([])
        const [text, setText] = useState("")
        const bottomRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            if (user) setMessages([])
        }, [user])

        useEffect(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }, [messages])

        function sendMessage(content: string) {
            if (!user || !content.trim()) return

            // Futuro: enviar via WebSocket
            setMessages(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    senderId: "1",
                    content,
                    createdAt: new Date(),
                },
            ])
        }

        function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()

                if (text.trim() === "") return

                sendMessage(text)
                setText("")
            }
        }

        return (
            <div className="h-full w-[75%] flex flex-col bg-[var(--middleground)] z-45">
                <header className="min-h-18 flex flex-row items-center justify-between gap-4 p-5">                
                    {user ? (
                        <>
                            <h1>Conversa com {user.name}</h1>
                        </>
                    ) : (
                        <h1>Selecione uma conversa</h1>
                    )}
                    {user && (
                        <div className="flex flex-row items-center gap-2">
                            <button className="p-1 hover:bg-[var(--primaryground)] rounded-full lou-transition cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
                                </svg>
                            </button>
                            <button className="p-1 hover:bg-[var(--primaryground)] rounded-full lou-transition cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </header>
                <div className="flex-1 flex items-center justify-center h-full">
                    {!user ? (
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-xl">
                                Ops! Não há nada por aqui.
                            </span>
                            <span className="text-[var(--subtext)]">
                                Nenhuma conversa foi selecionada.
                            </span>
                        </div>
                    ) : (
                        <div className="p-3 flex-1 flex flex-col">
                            <div className="h-full flex-1 overflow-y-auto scrollbar-hide">
                                <div className="flex flex-col gap-2">
                                    {messages.map(message => {
                                        const isMe = message.senderId === "1"

                                        return (
                                            <div
                                                key={message.id}
                                                className={`max-w-[70%] p-3 rounded-xl text-sm
                                                    ${isMe
                                                        ? "ml-auto bg-blue-500 text-[var(--text)]"
                                                        : "mr-auto bg-[var(--primaryground)]"
                                                    }
                                                `}
                                            >
                                                {message.content}
                                            </div>
                                        )
                                    })}
                                    <div ref={bottomRef} />
                                </div>
                            </div>
                            <textarea 
                                id="chatbox" 
                                value={text} 
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                maxLength={1500} 
                                placeholder="Mensagem" 
                                className="p-3 py-2 bg-[var(--primaryground)] rounded-xl w-full resize-none outline-none"
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }

    export default MainChat
