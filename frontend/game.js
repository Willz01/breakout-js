const grid = document.querySelector('.grid')
const score = document.querySelector('.score')
const startButton = document.querySelector('#startBtn')

const blkW = 100
const blkH = 20

const controllerPOS = [230, 10] // 570px/2 = 285px - blkW/2
let currentPosition = controllerPOS

const ballStart = [270, 30]
let ballCurrentPosition = ballStart
const ballDiameter = 20

let intervalID
let xD = 2
let yD = 2
let hits = 0


class Block {
  constructor(x, y) {
    this.bottomLeft = [x, y]
    this.bottomRight = [x + blkW, y]
    this.topLeft = [x, y + blkH]
    this.topRight = [x + blkW, y + blkH]
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240), //down
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210), //down
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

console.log(blocks[0]);

const polluteGrid = () => {
  for (let i = 0; i < blocks.length; i++) {
    const blk = document.createElement('div')
    blk.classList.add('block')
    blk.style.left = blocks[i].bottomLeft[0] + 'px'
    blk.style.bottom = blocks[i].bottomLeft[1] + 'px'
    blk.style.backgroundColor = 'red'
    grid.appendChild(blk)
  }
}
polluteGrid()


startButton.addEventListener('click', () => {
  // HERE
  document.addEventListener('keydown', moveController)
  // HERE
  intervalID = setInterval(moveBall, 20)
})


const controller = document.createElement('div')
controller.classList.add('controller')
drawController()
grid.appendChild(controller)

function drawController() {
  controller.style.left = currentPosition[0] + 'px'
  controller.style.bottom = currentPosition[1] + 'px'
}


const moveController = (e) => {
  if (e.key === 'ArrowLeft' && currentPosition[0] > 0) {
    //  move controller 10 px left at each keydown
    currentPosition[0] -= 20
    drawController()
  } else if (e.key === 'ArrowRight' && currentPosition[0] < 570 - blkW) {
    //  move controller 10 px right at each keydown
    currentPosition[0] += 20
    drawController()
  } else if (e.key === ' ') {
    document.location.reload()
  }
}



const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

function moveBall() {
  ballCurrentPosition[0] += xD
  ballCurrentPosition[1] += yD
  drawBall()
  solveCollisions()
}


function solveCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    // block collision
    if (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
    ) {

      const blks = Array.from(document.querySelectorAll('.block'))
      blks[i].classList.remove('block')
      blocks.splice(i, 1)
      hits++
      score.innerText = 'Score: ' + hits + ' points'
      changeTrajectory()

      if (blocks.length === 0) {
        score.innerText = 'You win!'
        score.style.backgroundColor = randomRGB()
        clearInterval(intervalID)
        document.removeEventListener('keydown', moveController)
        // document.location.reload()
      }

    }
  }

  // wall collision
  if (ballCurrentPosition[0] >= (570 - ballDiameter) || ballCurrentPosition[1] >= (300 - ballDiameter)
    || ballCurrentPosition[0] <= 0
  ) {
    changeTrajectory()
  }

  // ball out bottom
  if (ballCurrentPosition[1] <= 0) {
    score.innerText = 'You Lose'
    clearInterval(intervalID)
    document.removeEventListener('keydown', moveController)
    document.location.reload()
  }

  if ((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blkW)
    && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blkH)) {
    changeTrajectory()
  }

}

const randomRGB = () => {
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`
}

function changeTrajectory() {
  if (xD === 2 && yD === 2) {
    yD = -2
    return
  }
  if (xD === 2 && yD === -2) {
    xD = -2
    return
  }
  if (xD === -2 && yD === 2) {
    xD = 2
    return
  }
  if (xD === -2 && yD === -2) {
    yD = 2
    return
  }
}