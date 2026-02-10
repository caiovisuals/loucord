import * as express from "express"
import cors from "cors"
import api from "./api"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", api)

app.listen(3333, () => {
    console.log("API rodando no http://localhost:3333")
})
