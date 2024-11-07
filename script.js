
let numOfSquares = 16;
let isMouseDown = false;

function createSquares(numOfSquares) {
    const gridLength = 500;
    const squaresInGrid = numOfSquares * numOfSquares;
    const squareLength = (gridLength / numOfSquares) - 2;
    console.log(squareLength);
    const grid = document.querySelector(".grid");
    for (let i = 1; i <= squaresInGrid; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.border = "1px solid rgb(165, 165, 165)";
        square.style.width = `${squareLength}px`;
        square.style.height = `${squareLength}px`;
        square.style.borderRadius = "2px";
        square.addEventListener("mouseover", colorSquare);
        grid.appendChild(square);
    }
};

function colorSquare(event) {
    if (isMouseDown) {
        event.target.style.backgroundColor = "black";
    }
}

function initialiseMouseTracking() {
    document.addEventListener("mousedown", () => isMouseDown = true);
    document.addEventListener("mouseup", () => isMouseDown = false);
}

// initialise squares and tracking
createSquares(numOfSquares);
initialiseMouseTracking();

function deleteSquares() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.remove();

    });

}

const setSquaresBtn = document.querySelector(".set-squares-btn");

setSquaresBtn.addEventListener("click", () => {
    let input;
    while (true) {
        input = prompt("Change number of squares per row. Enter a number 1-100");
        if (input !== null && !isNaN(input) && input >= 1 && input <= 100) {
            break;
        }
        alert("Please enter a number 1-100 only")
    }
    deleteSquares();
    createSquares(input);
});