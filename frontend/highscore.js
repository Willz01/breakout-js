const scoreGrid = document.querySelector('.highscoreBoard')

function fillBoard() {
  let name = "Wills"
  let score = 11

  const scoreDiv = document.createElement('div')
  scoreDiv.style.width = 'auto'
  scoreDiv.style.height = '30px'
  scoreDiv.style.border = 'solid yellow 1px'
  scoreDiv.style.margin = '4px'

  const text = name + ': ' + score
  const h4 = document.createElement('h4')
  h4.innerHTML = `<i>${text}</i>`
  h4.style.fontSize = '1rem'
  h4.style.textAlign = 'center'
  scoreDiv.appendChild(h4)

  scoreGrid.appendChild(scoreDiv)
}

fillBoard()

async function fetchHighScores() {
  let raw = await fetch('http://localhost:4444/scores')
  let scores = await raw.json()
  console.log(scores);
  return scores;
}

async function postScore(data = {}) {
  const url = 'http://localhost:4444/scores'
  const score = await fetch(url, {
    method: 'POST',
    mode: 'no cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  });
  return score.json();
}
