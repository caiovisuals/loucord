import { Server as SocketIOServer } from "socket.io"
import { Server as HTTPServer } from "http"
import { prisma } from "@/_lib/prisma"
import { verifyToken } from "@/_lib/jwt"

export function setupWebSocket(httpServer: HTTPServer) {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
            credentials: true
        },
        pingTimeout: 60000,
        pingInterval: 25000
    })

    // Middleware de autenticação
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token
            
            if (!token) {
                return next(new Error("Token não fornecido"))
            }

            const decoded = verifyToken(token)
            socket.data.user = decoded
            next()
        } catch (error) {
            next(new Error("Autenticação falhou"))
        }
    })

    io.on("connection", (socket) => {
        const userId = socket.data.user.userId
        
        console.log(`Usuário ${userId} conectado`)

        // Entrar em sala privada do usuário
        socket.join(`user:${userId}`)

        // Mensagem de chat
        socket.on("chat:message", async (data) => {
            try {
                const { chatId, content } = data
                
                // Validar e salvar mensagem no banco
                const message = await prisma.message.create({
                    data: {
                        content,
                        senderId: userId,
                        chatId: parseInt(chatId)
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        }
                    }
                })

                // Enviar para todos os participantes do chat
                const chat = await prisma.chat.findUnique({
                    where: { id: parseInt(chatId) },
                    include: {
                        participants: {
                            select: { userId: true }
                        }
                    }
                })

                chat?.participants.forEach(participant => {
                    io.to(`user:${participant.userId}`)
                        .emit("chat:message", message)
                })

            } catch (error) {
                socket.emit("error", { message: "Erro ao enviar mensagem" })
            }
        })

        // Usuário digitando
        socket.on("chat:typing", (data) => {
            const { chatId } = data
            socket.to(`chat:${chatId}`).emit("chat:typing", {
                userId,
                chatId
            })
        })

        // Chamada de vídeo
        socket.on("call:offer", (data) => {
            const { targetUserId, offer } = data
            io.to(`user:${targetUserId}`).emit("call:offer", {
                from: userId,
                offer
            })
        })

        socket.on("call:answer", (data) => {
            const { targetUserId, answer } = data
            io.to(`user:${targetUserId}`).emit("call:answer", {
                from: userId,
                answer
            })
        })

        socket.on("disconnect", async () => {
            console.log(`Usuário ${userId} desconectado`)
            
            // Atualizar status no banco
            await prisma.user.update({
                where: { id: userId },
                data: { 
                    status: "OFF",
                    lastSeenAt: new Date()
                }
            })

            // Notificar outros usuários
            io.emit("user:offline", { userId })
        })
    })

    return io
}