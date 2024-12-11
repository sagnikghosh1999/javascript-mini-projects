"use script";

const gridDisplay = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const resultDisplay = document.querySelector("#result");

const width = 4;
const squares = [];

let score = 0;

//   create the playing board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.innerHTML = 0;
    gridDisplay.appendChild(square);
    squares.push(square);
  }
  generate();
  generate();
}
createBoard();

function generate() {
  const randomNumber = Math.floor(Math.random() * squares.length);
  if (squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2;
    checkForGameOver();
  } else generate();
}

function moveRight() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [
        Number(totalOne),
        Number(totalTwo),
        Number(totalThree),
        Number(totalFour),
      ];
      //   console.log(row);

      const filteredRow = row.filter((num) => num);
      const missing = 4 - filteredRow.length;
      const zeros = Array(missing).fill(0);
      const newRow = zeros.concat(filteredRow);

      squares[i].innerHTML = newRow[0];
      squares[i + 1].innerHTML = newRow[1];
      squares[i + 2].innerHTML = newRow[2];
      squares[i + 3].innerHTML = newRow[3];
    }
  }
}

function moveLeft() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [
        Number(totalOne),
        Number(totalTwo),
        Number(totalThree),
        Number(totalFour),
      ];
      //   console.log(row);

      const filteredRow = row.filter((num) => num);
      const missing = 4 - filteredRow.length;
      const zeros = Array(missing).fill(0);
      const newRow = filteredRow.concat(zeros);

      squares[i].innerHTML = newRow[0];
      squares[i + 1].innerHTML = newRow[1];
      squares[i + 2].innerHTML = newRow[2];
      squares[i + 3].innerHTML = newRow[3];
    }
  }
}

function moveUp() {
  for (let i = 0; i < 4; i++) {
    const totalOne = squares[i].innerHTML;
    const totalTwo = squares[i + width].innerHTML;
    const totalThree = squares[i + 2 * width].innerHTML;
    const totalFour = squares[i + 3 * width].innerHTML;
    const column = [
      Number(totalOne),
      Number(totalTwo),
      Number(totalThree),
      Number(totalFour),
    ];
    //   console.log(row);

    const filteredColumn = column.filter((num) => num);
    const missing = 4 - filteredColumn.length;
    const zeros = Array(missing).fill(0);
    const newColumn = filteredColumn.concat(zeros);

    squares[i].innerHTML = newColumn[0];
    squares[i + width].innerHTML = newColumn[1];
    squares[i + 2 * width].innerHTML = newColumn[2];
    squares[i + 3 * width].innerHTML = newColumn[3];
  }
}

function moveDown() {
  for (let i = 0; i < 4; i++) {
    const totalOne = squares[i].innerHTML;
    const totalTwo = squares[i + width].innerHTML;
    const totalThree = squares[i + 2 * width].innerHTML;
    const totalFour = squares[i + 3 * width].innerHTML;
    const column = [
      Number(totalOne),
      Number(totalTwo),
      Number(totalThree),
      Number(totalFour),
    ];
    //   console.log(row);

    const filteredColumn = column.filter((num) => num);
    const missing = 4 - filteredColumn.length;
    const zeros = Array(missing).fill(0);
    const newColumn = zeros.concat(filteredColumn);

    squares[i].innerHTML = newColumn[0];
    squares[i + width].innerHTML = newColumn[1];
    squares[i + 2 * width].innerHTML = newColumn[2];
    squares[i + 3 * width].innerHTML = newColumn[3];
  }
}

function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (squares[i].innerHTML === squares[i + 1].innerHTML) {
      const combinedTotal =
        parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i + 1].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkForWin();
}

function combineColumn() {
  for (let i = 0; i < 12; i++) {
    if (squares[i].innerHTML === squares[i + width].innerHTML) {
      const combinedTotal =
        parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i + width].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkForWin();
}

function keyLeft() {
  moveLeft();
  combineRow();
  moveLeft();
  generate();
}

function keyRight() {
  moveRight();
  combineRow();
  moveRight();
  generate();
}
function keyUp() {
  moveUp();
  combineColumn();
  moveUp();
  generate();
}
function keyDown() {
  moveDown();
  combineColumn();
  moveDown();
  generate();
}

function control(e) {
  if (e.key === "ArrowLeft") {
    keyLeft();
  } else if (e.key === "ArrowRight") {
    keyRight();
  } else if (e.key === "ArrowUp") {
    keyUp();
  } else if (e.key === "ArrowDown") {
    keyDown();
  }
}

document.addEventListener("keydown", control);

// chech for the numbers 2048 for win
function checkForWin() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 2048) {
      resultDisplay.innerHTML = "you WIN🎉🎉";
      document.removeEventListener("keydown", control);
      setTimeout(clear, 3000);
    }
  }
}

// chech if there are no zeroes on board for lose
function checkForGameOver() {
  let zeros = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 0) {
      zeros++;
    }
  }
  if (zeros === 0) {
    resultDisplay.innerHTML = "You LOSE!!!";
    document.removeEventListener("keydown", control);
    setTimeout(clear, 3000);
  }
}

function clear() {
  clearInterval(myTimer);
}

//add colors
function addColours() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = "#afa192";
    else if (squares[i].innerHTML == 2)
      squares[i].style.backgroundColor = "#eee4da";
    else if (squares[i].innerHTML == 4)
      squares[i].style.backgroundColor = "#ede0c8";
    else if (squares[i].innerHTML == 8)
      squares[i].style.backgroundColor = "#f2b179";
    else if (squares[i].innerHTML == 16)
      squares[i].style.backgroundColor = "#ffcea4";
    else if (squares[i].innerHTML == 32)
      squares[i].style.backgroundColor = "#e8c064";
    else if (squares[i].innerHTML == 64)
      squares[i].style.backgroundColor = "#ffab6e";
    else if (squares[i].innerHTML == 128)
      squares[i].style.backgroundColor = "#fd9982";
    else if (squares[i].innerHTML == 256)
      squares[i].style.backgroundColor = "#ead79c";
    else if (squares[i].innerHTML == 512)
      squares[i].style.backgroundColor = "#76daff";
    else if (squares[i].innerHTML == 1024)
      squares[i].style.backgroundColor = "#beeaa5";
    else if (squares[i].innerHTML == 2048)
      squares[i].style.backgroundColor = "#d7d4f0";
  }
}

addColours();
let myTimer = setInterval(addColours, 50);
