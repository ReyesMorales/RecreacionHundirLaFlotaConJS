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

function showBoard(board, player) {
    console.log('+++++++' + player + '++++++++++++++++++');
    console.table(board);
}

function shoot(targetBoard, trackBoard, playerShoot) {
    let x = getRandomNumber(9);
    let y = getRandomNumber(9);
    playerShoot.counter++;;
    while(trackBoard[x][y] !== EMPTY_SPACE) {
        x = getRandomNumber(9);
        y = getRandomNumber(9);
    }
   
    if (targetBoard[x][y] === BOAT_SPACE) {
        trackBoard[x][y] = HIT_SPACE;
        return "Hit";
    } else {
        trackBoard[x][y] = WATER_SPACE;
        return "Water";
    }
}

exports.getEmptyBoard = getEmptyBoard;
exports.showBoard = showBoard;
exports.shoot = shoot;
