    document.addEventListener('click', e => {
    let parentCell = e.target;
    console.log (parentCell.width);   
    let shape = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // Set any attributes as desired
    shape.setAttribute("x1", 0);
    shape.setAttribute("y1", 80);
    shape.setAttribute("x2", 100);
    shape.setAttribute("y2", 20);
    shape.setAttribute("stroke", "green");
    parentCell.append(shape);})
