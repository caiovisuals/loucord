import { Router } from "express"
import { prisma } from "@/_lib/prisma"
import { authMiddleware } from "@/_lib/authMiddleware"

const router = Router()

router.get("/", authMiddleware, async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
        id: true,
        name: true,
        image: true,
        status: true,
        },
    })

    res.json(users)
})

export default router
