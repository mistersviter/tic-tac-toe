let playerCounter = 0;
const clickSound = document.querySelector(".clickSound");
const gameField = document.querySelector(".game-field");
const menuPopup = document.querySelector(".menu-popup");
const gameFieldColumnsNumber = document.getElementById("columns-number");
const fieldSizeSelector = document.getElementById("field-size-selector");
const multiplyBy = document.querySelector(".multiply-by");
const playBtn = document.getElementById("play-btn");
const winPopup = document.querySelector(".win-popup");
const winMessage = document.querySelector(".win-message");
const restartBtns = document.querySelectorAll(".restart-btn");
const drawPopup = document.querySelector(".draw-popup");
const player1NameForm = document.getElementById("player1-name");
const player2NameForm = document.getElementById("player2-name");
let player1Name = "Player1";
let player2Name = "Player2";
const cellValueArray = [];
let cell;
let cellSize;
const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;
let winner;
let fieldSize = fieldSizeSelector.value;
let fieldElementsNumber = Math.pow(fieldSizeSelector.value, 2);
let fieldElements;
let playerNow;

document.addEventListener("DOMContentLoaded", () => {
  menuPopup.style = "display: block";
  addEventsToRestartBtns();
});

function mainFunction(e) {
  const clickedCell = e.target;
  playerNow = playerCounter % 2 ? player2Name : player1Name;
  if (
    cellValueArray[clickedCell.dataset.row][clickedCell.dataset.column] ==
      "none" &&
    clickedCell.classList.contains("svg-container")
  ) {
    clickSound.currentTime = 0;
    clickSound.play();
    if (playerNow == player1Name) {
      drawCross(clickedCell, cellSize);
      cellValueArray[clickedCell.dataset.row][clickedCell.dataset.column] =
        "cross";
    } else {
      drawZero(clickedCell, cellSize);
      cellValueArray[clickedCell.dataset.row][clickedCell.dataset.column] =
        "zero";
    }
    playerCounter += 1;
    winCheck(playerNow);
    drawCheck();
  }
}
function drawCross(clickedCell, cellSize) {
  const firstLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  const crossSize = cellSize * 0.6;
  firstLine.setAttribute("x1", (cellSize - crossSize) / 2);
  firstLine.setAttribute("y1", (cellSize - crossSize) / 2 + crossSize);
  firstLine.setAttribute("x2", (cellSize - crossSize) / 2 + crossSize);
  firstLine.setAttribute("y2", (cellSize - crossSize) / 2);
  firstLine.setAttribute("stroke", "#8b00ff");
  firstLine.setAttribute("stroke-width", "8px");
  clickedCell.append(firstLine);
  const secondLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  secondLine.setAttribute("x1", (cellSize - crossSize) / 2);
  secondLine.setAttribute("y1", (cellSize - crossSize) / 2);
  secondLine.setAttribute("x2", (cellSize - crossSize) / 2 + crossSize);
  secondLine.setAttribute("y2", (cellSize - crossSize) / 2 + crossSize);
  secondLine.setAttribute("stroke", "#8b00ff");
  secondLine.setAttribute("stroke-width", "8px");
  clickedCell.append(secondLine);
}
function drawZero(clickedCell, cellSize) {
  const zero = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  zero.setAttribute("cx", cellSize / 2);
  zero.setAttribute("cy", cellSize / 2);
  zero.setAttribute("r", (cellSize * 0.6) / 2);
  zero.setAttribute("stroke", "#ADFF2F");
  zero.setAttribute("fill", "none");
  zero.setAttribute("stroke-width", "8px");
  clickedCell.append(zero);
}
function winCheck(playerNow) {
  let rowSum;
  const crossStr = "cross";
  const zeroStr = "zero";
  const crossWins = crossStr.repeat(fieldSizeSelector.value);
  const zeroWins = zeroStr.repeat(fieldSizeSelector.value);
  let diagonalsMainSum = "";
  let diagonalsSecondarySum = "";
  for (let i = 0; i < cellValueArray.length; i++) {
    rowSum = "";
    columnSum = "";
    for (let j = 0; j < cellValueArray[i].length; j++) {
      rowSum += cellValueArray[i][j];
      columnSum += cellValueArray[j][i];
    }
    diagonalsMainSum += cellValueArray[i][i];
    diagonalsSecondarySum += cellValueArray[i][cellValueArray.length - i - 1];
    if (
      rowSum == crossWins ||
      diagonalsMainSum == crossWins ||
      diagonalsSecondarySum == crossWins ||
      columnSum == crossWins
    ) {
      winner = playerNow;
      winMessage.innerHTML = `<h2>${playerNow}</h2> win the game. Congratulations!`;
      winPopup.style = "display: block";
      break;
    }
    if (
      rowSum == zeroWins ||
      diagonalsMainSum == zeroWins ||
      diagonalsSecondarySum == zeroWins ||
      columnSum == zeroWins
    ) {
      winner = playerNow;
      winMessage.innerHTML = `<h2>${playerNow}</h2> win the game. Congratulations!`;
      winPopup.style = "display: block";
      break;
    }
  }
}

