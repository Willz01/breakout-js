const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: String,
  score: String
})

const user = mongoose.model('breakout-scores', userSchema)

async function addScore(req, res, next) {
  const newScore = new user(req.params)
  await newScore.save()

  res.status(200).json(newScore)
}

async function getAllScores(req, res, next) {
  let userScores;
  try {
    userScores = await user.find();
    res.status(200).json(userScores)

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

exports.addScore = addScore
exports.getAllScores = getAllScores


