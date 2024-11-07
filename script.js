// create grid squares
let numOfSquares = 4;

function createSquare(numOfSquares) {
    const gridLength = 500;
    const squaresInGrid = numOfSquares * numOfSquares;
    const squareLength = (gridLength / numOfSquares) - 2;
    console.log(squareLength);
    const grid = document.querySelector(".grid");
    for (let i = 1; i <= squaresInGrid; i++) {
        const square = document.createElement("div");
        square.style.border = "1px solid rgb(165, 165, 165)";
        square.style.width = `${squareLength}px`;
        square.style.height = `${squareLength}px`;
        square.style.borderRadius = "2px";

        grid.appendChild(square);
    }
};
// initialise squares
createSquare(numOfSquares);

