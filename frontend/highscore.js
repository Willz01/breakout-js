const scoreGrid = document.querySelector('.highscoreBoard')


async function fillBoard() {
  const userScores = await fetchHighScores()
  for (let user of userScores) {
    const scoreDiv = document.createElement('div')
    scoreDiv.style.width = 'auto'
    scoreDiv.style.height = '30px'
    scoreDiv.style.border = 'solid yellow 1px'
    scoreDiv.style.margin = '4px'

    const text = user.name + ': ' + user.score
    const h4 = document.createElement('h4')
    h4.innerHTML = `<i>${text}</i>`
    h4.style.fontSize = '1rem'
    h4.style.textAlign = 'center'
    scoreDiv.appendChild(h4)

    scoreGrid.appendChild(scoreDiv)
  }
}

fillBoard()

async function fetchHighScores() {
  let raw = await fetch('http://localhost:4444/scores')
  let scores = await raw.json()
  console.log(scores);
  return scores;
}

async function postScore(data = {}) {
  let url = 'http://localhost:4444/scores/' + data.name + '/' + data.score
  let raw = await fetch(url);
  let profile = await raw.json()
  return profile
}


// postScore({ name: "Wills", score: 12 })

