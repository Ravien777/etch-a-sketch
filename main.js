const container = document.getElementById("container");
document.getElementById("brushColor").onchange = () => {
  setColor();
};

function addOrRemoveClass(toRem, toAdd) {
  const canvas = Array.from(document.querySelectorAll(".grid-items"));
  canvas.forEach((canva) => {
    for (let index = 0; index < toRem.length; index++) {
      if (canva.classList.contains(toRem[index])) {
        canva.classList.remove(toRem[index]);
      }
    }
    canva.classList.add(toAdd);
  });
}

function brush() {
  addOrRemoveClass(["erase", "rainbow"], "brush");
}

function erase() {
  addOrRemoveClass(["brush", "rainbow"], "erase");
}

function rainbow() {
  addOrRemoveClass(["erase", "brush"], "rainbow");
}

function clearCanva() {
  const canvas = document.querySelectorAll(".grid-items");
  canvas.forEach((canva) => {
    canva.style.backgroundColor = "white";
  });
}

function setColor() {
  return document.getElementById("brushColor").value;
}

function colorDiv(div) {
  if (div.classList.contains("erase")) {
    div.style.backgroundColor = "white";
  } else if (div.classList.contains("rainbow")) {
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    div.style.backgroundColor = randomColor;
  } else {
    div.style.backgroundColor = setColor();
  }
}

function makeGrid(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (let index = 0; index < rows * cols; index++) {
    var div = document.createElement("div");
    div.className = "grid-items";
    div.setAttribute("onmouseenter", "colorDiv(this)");
    container.appendChild(div);
  }
}

function gridSize() {
  container.replaceChildren();
  const select = document.getElementById("c-size-select");
  var selectVal = Number(select.value);
  if (selectVal === undefined || selectVal === null) {
    makeGrid(16, 16);
  } else {
    makeGrid(selectVal, selectVal);
  }
}

gridSize();
