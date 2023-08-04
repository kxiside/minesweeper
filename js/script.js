	/*----- constants -----*/


	/*----- state variables -----*/
let timer
let flags
let result
let grid = 9

	/*----- cached elements  -----*/
const board = document.querySelector('.board')

	


	/*----- functions -----*/
function spaceGrid() {
    for(let i = 0; i < grid * grid; i++) {
        const sector = document.createElement("div")
        sector.className = "sector"
        board.appendChild(sector)
        sector.textContent = i
        
        
    }
}
spaceGrid()



    /*----- event listeners -----*/
    document.addEventListener('click', board)