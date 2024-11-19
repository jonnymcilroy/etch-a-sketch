let numOfSquares = 16;
let isMouseDown = false;
let isRainbowMode = false;

function createSquares(numOfSquares) {
    const gridLength = 550;
    const squaresInGrid = numOfSquares * numOfSquares;
    const squareLength = (gridLength / numOfSquares) - 2;
    const grid = document.querySelector(".grid");
    grid.innerHTML = ""; // Clear existing grid
    for (let i = 1; i <= squaresInGrid; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.border = "1px solid rgb(245, 250, 250)";
        square.style.width = `${squareLength}px`;
        square.style.height = `${squareLength}px`;
        square.style.backgroundColor = "white";
        square.addEventListener("mouseover", colorSquare);
        grid.appendChild(square);
    }
}

function colorSquare(event) {
    const square = event.target;

    if (isMouseDown) {
        if (isRainbowMode) {
            if (!square.getAttribute("data-original-color")) {
                const randomColor = generateRandomColor();
                square.style.backgroundColor = randomColor;
                square.setAttribute("data-original-color", randomColor);
                square.setAttribute("data-interactions", "1");
            } else {
                const originalColor = square.getAttribute("data-original-color");
                let interactions = parseInt(square.getAttribute("data-interactions") || "0", 10);

                if (interactions >= 10) {
                    square.style.backgroundColor = "rgb(0, 0, 0)";
                    return;
                }

                interactions++;
                square.setAttribute("data-interactions", interactions);

                const newColor = darkenColor(originalColor, interactions);
                square.style.backgroundColor = newColor;
            }
        } else {
            square.style.backgroundColor = "black";
        }
    }
}

function darkenColor(rgbString, step) {
    const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
        const originalR = parseInt(match[1], 10);
        const originalG = parseInt(match[2], 10);
        const originalB = parseInt(match[3], 10);

        // Calculate the fraction remaining
        const fraction = 1 - step / 10;

        const r = Math.max(0, Math.floor(originalR * fraction));
        const g = Math.max(0, Math.floor(originalG * fraction));
        const b = Math.max(0, Math.floor(originalB * fraction));

        return `rgb(${r}, ${g}, ${b})`;
    } else {
        throw new Error("Invalid RGB format");
    }
}

function generateRandomColor() {
    const r = Math.floor(200 + Math.random() * 56);
    const g = Math.floor(200 + Math.random() * 56);
    const b = Math.floor(200 + Math.random() * 56);
    return `rgb(${r}, ${g}, ${b})`;
}

const rainbowBtn = document.querySelector(".rainbow-mode");
rainbowBtn.addEventListener("click", () => {
    isRainbowMode = !isRainbowMode;
    rainbowBtn.textContent = isRainbowMode ? "Rainbow Mode: ON" : "Rainbow Mode: OFF";
});

function initialiseMouseTracking() {
    document.addEventListener("mousedown", () => (isMouseDown = true));
    document.addEventListener("mouseup", () => (isMouseDown = false));
}

// Initialise squares and tracking
createSquares(numOfSquares);
initialiseMouseTracking();

function deleteSquares() {
    const grid = document.querySelector(".grid");
    grid.innerHTML = ""; // Clear grid content
}

const setSquaresBtn = document.querySelector(".set-squares-btn");
setSquaresBtn.addEventListener("click", () => {
    let input;
    while (true) {
        input = prompt("Change number of squares per row. Enter a number 1-100");
        if (input !== null && !isNaN(input) && input >= 1 && input <= 100) {
            break;
        }
        alert("Please enter a number 1-100 only");
    }
    deleteSquares();
    createSquares(input);
});

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
    deleteSquares();
    createSquares(numOfSquares);
});