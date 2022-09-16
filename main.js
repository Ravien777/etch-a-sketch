const container = document.getElementById("container");
const options = document.getElementById("options");
const brushBtn = document.getElementById("brushBtn");
const eraseBtn = document.getElementById("eraseBtn");
const rainbowBtn = document.getElementById("rainbowBtn");

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
    if (toAdd !== "" && toAdd !== null) {
      canva.classList.add(toAdd);
    }
  });
}

function toggleActive(btn) {
  Array.from(options.children).forEach((element) => {
    element.classList.remove("active");
  });
  if (!btn.classList.contains("active")) {
    btn.classList.add("active");
  }
}

brushBtn.onclick = (e) => {
  toggleActive(e.target);
  addOrRemoveClass(["erase", "rainbow"], "brush");
};

eraseBtn.onclick = (e) => {
  toggleActive(e.target);
  addOrRemoveClass(["brush", "rainbow"], "erase");
};

rainbowBtn.onclick = (e) => {
  toggleActive(e.target);
  addOrRemoveClass(["erase", "brush"], "rainbow");
};

function clearCanva() {
  const canvas = document.querySelectorAll(".grid-items");
  canvas.forEach((canva) => {
    canva.style.backgroundColor = "white";
  });
  toggleActive(brushBtn);
  addOrRemoveClass(["erase", "rainbow"], "brush");
}

function setColor() {
  return document.getElementById("brushColor").value;
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function colorDiv(e) {
  if (e.type === "mouseover" && !mouseDown) {
    addOrRemoveClass(["brush"], "");
    return;
  }
  if (e.target.classList.contains("erase")) {
    e.target.style.backgroundColor = "white";
  } else if (e.target.classList.contains("rainbow")) {
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = randomColor;
  } else {
    e.target.style.backgroundColor = setColor();
  }
}

function makeGrid(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (let index = 0; index < rows * cols; index++) {
    var div = document.createElement("div");
    div.className = "grid-items";
    div.addEventListener("mouseover", colorDiv);
    div.addEventListener("mousedown", colorDiv);
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