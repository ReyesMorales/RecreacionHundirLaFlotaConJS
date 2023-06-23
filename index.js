const { MAX_SHOOTS } = require("./constants");
const {
  getEmptyBoard,
  addAllBoats,
  isVictory,
  shoot,
  showBoard,
} = require("./utils");

// Create player 1
const player1 = {
  shootsCounter: MAX_SHOOTS,
  ownBoard: getEmptyBoard(),
  rivalBoard: getEmptyBoard(),
  id: "Player 1",
};

// Create player 2
const player2 = {
  shootsCounter: MAX_SHOOTS,
  ownBoard: getEmptyBoard(),
  rivalBoard: getEmptyBoard(),
  id: "Player 2",
};

// Add boats to player 1's and player 2's boards
addAllBoats(player1.ownBoard);
addAllBoats(player2.ownBoard);

// Start the game
(async () => {
  // Start the game by placing the boats
  await new Promise((resolve) => {
    console.clear();
    console.log("Game starting, placing the boats...");
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

  // Show Player 1's board with boats
  await new Promise((resolve) => {
    setTimeout(() => {
      console.clear();
      console.log("Player 1 Board:");
      showBoard(player1.ownBoard);
      resolve();
    }, 5000);
  });

  // Show Player 2's board with boats
  await new Promise((resolve) => {
    setTimeout(() => {
      console.clear();
      console.log("Player 2 Board:");
      showBoard(player2.ownBoard);
      resolve();
    }, 5000);
  });

  // Start the rounds
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Rounds starting");
      resolve();
    }, 5000);
  });

  let gameFinished = false;
  let winner = null;

  // Game loop
  while (!gameFinished) {
    // Player 1's turn
    await new Promise((resolve) => {
      setTimeout(() => {
        console.clear();
        console.log("PLAYER 1 TURNS");
        shoot(player2.ownBoard, player1.rivalBoard, player1);
        console.log("Own board");
        showBoard(player1.ownBoard);
        console.log("Rival board");
        showBoard(player1.rivalBoard);
        if (player1.shootsCounter === 0 || isVictory(player2.ownBoard)) {
          gameFinished = true;
          winner = player1;
        }
        resolve();
      }, 1000);
    });

    // Player 2's turn
    if (!gameFinished) {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.clear();
          console.log("PLAYER 2 TURNS");
          shoot(player1.ownBoard, player2.rivalBoard, player2);
          console.log("Own board");
          showBoard(player2.ownBoard);
          console.log("Rival board");
          showBoard(player2.rivalBoard);
          if (player2.shootsCounter === 0 || isVictory(player1.ownBoard)) {
            gameFinished = true;
            winner = player2;
          }
          resolve();
        }, 1000);
      });
    }
  }

  // Display the winner and final boards
  if (winner) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.clear();
        console.log(`Congratulations! ${winner.id} wins the game!`);
        console.log("Player 1 Board:");
        showBoard(player1.ownBoard);
        console.log("Player 2 Board:");
        showBoard(player2.ownBoard);
        resolve();
      }, 5000);
    });
  }
})();
