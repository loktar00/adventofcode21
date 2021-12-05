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
    const bingo = board.some(row => {
        if (row.every(cell => cell === 'X')) {
            console.log('BINGO!');
            console.log(board);

            return true;
        }
    });

    return bingo;
}

function getTotal(board) {
    let total = 0;
    board.forEach(row => row.filter(el => el !== 'X').forEach(row => {
        total += row;
    }));

    return total;
}

function calculate(inputs, boards) {
    let inputIndex = 0;
    let bingo = false;

    while(!bingo && inputIndex < inputs.length) {
        const input = inputs[inputIndex];

        boards.some(board => {
            board.forEach(row => {
                const foundIndex = row.findIndex(el => el === input);

                if (foundIndex !== -1) {
                    row[foundIndex] = 'X';
                };
            });

            if (checkForBingo(board)) {
                bingo = true;
                const total = getTotal(board);
                console.log(total * input);
                return bingo;
            }

            const rotatedBoard = rotateBoard(board);

            if (checkForBingo(rotatedBoard)) {
                bingo = true;
                const total = getTotal(board);
                console.log(total * input);
                return bingo;
            }

            return false;
        });

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

