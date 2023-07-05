let size; // 블록의 가로 세로 개수
let index, pointedNum, prevPointedNum;
let block; // 모드 변경을 위해 let으로 선언

const shuffleButton = document.getElementById("shuffle");
const modeButton = document.querySelectorAll(".btn");

function makePuzzle(num) {
  const border = document.getElementById("border");
  if (border.childElementCount !== 0) {
    border.replaceChildren();
  } // 모드 변경 시 블록 모두 지운 뒤 생성

  const title = document.getElementById("title");
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
  block = document.querySelectorAll(".block");
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
    let num = Math.floor(Math.random() * 4) + 10; // 임의의 규칙적인 숫자 생성
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
    }
  });

  // 다 맞췄을 시 동작
  if (check === size * size - 1) {
    setTimeout(() => {
      alert("퍼즐을 다 맞췄습니다! 다시하고 싶으면 shuffle 버튼을 누르세요.");
    }, 100);
  }
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && pointedNum % size !== size - 1) {
    swapBlock(1);
  } else if (event.key === "ArrowRight" && pointedNum % size !== 0) {
    swapBlock(-1);
  } else if (event.key === "ArrowUp" && pointedNum < size * (size - 1)) {
    swapBlock(size);
  } else if (event.key === "ArrowDown" && pointedNum > size - 1) {
    swapBlock(-size);
  }

  // 퍼즐 맞췄는지 확인
  if (block[block.length - 1].classList.contains("pointed")) {
    checkPuzzle();
  }
});

shuffleButton.addEventListener("click", () => {
  shuffleBlock();
});

modeButton.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (index !== 0) {
      makePuzzle(Number(item.id.substring(4)));
    } // modeButton[0]는 shuffleButton임
  });
});

// 기본 모드 설정
makePuzzle(4);

// 처음 셔플
shuffleBlock();
