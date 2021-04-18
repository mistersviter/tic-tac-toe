    let playerCounter = 0;
    const clickSound = document.querySelector('.clickSound')
    const cell = document.querySelector('.cell');
    const cellSize = cell.offsetWidth;
    document.addEventListener('click', e => {
    const parent = e.target;
    let player;
    playerCounter%2 ? player = 'player2' :  player = 'player1'
    if (!parent.classList.contains('used') && parent.classList.contains('svg-container')) {
        clickSound.currentTime = 0;
        clickSound.play();
        if (player == 'player1') {
        drawCross(parent, cellSize);
        parent.classList.add('with-cross');
        } else {
        drawZero(parent, cellSize);
        parent.classList.add('with-zero');
        }
        parent.classList.add('used');
        playerCounter += 1;
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