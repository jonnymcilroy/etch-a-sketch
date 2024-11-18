
let numOfSquares = 16;
let isMouseDown = false;
let isRainbowMode = false;

function createSquares(numOfSquares) {
    const gridLength = 550;
    const squaresInGrid = numOfSquares * numOfSquares;
    const squareLength = (gridLength / numOfSquares) - 2;
    console.log(squareLength);
    const grid = document.querySelector(".grid");
    for (let i = 1; i <= squaresInGrid; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.border = "1px solid rgb(230, 230, 230)";
        square.style.width = `${squareLength}px`;
        square.style.height = `${squareLength}px`;
        //square.style.borderRadius = "2px";
        square.style.backgroundColor = "white";
        square.addEventListener("mouseover", colorSquare);
        grid.appendChild(square);
    }
};

function colorSquare(event) {
    if (isMouseDown) {
        if (isRainbowMode) {
            event.target.style.backgroundColor = generateRandomColor();
        } else {
            event.target.style.backgroundColor = "black";
        }

    }
}

const rainbowBtn = document.querySelector(".rainbow-mode");
rainbowBtn.addEventListener("click", () => {
    isRainbowMode = !isRainbowMode; // Toggle rainbow mode
    rainbowBtn.textContent = isRainbowMode ? "Rainbow Mode ON" : "Rainbow Mode OFF";

})


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

};

// change number of squares per line of grid
const setSquaresBtn = document.querySelector(".set-squares-btn");
let input;
setSquaresBtn.addEventListener("click", () => {

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

//reset grid
const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", () => {
    deleteSquares();
    if (input !== null && !isNaN(input)) {
        createSquares(input);
    } else {
        createSquares(numOfSquares);
    }
});

//generate random colour for square
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}
