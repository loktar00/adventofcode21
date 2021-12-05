const fs = require('fs')

function rotateBoard(board) {
  let rotatedBoard = [];
  let len = board[0].length - 1;

  while(len > -1) {
    let rotatedRow = [];

    board.forEach(row => {
      rotatedRow.push(row[len]);
    });

    rotatedBoard.push(rotatedRow);
    len--;
  }

  return rotatedBoard;
}

function checkForBingo(board) {
    let bingo = false;

    board.forEach(row => {
        if (row.every(cell => cell === 'X')) {
            bingo = true;
        }
    });

  return bingo;
}

function getTotal(board, input) {
  let total = 0;
  board.forEach(row => row.filter(el => el !== 'X').forEach(row => {
    total += row;
  }));

  console.log(total * input);
}

function calculate(inputs, boards) {
    let inputIndex = 0;
    let finalBingo = false;

    while(!finalBingo && inputIndex < inputs.length) {
        const input = inputs[inputIndex];
        let boardsToRemove = [];

        boards.forEach((board, idx) => {
            // Set to X for each number found.
            board.forEach((row) => {
                const foundIndex = row.findIndex(el => el === input);
                if (foundIndex !== -1) {
                    row[foundIndex] = 'X';
                };
            });

            // If we find a bingo add it to the que to remove.
            if (checkForBingo(board)) {
                if (boards.length > 1) {
                    boardsToRemove.push(idx);
                } else {
                    finalBingo = true;
                    getTotal(board, input);
                }
            }

            // Check columns.
            const rotatedBoard = rotateBoard(board);
            if (checkForBingo(rotatedBoard)) {
                if (boards.length > 1) {
                    boardsToRemove.push(idx);
                } else {
                    finalBingo = true;
                    getTotal(board, input);
                }
            }
        });

        // Reverse sort the boards to remove, need to remove from the end.
        boardsToRemove.sort((a, b) => b - a);
        // Unique the boards to remove.
        const uniqueBoards = new Set(boardsToRemove);
        // Remove the boards
        uniqueBoards.forEach(idx => boards.splice(idx, 1));

        inputIndex++;
    }
};

fs.readFile('data.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const parsedData = [...data.replace(/[\r]/g, '').split('\n')];
    const input = parsedData.splice(0, 1)[0].split(',').map(el => Number(el));

    let boardData = [];
    let idx = 1;
    let boardIdx = 0;

    while(idx < parsedData.length) {
        const boardRow = parsedData.slice(idx, idx + 5)
            .map(el => el.split(' ')
            .filter(el => el !== ''))
            .map(el => el.map(el => Number(el)));

        boardData[boardIdx] = boardRow;
        boardIdx++;
        idx+=6;
    }

  calculate(input, boardData);
});

