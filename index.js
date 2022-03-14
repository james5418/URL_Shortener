const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use(express.static('public'))

const showRouter = require("./routes/show")
app.use("/show", showRouter)

const shortenerRouter = require("./routes/shortener")
app.use("/api/v1/urls", shortenerRouter)

const redirectRouter = require("./routes/redirect")
app.use("/", redirectRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`)
})