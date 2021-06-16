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
const newGameBtns = document.querySelectorAll(".new-game-btn");
const drawPopup = document.querySelector(".draw-popup");
const player1NameForm = document.getElementById("player1-name");
const player2NameForm = document.getElementById("player2-name");
const gameModeButton = document.getElementById("toggle");
const playerNowInfo = document.querySelector(".player-now-info");
let pvpMode;
let player1Name;
let player2Name;
let cellValueArray = [];
let cell;
let cellSize;
const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;
let winner;
let fieldSize = fieldSizeSelector.value;
let fieldElementsNumber = Math.pow(fieldSizeSelector.value, 2);
let fieldElements;
let playerNow;
let crossPlayer;
let zeroPlayer;
let botFigure;
let playerFigure;
let selectedCell;
const botPlayerNameArray = [
  "Johnny Cage",
  "Kano",
  "Liu Kang",
  "Raiden",
  "Scorpion",
  "Sonya Blade",
  "Sub-Zero",
  "Goro",
  "Shang Tsung",
  "Reptile",
];

document.addEventListener("DOMContentLoaded", () => {
  menuPopup.style = "display: block";
  addEventsToRestartBtns();
  addEventsToNewGameBtns();
});

function clickOnCell(e) {
  selectedCell = e.target;
  clickSound.currentTime = 0;
  clickSound.play();
  if (pvpMode) {
    crossOrZero();
    winCheck();
    drawCheck();
    changePlayer();
    displayPlayerNow();
  } else {
    if (playerNow != botPlayerName) {
      crossOrZero();
      winCheck();
      drawCheck();
      changePlayer();
      displayPlayerNow();
      botMove();
      winCheck();
      drawCheck();
    }
  }
}

function crossOrZero() {
  if (
    cellValueArray[selectedCell.dataset.row][selectedCell.dataset.column] ==
    "none"
  ) {
    if (playerNow == crossPlayer) {
      drawCross(cellSize);
      cellValueArray[selectedCell.dataset.row][selectedCell.dataset.column] =
        "cross";
    } else {
      drawZero(cellSize);
      cellValueArray[selectedCell.dataset.row][selectedCell.dataset.column] =
        "zero";
    }
  }
}

function drawCross(cellSize) {
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
  selectedCell.append(firstLine);
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
  selectedCell.append(secondLine);
}

function drawZero(cellSize) {
  const zero = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  zero.setAttribute("cx", cellSize / 2);
  zero.setAttribute("cy", cellSize / 2);
  zero.setAttribute("r", (cellSize * 0.6) / 2);
  zero.setAttribute("stroke", "#ADFF2F");
  zero.setAttribute("fill", "none");
  zero.setAttribute("stroke-width", "8px");
  selectedCell.append(zero);
}

function winCheck() {
  let rowSum;
  let columnSum;
  const crossStr = "cross";
  const zeroStr = "zero";
  const crossWins = crossStr.repeat(fieldSize);
  const zeroWins = zeroStr.repeat(fieldSize);
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
      [diagonalsMainSum, diagonalsSecondarySum].includes(crossWins) ||
      [diagonalsMainSum, diagonalsSecondarySum].includes(zeroWins)
    ) {
      gotWinner();
      break;
    }
    if (
      [rowSum, columnSum].includes(crossWins) ||
      [rowSum, columnSum].includes(zeroWins)
    ) {
      gotWinner();
      break;
    }
  }
}

function gotWinner() {
  winner = playerNow;
  winMessage.innerHTML = `<h2>${playerNow}</h2> won the game. Congratulations!`;
  winPopup.style = "display: block";
}

function drawCheck() {
  const gotFreeCells = cellValueArray.some((row) =>
    row.some((element) => element == "none")
  );
  if (!gotFreeCells && !winner) drawPopup.style = "display: block";
}

function restartBtnClick() {
  winPopup.style = "display: none";
  drawPopup.style = "display: none";
  restart();
}

function newGameBtnClick() {
  winPopup.style = "display: none";
  drawPopup.style = "display: none";
  menuPopup.style = "display: block";
  player1Name = "Player1";
  player2Name = "Player2";
  const cellsArray = document.querySelectorAll(".cell");
  cellsArray.forEach((element) => element.remove());
  restart();
}

function createNewGameField() {
  let row = 0;
  let column = -1;
  let rowCounter = -1;
  for (let i = 0; i < fieldElementsNumber; i++) {
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
  }
}

function createNewCellValueArray() {
  cellValueArray = [];
  let k = 0;
  for (let j = 0; j < fieldSize; j++) {
    cellValueArray.push([]);
    for (let k = 0; k < fieldSize; k++) {
      cellValueArray[j].push("none");
    }
  }
}

fieldSizeSelector.addEventListener("input", function () {
  fieldSize = fieldSizeSelector.value;
  fieldElementsNumber = Math.pow(fieldSize, 2);
  gameFieldColumnsNumber.innerHTML = fieldSize;
  multiplyBy.innerHTML = `&times; ${fieldSize}`;
});

playBtn.addEventListener("click", () => {
  menuPopup.style.display = "none";
  gameField.style = `grid-template-columns: repeat(${fieldSize}, 1fr)`;
  pvpMode = gameModeButton.checked;
  createNewGameField();
  cell = document.querySelector(".cell");
  cellSize = cell.offsetWidth;
  createNewCellValueArray();
  getNewSvgContainers();
  addEventsToSvgContainers();
  if (player1NameForm.value) {
    player1Name = player1NameForm.value;
  } else {
    player1Name = "Player1";
  }
  if (player2NameForm.value) {
    player2Name = player2NameForm.value;
  } else {
    player2Name = "Player2";
  }
  selectFirstPlayer();
  displayPlayerNow();
  botMove();
});

