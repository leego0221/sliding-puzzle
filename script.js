let size; // 블록의 가로 세로 크기
let index, pointedNum, prevPointedNum;

const shuffleButton = document.getElementById("shuffle-btn");

function makePuzzle(num) {
  const title = document.getElementById("title");
  const border = document.getElementById("border");
  title.innerText = `Sliding Puzzle! (${num}x${num})`;
  size = num;
  index = num * num - 1;

  for (let i = 0; i < num * num; i++) {
    const block = document.createElement("div");
    block.className = "block";
    block.id = `n${i + 1}`;
    block.innerText = i + 1;
    border.appendChild(block);

    if (i === index) {
      block.classList.add("pointed");
      block.classList.add("prev-pointed");
      block.innerText = "";
    }
  }

  pointedNum = index;
  prevPointedNum = index;
  border.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
}

function swapBlock(key) {
  // 정해진 키(-1, 1, -size, size) 외의 값이 들어오면 버그 생김
  if (Math.abs(key) === 1 || Math.abs(key) === size) {
    // 클래스 변경
    block[pointedNum].classList.remove("pointed");
    block[pointedNum + key].classList.add("pointed");
    block[prevPointedNum].classList.remove("prev-pointed");
    block[pointedNum].classList.add("prev-pointed");

    prevPointedNum = pointedNum;
    pointedNum = pointedNum + key;

    // 내부 값 변경
    const temp = block[pointedNum].innerText;
    block[pointedNum].innerText = block[prevPointedNum].innerText;
    block[prevPointedNum].innerText = temp;
  }
}

function shuffleBlock() {
  for (let i = 0; i < size * 50; i++) {
    let num = Math.floor(Math.random() * 4) + 10;
    if (num === 10 && pointedNum % size !== 0) {
      num = -1;
    } else if (num === 11 && pointedNum % size !== size - 1) {
      num = 1;
    } else if (num === 12 && pointedNum > size - 1) {
      num = -size;
    } else if (num === 13 && pointedNum < size * (size - 1)) {
      num = size;
    } else {
      num = 0; // 0은 겉으로 아무 일도 일어나지 않음
    }
    swapBlock(num);
  }
}

function checkPuzzle() {
  let check = 0;
  block.forEach((item) => {
    if (item.innerText === item.id.substring(1)) {
      check++;
    } else if (item.innerText === "") {
      // 빈칸은 아무것도 안 함
    } else {
      check = 0;
    }
  });

  // 다 맞췄을 시 동작
  if (check === size * size - 1) {
    setTimeout(() => {
      alert("퍼즐을 다 맞췄습니다! 확인 버튼을 누르면 다시 섞입니다.");
      shuffleBlock();
    }, 100);
  }
}

function simpleCheck() {
  if (block[block.length - 1].classList.contains("pointed")) checkPuzzle();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && pointedNum % size !== 0) {
    swapBlock(-1);
  } else if (event.key === "ArrowRight" && pointedNum % size !== size - 1) {
    swapBlock(1);
  } else if (event.key === "ArrowUp" && pointedNum > size - 1) {
    swapBlock(-size);
  } else if (event.key === "ArrowDown" && pointedNum < size * (size - 1)) {
    swapBlock(size);
  }

  // 퍼즐 맞췄는지 확인
  if (block[block.length - 1].classList.contains("pointed")) {
    checkPuzzle();
  }
});

shuffleButton.addEventListener("click", () => {
  shuffleBlock();
  simpleCheck();
});

makePuzzle(4);
const block = document.querySelectorAll(".block");

shuffleBlock(); // 처음 셔플

simpleCheck(); // 혹시 모를 맨 처음 체크
