import express from "express"
import cors from "cors"
import connectDB from "./config/mongodb.js"
import "dotenv/config"

// App Config
const app = express()
const port = 4000

connectDB();


// MiddleWares
app.use(express.json())

app.use(cors())


app.listen(port, ()=> console.log("Server Started", port)
)
