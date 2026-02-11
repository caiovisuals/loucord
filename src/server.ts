import * as express from "express"
import cors from "cors"
import api from "./api"

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:5173",
    "http://localhost:3000"
]

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Não permitido pelo CORS"))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use("/api", api)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
})
