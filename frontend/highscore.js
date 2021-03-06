const scoreGrid = document.querySelector('.highscoreBoard')

scoreGrid.classList.add('overflow-auto')

// fill highscore board with read high scores
async function fillBoard() {
  let userScores = await fetchHighScores()

  const title = document.createElement('h4') // HIGHSCORE -description
  title.innerText = 'Highscores'
  title.style.textAlign = 'center'
  title.style.color = randomRGB()
  scoreGrid.appendChild(title)


  for (let user of userScores) {
    const scoreDiv = document.createElement('div')  // single score div
    scoreDiv.style.width = 'auto'
    scoreDiv.style.height = '30px'
    scoreDiv.style.border = 'solid yellow 1px'
    scoreDiv.style.margin = '4px'
    scoreDiv.addEventListener('mouseenter', () => {
      scoreDiv.style.backgroundColor = randomRGB()
    })

    const text = user.name + ': ' + user.score
    const h4 = document.createElement('h4') // username and score
    h4.innerHTML = `<i>${text}</i>`
    h4.style.fontSize = '1rem'
    h4.style.textAlign = 'center'
    scoreDiv.appendChild(h4)

    scoreGrid.appendChild(scoreDiv)
  }
}

fillBoard()

// fetch sorted highscores list from backend server (app.js)
async function fetchHighScores() {
  let raw = await fetch('http://localhost:4443/scores')
  let scores = await raw.json()
  console.log(scores);
  return scores;
}

// post new scores to backend
async function postScore(data = {}) {
  let url = 'http://localhost:4443/scores/' + data.name + '/' + data.score
  let raw = await fetch(url);
  let profile = await raw.json()
  return profile
}


// postScore({ name: "Wills", score: 12 })

