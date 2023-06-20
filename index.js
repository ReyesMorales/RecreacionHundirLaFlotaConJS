const { MAX_SHOOTS } = require("./constants");
const {
  getEmptyBoard,
  addAllBoats,
  isVictory,
  shoot,
  showBoard,
} = require("./utils");

const player1 = {
  shootsCounter: MAX_SHOOTS,
  ownBoard: getEmptyBoard(),
  rivalBoard: getEmptyBoard(),
  id: "Player 1",
};

const player2 = {
  shootsCounter: MAX_SHOOTS,
  ownBoard: getEmptyBoard(),
  rivalBoard: getEmptyBoard(),
  id: "Player 2",
};

addAllBoats(player1.ownBoard);
addAllBoats(player2.ownBoard);

(async () => {
  await new Promise((resolve) => {
    console.clear();
    console.log("Placing the boats");
    let count = 3;
    const countdown = setInterval(() => {
      console.log(count);
      count--;
      if (count === 0) {
        clearInterval(countdown);
        resolve();
      }
    }, 1000);
  });

  let gameFinished = false;
  while (gameFinished === false) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.clear();
        console.log("NEXT TURN");
        shoot(player2.ownBoard, player1.rivalBoard, player1);
        showBoard(player1.ownBoard);
        showBoard(player1.rivalBoard);
        if (player1.shootsCounter === 0) {
          gameFinished = true;
        }
        if (isVictory(player1.ownBoard)) {
          gameFinished = true;
          console.log("PLAYER 1 WINS");
        }
        resolve();
      }, 1000);
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        console.clear();
        console.log("NEXT TURN");
        shoot(player1.ownBoard, player2.rivalBoard, player2);
        showBoard(player2.ownBoard);
        showBoard(player2.rivalBoard);
        if (player2.shootsCounter === 0) {
          gameFinished = true;
        }
        if (isVictory(player2.ownBoard)) {
          gameFinished = true;
          console.log("PLAYER 2 WINS");
        }
        resolve();
      }, 1000);
    });
  }

  showBoard(player1.ownBoard);
  showBoard(player1.ownBoard);

})();
