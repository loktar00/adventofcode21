// This is horrible, should be using bitwise operators but meh.

const fs = require('fs')

function calculate(inputData) {
  const positionTotals = new Array(inputData[0].length).fill(0);

  inputData.forEach(el => {
    const positionValues = el.split('');

    positionValues.forEach((val, idx) => {
      if (Number(val) === 1) {
        positionTotals[idx] ++;
        return;
      }
    });
  });

  const commonBits = [];
  const uncommonBits = [];

  positionTotals.forEach((el, idx) => {
    if (el > inputData.length / 2) {
        commonBits[idx] = 1;
        uncommonBits[idx] = 0;
        return;
    }

    commonBits[idx] = 0;
    uncommonBits[idx] = 1;
  });

  const power = parseInt(commonBits.join(''), 2) * parseInt(uncommonBits.join(''), 2);
  console.log(power);

};

fs.readFile('dataTest.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  calculate([...data.replace(/[\r]/g, '').split('\n')]);
});




