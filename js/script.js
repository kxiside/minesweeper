	/*----- constants -----*/

// setting rows & columns amount
const rows = 9
const columns = 9

// how many times a cell was clicked
const cellClicked = 0

// board set to 0 on initialization
const board = []

    
    /*----- state variables -----*/

// cell disabled until ship is clicked
let shipSet = false

// number of stars(mines)
let stars = 10

// stars position on board
let starsCoordinate = []

// solar system destroyed
let system404 = false;

         
    /*----- cached elements  -----*/

// selects html element with class name of board and assisgns it 
const boardEl = document.querySelector('#board')

// connectiong Id of stars count to new starsEl element
starsEl = document.getElementById("starsCount")

// listening for cell click

    
    
    
        /*----- functions -----*/

// initialize board 
function init () {

    // outputing stars count to html
    starsEl.innerText = stars

    //render all game logic on initialization
    render()
}

// creating the board
function renderBoard() {

    // row for loop to create the array of rows
    for (let r = 0; r < rows; r++) {

        // empty array staged for push
        let row = []

        // column for loop 
        for (let c = 0; c < columns; c++) {

            // creating cell element to hold divs
            let cell = document.createElement('div')
            
            
            // creating cell ID of rows & columns
            cell.id = (`${r}-${c}`)

            //creating cell divs appended to the new board element
            boardEl.append(cell)

            // pushing cell string to row array
            row.push(cell)

            
        }
        // new row array being pushed to board array
        board.push(row)
    }  
}


// render ship markers enabled or disabled
function renderShip() {

    // setting ship background color depending on true or false
    shipSet = !shipSet;

    // ship marker is tied to html element "ship"
    // if ship button is darkgray its set on otherwise its off
    document.getElementById("ship").style.backgroundColor = shipSet ? "darkgray" : "lightgrey";
  }



// setting stars to random cells on start
function renderStars() {

    
    // loop through stars value
    for (let i = 0; i < 10; i++) {

        // create variable for random rows & columns
        let starPosition = randomStar(rows, columns)

        // randomizing star position ['0-0']
        let id = starPosition.row.toString() + "-" + starPosition.column.toString()

        // if theres no ID push in new ID
        if (!starsCoordinate.includes(id)) {
            starsCoordinate.push(id)

           // minus stars count by 1
           stars--
        }
    }
    
}

// random row & column function
function randomStar(rows, columns) {
    let column = Math.floor(Math.random() * columns)
    let row = Math.floor(Math.random() * rows)
    return {row, column}
}

// showing stars on board
function showStars() {
    
    // loop board rows
    board.forEach(row => {

        // loop row cells
        row.forEach(cell => {

            // push star into cell of random star coordinate
            if (starsCoordinate.includes(cell.id)) {
                
                // stylize cell when revealed
                cell.innerText = "star"
                cell.style.backgroundColor = "slategrey"
            }
        })
    })
}





// render game 
function render() {
    renderBoard()
    renderStars()
    renderShip()
    
}
    
        /*----- event listeners -----*/
// adding a click function to the board element
document.addEventListener('click', board)

// setting the ship button to activate or deactivate on click
document.getElementById('ship').addEventListener('click', renderShip)

// loading game on initialize
document.addEventListener('DOMContentLoaded', init)