function displayPlayerNow() {
  if (!winner) playerNowInfo.innerHTML = `${playerNow} move`;
}

function getNewSvgContainers() {
  fieldElements = document.querySelectorAll(".svg-container");
}

function addEventsToSvgContainers() {
  fieldElements.forEach((element) =>
    element.addEventListener("click", clickOnCell)
  );
}

function addEventsToRestartBtns() {
  restartBtns.forEach((element) =>
    element.addEventListener("click", restartBtnClick)
  );
}

function addEventsToNewGameBtns() {
  newGameBtns.forEach((element) =>
    element.addEventListener("click", newGameBtnClick)
  );
}

function restart() {
  winner = null;
  playerCounter = 0;
  playerNow = null;
  fieldSize = fieldSizeSelector.value;
  fieldElements.forEach((element) =>
    element.parentNode.replaceChild(element.cloneNode(false), element)
  );
  cellValueArray.forEach((element) =>
    element.forEach((e, idx, arr) => (arr[idx] = "none"))
  );
  getNewSvgContainers();
  addEventsToSvgContainers();
  selectFirstPlayer();
  displayPlayerNow();
  botMove();
}

function selectFirstPlayer() {
  const playerCounter = Math.floor(Math.random() * 2);
  if (pvpMode) {
    if (playerCounter == 0) {
      crossPlayer = player1Name;
      zeroPlayer = player2Name;
    } else {
      crossPlayer = player2Name;
      zeroPlayer = player1Name;
    }
  } else {
    if (playerCounter == 0) {
      crossPlayer = player1Name;
      botPlayerName =
        botPlayerNameArray[
          Math.floor(Math.random() * botPlayerNameArray.length)
        ];
      zeroPlayer = botPlayerName;
      playerFigure = "cross";
      botFigure = "zero";
    } else {
      botPlayerName =
        botPlayerNameArray[
          Math.floor(Math.random() * botPlayerNameArray.length)
        ];
      crossPlayer = botPlayerName;
      zeroPlayer = player1Name;
      playerFigure = "cross";
      botFigure = "cross";
    }
  }
  playerNow = crossPlayer;
}

function botMove() {
  if (!pvpMode) {
    if (playerNow == botPlayerName) {
      if (botNextStepCalc(botFigure, fieldSize - 1)) return;
      if (botNextStepCalc(playerFigure, fieldSize - 1)) return;
      for (
        let botFiguresInRow = fieldSize - 1;
        botFiguresInRow > 0;
        botFiguresInRow--
      ) {
        if (
          botNextStepCalc(playerFigure, 0, true) &&
          botNextStepCalc(botFigure, botFiguresInRow)
        )
          return;
      }
      // 4) Если ничего не подошло, то ставим в любую рандомную свободную клетку
      const freeCells = [];
      for (let row = 0; row < fieldSize; row++) {
        for (let col = 0; col < fieldSize; col++) {
          if (cellValueArray[row][col] === "none") freeCells.push([row, col]);
        }
      }
      if (freeCells.length) {
        const [row, col] = shuffleArray(freeCells)[0];
        setBotFigure(row, col);
      }
      crossOrZero(selectedCell);
      console.log("бот походил");
      changePlayer();
      displayPlayerNow();
    }
  }
}

function botNextStepCalc(figure, count, noFillJustCheckIfItMatches) {
  function fillIfNone(row, col) {
    if (cellValueArray[row][col] === "none") {
      if (!noFillJustCheckIfItMatches) return true;
    }
  }
  // horizontal
  for (let row = 0; row < fieldSize; row++) {
    let horizontalCount = 0;
    for (let col = 0; col < fieldSize; col++) {
      if (cellValueArray[row][col] === figure) horizontalCount++;
    }
    if (horizontalCount === count)
      for (let col = 0; col < fieldSize; col++) {
        if (fillIfNone(row, col)) return true;
      }
  }
  // vertical
  for (let col = 0; col < fieldSize; col++) {
    let verticalCount = 0;
    for (let row = 0; row < fieldSize; row++) {
      if (cellValueArray[row][col] === figure) verticalCount++;
    }
    if (verticalCount === count)
      for (let row = 0; row < fieldSize; row++) {
        if (fillIfNone(row, col)) return true;
      }
  }
  // diagonal 1
  let leftTopToRightBottomCount = 0;
  for (let both = 0; both < fieldSize; both++) {
    if (cellValueArray[both][both] === figure) leftTopToRightBottomCount++;
  }
  if (leftTopToRightBottomCount === count)
    for (let both = 0; both < fieldSize; both++) {
      if (fillIfNone(both, both)) return true;
    }

  // diagonal 2
  let rightTopToLeftBottomCount = 0;
  for (
    let row = 0, col = fieldSize - 1;
    row < fieldSize && col >= 0;
    row++, col--
  ) {
    if (cellValueArray[row][col] === figure) rightTopToLeftBottomCount++;
  }
  if (rightTopToLeftBottomCount === count)
    for (
      let row = 0, col = fieldSize - 1;
      row < fieldSize && col >= 0;
      row++, col--
    ) {
      if (fillIfNone(row, col)) return true;
    }
}

function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function setBotFigure(row, pos) {
  let counter;
  let gotElementNumber;
  counter = 0;
  for (let x = 0; x < fieldSize; x++) {
    for (let y = 0; y < fieldSize; y++) {
      counter++;
      if (cellValueArray[x][y] == cellValueArray[row][pos]) {
        break;
      }
    }
  }
  selectedCell = fieldElements[counter];
}

function changePlayer() {
  playerNow = playerNow == crossPlayer ? zeroPlayer : crossPlayer;
}
