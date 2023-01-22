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

exports.getEmptyBoard = getEmptyBoard;

