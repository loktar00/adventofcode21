const fs = require('fs')

// Calculate flat increases
function calculate(inputData) {
    let increased = 0;

    inputData.forEach((data, idx, arr) => {
        if (!idx) {
            return;
        }

        if (data > arr[idx - 1]) {
            increased++;
        }
    });

    console.log(increased);
};

// calculate sliding increases
function calculateSlide(inputData) {
    let sums = [];

    inputData.forEach((data, idx, arr) => {
        if (idx + 2 > arr.length) {
            return;
        }

        sums.push(data + arr[idx + 1] + arr[idx + 2]);
    });

    calculate(sums);
};

fs.readFile('data.txt', 'utf8' , (err, data) => {
  let inputData = [];

  const sampleData = [...data.replace(/[\r]/g, '').split('\n')];
  inputData = sampleData.map(data => Number(data));

  calculateSlide(inputData);
});
