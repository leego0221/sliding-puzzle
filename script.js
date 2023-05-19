const block = document.querySelectorAll(".block");

const TO_LEFT = -1;
const TO_RIGHT = 1;
const TO_UP = -4;
const TO_DOWN = 4;

const START = 15;
let pointedNum = START;
let prevPointedNum = START;
block[START].classList.add("pointed");
block[START].classList.add("prev-pointed");

function swapBlock(num) {
  // 클래스 변경
  block[pointedNum].classList.remove("pointed");
  block[pointedNum + num].classList.add("pointed");
  block[prevPointedNum].classList.remove("prev-pointed");
  block[pointedNum].classList.add("prev-pointed");

  prevPointedNum = pointedNum;
  pointedNum = pointedNum + num;

  // 내부 값 변경
  const temp = block[pointedNum].innerText;
  block[pointedNum].innerText = block[prevPointedNum].innerText;
  block[prevPointedNum].innerText = temp;
}

function shuffleBlock() {
  for (let i = 0; i < 200; i++) {
    let num = Math.floor(Math.random() * 4) + 10;
    if (num === 10 && pointedNum % 4 !== 0) {
      num = TO_LEFT;
    } else if (num === 11 && pointedNum % 4 !== 3) {
      num = TO_RIGHT;
    } else if (num === 12 && pointedNum > 3) {
      num = TO_UP;
    } else if (num === 13 && pointedNum < 12) {
      num = TO_DOWN;
    } else {
      num = 0; // swapBlock(0)는 겉으로 아무 일도 일어나지 않음
    }
    swapBlock(num);
  }
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && pointedNum % 4 !== 0) {
    swapBlock(TO_LEFT);
  } else if (event.key === "ArrowRight" && pointedNum % 4 !== 3) {
    swapBlock(TO_RIGHT);
  } else if (event.key === "ArrowUp" && pointedNum > 3) {
    swapBlock(TO_UP);
  } else if (event.key === "ArrowDown" && pointedNum < 12) {
    swapBlock(TO_DOWN);
  }
});

shuffleBlock(); // 처음 셔플
