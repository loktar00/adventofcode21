// This is horrible, should be using bitwise operators but meh.

const fs = require('fs')

function getCommon(data, idx) {
    data.sort();
    const common = data[~~(data.length / 2)][idx];

    return data.filter(el => el[idx] === common);
}

function getUncommon(data, idx) {
    data.sort();

    const unCommon = Math.abs(data[~~(data.length / 2)][idx] - 1);
    return data.filter(el => Number(el[idx]) === unCommon);
}

function calculate(inputData) {
    let counter = 0;
    let commonResults = inputData;
    let uncommonResults = inputData;

    while (counter < inputData[0].length) {
        commonResults = [...getCommon(commonResults, counter)];
        counter++;
    }

    counter = 0;
    while (counter < inputData[0].length && uncommonResults.length > 1) {
        uncommonResults = [...getUncommon(uncommonResults, counter)];
        counter++;
    }

    console.log(parseInt(commonResults, 2) * parseInt(uncommonResults, 2));
};

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  calculate([...data.replace(/[\r]/g, '').split('\n')]);
});
