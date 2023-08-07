	/*----- constants -----*/
// number of stars(mines)
const starMines = 10

	/*----- state variables -----*/
// number of cells in each column & row
let grid = 9
let visible = false
let flags = 10
let stars = starMines
    
        /*----- cached elements  -----*/
// selects html element with class name of board and assisgns it 
const board = document.querySelector('.board')
 // selects all cells
const cells = document.querySelectorAll('.cell')
    
    
    
        /*----- functions -----*/


// initialize board variables
function init () {
    render()
}
function renderBoard() {
    // iterates 81 cells
    for(let i = 0; i < grid * grid; i++) {
    // new div element assigned to const cell
    const cell = document.createElement('div')
    // classname of 'cell is is set for each div
    cell.className = 'cell'
    // each div iteration will be given a text number 1 - 81
    cell.textContent = i + 1
    // cell is appended to board creating a child element for each iteration of cells
    board.appendChild(cell)
    }
}



// render game on refresh
function render() {
    renderBoard()
}
    
        /*----- event listeners -----*/
document.addEventListener('click', board)
document.addEventListener('DOMContentLoaded', init)
