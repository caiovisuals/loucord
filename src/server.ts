import * as express from "express"
import cors from "cors"
import api from "./api"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", api)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
})
