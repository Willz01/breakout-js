const express = require('express')
const fs = require('fs')
const cors = require('cors')
const scoresDB = require('./database')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Willz01:Elev6477@cluster0.fsz9p.mongodb.net/user-scores?retryWrites=true&w=majority")
const db = mongoose.connection;


db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to DB"))

const PORT = 4444
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    type: "application/json"
  })
)

app.get("/scores", scoresDB.getAllScores)

app.get("/scores/:name/:score", scoresDB.addScore)

app.listen(PORT, () => {
  console.log(`Breakout logger running at PORT: ${PORT}`);
})