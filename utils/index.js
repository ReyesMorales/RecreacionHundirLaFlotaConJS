const {
  BOAT_SPACE,
  EMPTY_SPACE,
  HIT_SPACE,
  WATER_SPACE,
} = require("../constants");

/**
 * Generates an empty board filled with empty spaces
 * @returns {[]} Empty board
 */
function getEmptyBoard() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push([]);
    for (let j = 0; j < 10; j++) {
      arr[i].push(EMPTY_SPACE);
    }
  }
  return arr;
}

/**
 * Displays the board in the console
 * @param {[]} board - Board to be displayed
 */
function showBoard(board) {
  console.table(board);
}

/**
 * Performs a shoot at a random target on the board
 * @param {[]} targetBoard - Board containing the targets
 * @param {[]} trackBoard - Board tracking the shots
 * @param {Object} player - Player information
 */
function shoot(targetBoard, trackBoard, player) {
  let x = getRandomNumber(9);
  let y = getRandomNumber(9);
  player.shootsCounter--;
  console.log(`Remaining shoots: ${player.shootsCounter}`);
  while (trackBoard[x][y] !== EMPTY_SPACE) {
    x = getRandomNumber(9);
    y = getRandomNumber(9);
  }

  if (targetBoard[x][y] === BOAT_SPACE) {
    trackBoard[x][y] = HIT_SPACE;
    targetBoard[x][y] = HIT_SPACE;
    console.log(`Shoot to ${x}, ${y}: HIT`);
  } else {
    trackBoard[x][y] = WATER_SPACE;
    targetBoard[x][y] = WATER_SPACE;
    console.log(`Shoot to ${x}, ${y}: WATER`);
  }
}

/**
 * Generates a random number between 0 and maxNumber
 * @param {number} maxNumber - Maximum number for random generation
 * @returns {number} Random number
 */
function getRandomNumber(maxNumber) {
  const randomNumber = Math.round(Math.random() * maxNumber);
  return randomNumber;
}

/**
 * Generates a random direction for placing a boat
 * @returns {"up" | "down" | "left" | "right"} Random direction
 */
function getRandomDirection() {
  const randomNumber0_3 = getRandomNumber(3);
  switch (randomNumber0_3) {
    case 0:
      return "up";
    case 1:
      return "down";
    case 2:
      return "left";
    case 3:
      return "right";
  }
}

/**
 * Checks if the positions for placing a boat are empty
 * @param {board} Player's  board
 * @param {integer} X coordinate X
 * @param {integer} Y coordinate Y
 * @param {"up" | "down" | "left" | "right"} Direction of the boat
 * @param {integer} boatSize - size of the boat
 * @returns {boolean} True if the positions are empty, false otherwise
 */
function checkEmptyPositions(board, x, y, direction, boatSize) {
  if (x < 0 || x > 9) {
    return false;
  }
  if (y < 0 || y > 9) {
    return false;
  }
  if (board[x][y] !== EMPTY_SPACE) {
    return false;
  }
  switch (direction) {
    case "right":
      if (y + (boatSize - 1) > 9) {
        return false;
      }
      for (let i = y; i < y + boatSize; i++) {
        if (board[x][i] !== EMPTY_SPACE) {
          return false;
        }
      }
      break;
    case "left":
      if (y - (boatSize - 1) < 0) {
        return false;
      }
      for (let i = y; i > y - boatSize; i--) {
        if (board[x][i] !== EMPTY_SPACE) {
          return false;
        }
      }
      break;
    case "up":
      if (x - (boatSize - 1) < 0) {
        return false;
      }
      for (let i = x; i > x - boatSize; i--) {
        if (board[i][y] !== EMPTY_SPACE) {
          return false;
        }
      }
      break;
    case "down":
      if (x + (boatSize - 1) > 9) {
        return false;
      }
      for (let i = x; i < x + boatSize; i++) {
        if (board[i][y] !== EMPTY_SPACE) {
          return false;
        }
      }
  }
  return true;
}

/**
 * Gets whether a space for a boat is empty or not
 * @param {board} player's board
 * @param {integer} x coordinate X
 * @param {integer} y coordinate Y
 * @param {"up" | "down" | "left" | "right"} direction
 * @param {integer} boatSize size of the boat
 */

/**
 * Adds a boat to the board
 * @param {[]} board - Player's board
 * @param {number} boatSize - Size of the boat
 * @returns {Object} Result of adding the boat
 */
function addBoat(board, boatSize) {
  let x = getRandomNumber(9);
  let y = getRandomNumber(9);
  let direction = getRandomDirection();

  while (checkEmptyPositions(board, x, y, direction, boatSize) === false) {
    x = getRandomNumber(9);
    y = getRandomNumber(9);
    direction = getRandomDirection();
  }
  switch (direction) {
    case "right":
      for (let i = y; i < y + boatSize; i++) {
        board[x][i] = BOAT_SPACE;
      }
      break;
    case "left":
      for (let i = y; i > y - boatSize; i--) {
        board[x][i] = BOAT_SPACE;
      }
      break;
    case "up":
      for (let i = x; i > x - boatSize; i--) {
        board[i][y] = BOAT_SPACE;
      }
      break;
    case "down":
      for (let i = x; i < x + boatSize; i++) {
        board[i][y] = BOAT_SPACE;
      }
  }
  return { success: true, message: `boat ${getBoatName(boatSize)} was added.` };
}

/**
 * Returns the name of a boat depending on its size
 * @param {number} boatSize - Size of the boat
 * @returns {string} Boat name
 */
function getBoatName(boatSize) {
  switch (boatSize) {
    case 1:
      return "lancha";
    case 2:
      return "crucero";
    case 3:
      return "submarino";
    case 4:
      return "buque";
    case 5:
      return "portaaviones";
  }
}

/**
 * Adds all boats to the board
 * @param {[]} board - Player's board
 */
function addAllBoats(board) {
  addBoat(board, 5); // add portaaviones
  addBoat(board, 4); // add buque
  addBoat(board, 3); // add submarino
  addBoat(board, 3); // add submarino
  addBoat(board, 2); // add crucero
  addBoat(board, 2); // add crucero
  addBoat(board, 2); // add crucero
  addBoat(board, 1); // add lancha
  addBoat(board, 1); // add lancha
  addBoat(board, 1); // add lancha
}

/**
 * Checks if the active player has won
 * @param {[]} board - Player's board
 * @returns {boolean} True if the player has won, false otherwise
 */
function isVictory(board) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === BOAT_SPACE) {
        return false;
      }
    }
  }
  return true;
}

exports.getEmptyBoard = getEmptyBoard;
exports.showBoard = showBoard;
exports.shoot = shoot;
exports.getRandomNumber = getRandomNumber;
exports.getRandomDirection = getRandomDirection;
exports.checkEmptyPositions = checkEmptyPositions;
exports.addBoat = addBoat;
exports.getBoatName = getBoatName;
exports.addAllBoats = addAllBoats;
exports.isVictory = isVictory;
