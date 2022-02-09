const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: String,
  score: Number
})

const user = mongoose.model('breakout-scores', userSchema)

async function addScore(req, res, next) {
  const { name, score } = req.params
  const newScore = new user({ name: name, score: parseInt(score) })
  await newScore.save()
  res.status(200).json(newScore)
}

async function getAllScores(req, res, next) {
  let userScores;
  try {
    userScores = await user.find().sort({ score: 'desc' })
    console.log(userScores);
    res.status(200).json(userScores)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

exports.addScore = addScore
exports.getAllScores = getAllScores


