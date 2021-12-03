// This is horrible, should be using bitwise operators but meh.

const fs = require('fs')

function calculate(inputData) {
  const positionTotals = [];

  inputData.forEach(el => {
    const positionValues = el.split('');

    positionValues.forEach((val, idx) => {
      if (positionTotals[idx] === undefined) {
        positionTotals[idx] = [0,0];
      }

      if (Number(val) === 1) {
        positionTotals[idx][0] ++;
        return;
      }

      positionTotals[idx][1] ++;
    });
  });

  const commonBits = [];
  const uncommonBits = [];

  for (let b = 0; b < positionTotals.length; b++) {

    if (positionTotals[b][0] > positionTotals[b][1]) {
      commonBits.push(1);
      uncommonBits.push(0);
      continue;
    }

    commonBits.push(0);
    uncommonBits.push(1);
  }

  console.log(commonBits, uncommonBits);
  const power = parseInt(commonBits.join(''), 2) * parseInt(uncommonBits.join(''), 2);
  console.log(power);

};


fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  calculate([...data.replace(/[\r]/g, '').split('\n')]);
});