function drawCheck() {
  const flatCellValueArray = cellValueArray.flat();
  const gotFreeCells = flatCellValueArray.some((element) => element == "none");
  if (!gotFreeCells && !winner) drawPopup.style = "display: block";
}

function restartBtnClick() {
  winPopup.style = "display: none";
  drawPopup.style = "display: none";
  restart();
}

// window.addEventListener("click", (event) => {
//   if (event.target == winPopup) {
//     winPopup.style.display = "none";
//   }
// });

fieldSizeSelector.addEventListener("input", function () {
  fieldSize = fieldSizeSelector.value;
  fieldElementsNumber = Math.pow(fieldSize, 2);
  gameFieldColumnsNumber.innerHTML = fieldSize;
  multiplyBy.innerHTML = `&times; ${fieldSize}`;
});

playBtn.addEventListener("click", () => {
  menuPopup.style.display = "none";
  gameField.style = `grid-template-columns: repeat(${fieldSize}, 1fr)`;
  let row = 0;
  let column = -1;
  let rowCounter = -1;
  let i = 0;
  while (i < fieldElementsNumber) {
    cell = document.createElement("div");
    cell.classList.add("cell");
    rowCounter += 1;
    column += 1;
    if (rowCounter == fieldSize) {
      rowCounter = 0;
      row += 1;
    }
    if (column == fieldSize) {
      column = 0;
    }
    cell.innerHTML = `<svg class="svg-container" data-row="${row}" data-column="${column}"></svg>`;
    gameField.appendChild(cell);
    i++;
  }
  cell = document.querySelector(".cell");
  cellSize = cell.offsetWidth;
  let j = 0;
  let k = 0;
  while (j < fieldSize) {
    k = 0;
    cellValueArray.push([]);
    while (k < fieldSize) {
      cellValueArray[j].push(["none"]);
      k++;
    }
    j++;
  }
  getNewSvgContainers();
  addEventsToSvgContainers();
  if (player1NameForm.value) player1Name = player1NameForm.value;
  if (player2NameForm.value) player2Name = player2NameForm.value;
});

function getNewSvgContainers() {
  fieldElements = document.querySelectorAll(".svg-container");
}

function addEventsToSvgContainers() {
  fieldElements.forEach((element) =>
    element.addEventListener("click", mainFunction)
  );
}

function addEventsToRestartBtns() {
  restartBtns.forEach((element) =>
    element.addEventListener("click", restartBtnClick)
  );
}

function restart() {
  winner = null;
  playerCounter = 0;
  fieldElements.forEach((element) =>
    element.parentNode.replaceChild(element.cloneNode(false), element)
  );
  cellValueArray.forEach((element) =>
    element.forEach((e, idx, arr) => (arr[idx] = "none"))
  );
  getNewSvgContainers();
  addEventsToSvgContainers();
}
