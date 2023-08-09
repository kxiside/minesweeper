/*----- constants -----*/

// setting rows & columns amount
const rows = 9
const columns = 9

// board set to 0 on initialization
const board = []

    
    /*----- state variables -----*/

// flag state
let shipSet = false

// number of stars(mines)
let stars = 10

// stars position on board
let starsCoordinate = []

// solar system destroyed
let system404 = false;

         
    /*----- cached elements  -----*/
starsEl = document.getElementById("starsCount")
    
    
    
        /*----- functions -----*/

init()

// initialize board 
function init () {
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
            cell.addEventListener("click", cellPress)

            //creating cell divs appended to the new board element
            boardEl = document.getElementById('board')
            boardEl.append(cell)

            // pushing cell string to row array
            row.push(cell)

            
        }
        // new row array being pushed to board array
        board.push(row)
    }  
    console.log(board)
}

// function to add ships on click
function cellPress() {
   

    // check wether game is over or cell has been previously clicked
    if(system404 || this.classList.contains('cellPress')){
        return
    }
    // linking cell to classlist
    let cell = this

    // setting ships and removing them from cells
    if(shipSet) {
        if (cell.innerText == "") {
            cell.innerText = "ship"
        } else if (cell.innerText == "ship") {
            cell.innerText = ""
        }
        return
    }
    // if star is clicked game over is true
    if (starsCoordinate.includes(cell.id)) {
        system404 = true
        showStars()
        return
    }
    // creating row and column selection into numbers
    let x = cell.id.slice(0)
    let y = cell.id.slice(2)
    let r = parseInt(x)
    let c = parseInt(y)
    starSearch(r, c)
    

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
    for (let i = 0; i < stars; i++) {

        // create variable for random rows & columns
        let starPosition = randomStar(rows, columns)

        // randomizing star position ['0-0']
        let id = starPosition.row.toString() + "-" + starPosition.column.toString()
        

        // if theres no ID push in new ID
        if (!starsCoordinate.includes(id)) {
            starsCoordinate.push(id) 
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
                cell.classList.add('starReveal')
            }
        })
    })
}

// searching cells for stars
function starSearch(r, c) {
    if(r < 0 || r >= rows || c < 0 || c >= columns) {
        return
    } 
    
    // starting stars found from a value
    let starsFound = 0

    // adding up cells into starsFound value
     starsFound += cellSearch(r-1, c-1) // top left
     starsFound += cellSearch(r-1, c) // top
     starsFound += cellSearch(r-1, c+1) // top right
     starsFound += cellSearch(r, c-1)// left
     starsFound += cellSearch(r, c+1)// right
     starsFound += cellSearch(r+1, c-1)// bottom left
     starsFound += cellSearch(r+1, c) // bottom
     starsFound += cellSearch(r+1, c+1) // bottom right

     // adding numbers to cells to show the number of stars adjacent to them
    if(starsFound > 0) {
        board[r][c].innerText = starsFound
        board[r][c].classList.add("c" + starsFound.toString())
    } else {
        
        //creating black square when cell is empty
        board[r][c].classList.add('cellPress')
    }
}

// searching for cells on the board
function cellSearch(r, c) {
    if(starsCoordinate.includes(`${r}-${c}`)) {
        return 1
    }
    return 0
}

// refresh game
function starRefresh(){
    window.location.reload()
}


// render game 
function render() {
    renderBoard()
    renderStars()   
}
    
        /*----- event listeners -----*/
// setting the ship button to activate or deactivate on click
document.getElementById('ship').addEventListener('click', renderShip)

// loading game on initialize
document.getElementById('reset').addEventListener('click', starRefresh)