    let playerCounter = 0;
    const clickSound = document.querySelector('.clickSound')
    const cell = document.querySelector('.cell');
    const cellSize = cell.offsetWidth;
    const fieldElements = document.querySelectorAll('.svg-container');
    const fieldSize = fieldElements.length;
    const fieldLength = Math.sqrt(fieldSize);
    const winPopup = document.querySelector('.win-popup');
    const popupContent = document.querySelector('.popup-content');
    const closePopup = document.querySelector('.close-popup');
    const winMessage = document.querySelector('.win-message');
    let row = 0;
    let column = -1;
    let rowCounter = -1;
    let cellValueArray = new Array(fieldLength).fill(0).map(() => new Array(fieldLength).fill(0));
    for (let i = 0; i < fieldSize; i++) {
        rowCounter += 1;
        column += 1;
        if (rowCounter == fieldLength) {
            rowCounter = 0;
            row += 1;
        }
        if (column == fieldLength) {
            column = 0;
        }
        fieldElements[i].dataset.row = row; 
        fieldElements[i].dataset.column = column;
        cellValueArray[row][column] = fieldElements[i].dataset.value 
    }
    document.addEventListener('click', e => {
    const parent = e.target;
    let player;
    playerCounter%2 ? player = 'player2' :  player = 'player1'
    if (!parent.classList.contains('used') && parent.classList.contains('svg-container')) {
        clickSound.currentTime = 0;
        clickSound.play();
        if (player == 'player1') {
        drawCross(parent, cellSize);
        parent.dataset.value = "cross"
        cellValueArray[parent.dataset.row][parent.dataset.column] = "cross"
        } else {
        drawZero(parent, cellSize);
        parent.dataset.value = "zero"
        cellValueArray[parent.dataset.row][parent.dataset.column] = "zero"
        }
        parent.classList.add('used');
        cellValueArray.push()
        playerCounter += 1;
        winCheck(player);
    }
})
function drawCross(parent, cellSize) {
    const firstLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const crossSize = cellSize * 0.6;
    firstLine.setAttribute("x1", ((cellSize - crossSize) / 2));
    firstLine.setAttribute("y1", ((cellSize - crossSize) / 2) + crossSize);
    firstLine.setAttribute("x2", ((cellSize - crossSize) / 2) + crossSize);
    firstLine.setAttribute("y2", ((cellSize - crossSize) / 2));
    firstLine.setAttribute("stroke", "#8b00ff");
    firstLine.setAttribute("stroke-width", "8px");
    parent.append(firstLine);
    const secondLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    secondLine.setAttribute("x1", ((cellSize - crossSize) / 2));
    secondLine.setAttribute("y1", ((cellSize - crossSize) / 2));
    secondLine.setAttribute("x2", ((cellSize - crossSize) / 2) + crossSize);
    secondLine.setAttribute("y2", ((cellSize - crossSize) / 2) + crossSize);
    secondLine.setAttribute("stroke", "#8b00ff");
    secondLine.setAttribute("stroke-width", "8px");
    parent.append(secondLine);
}
function drawZero(parent, cellSize) {
    const zero = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    zero.setAttribute("cx", (cellSize/2));
    zero.setAttribute("cy", (cellSize/2));
    zero.setAttribute("r", ((cellSize * 0.6)/2));
    zero.setAttribute("stroke", "#8b00ff");
    zero.setAttribute("fill", "none");
    zero.setAttribute("stroke-width", "8px");
    parent.append(zero);
}
function winCheck(player) {
    let rowSum;
    const crossStr = 'cross';
    const zeroStr = 'zero';
    const crossWins = crossStr.repeat(fieldLength);
    const zeroWins = zeroStr.repeat(fieldLength);  
    let diagonalsMainSum = '';
    let diagonalsSecondarySum = '';
    for (let i = 0; i < cellValueArray.length; i++) {
        rowSum = '';
        columnSum = '';
        for (let j = 0; j < cellValueArray[i].length; j++) {
            rowSum += cellValueArray[i][j];
            columnSum += cellValueArray[j][i];
        } 
        diagonalsMainSum += cellValueArray[i][i];
        diagonalsSecondarySum += cellValueArray[i][cellValueArray.length-i-1];     
        if (rowSum == crossWins || diagonalsMainSum == crossWins || diagonalsSecondarySum == crossWins || columnSum == crossWins) {     
            winMessage.innerHTML = 'Player1 win the game. Congratulations!';   
            winPopup.style.display = 'block';
            break;
        }
        if (rowSum == zeroWins || diagonalsMainSum == zeroWins || diagonalsSecondarySum == zeroWins || columnSum == zeroWins) {     
            winMessage.innerHTML = 'Player2 win the game. Congratulations!';        
            winPopup.style.display = 'block'; 
            break;
        }    
    }  
}

closePopup.onclick = function() {
    winPopup.style.display = "none";
    //fieldElements.parentNode.replaceChild(fieldElements.cloneNode(false), fieldElements);
  }
  
  window.onclick = function(event) {
    if (event.target == winPopup) {
        winPopup.style.display = "none";
    }
  }