const grid = document.querySelector('.grid')

const blkW = 100
const blkH = 20

const controllerPOS = [230, 10] // 570px/2 = 285px - blkW
let currentPosition = controllerPOS

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

const controller = document.createElement('div')
controller.classList.add('controller')
draw()
grid.appendChild(controller)

function draw() {
  controller.style.left = controllerPOS[0] + 'px'
  controller.style.bottom = controllerPOS[1] + 'px'
}

document.addEventListener('keydown', (e) => {

  if (e.key === 'ArrowLeft' && currentPosition[0] > 0) {
    //  move controller 10 px left at each keydown
    currentPosition[0] -= 10
    draw()
  } else if (e.key === 'ArrowRight' && currentPosition[0] < 570 - blkW) {
    //  move controller 10 px right at each keydown
    currentPosition[0] += 10
    draw()
  }

})
