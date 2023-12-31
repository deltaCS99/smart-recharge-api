require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const { dbConnection } = require("./src/config/db")
const PORT = process.env.PORT || 3000

const app = express()

dbConnection()

app.use(express.json())
app.use(morgan("dev"))
app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})

app.get("/", (req, res) => {
    res.status(200).json("Hey this is my API running 🥳")
})

app.use("/api/users", require("./src/routes/userRoutes"))
app.use("/api/cards", require("./src/routes/cardRoutes"))
app.use("/api/smartcards", require("./src/routes/smartRoutes"))

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})