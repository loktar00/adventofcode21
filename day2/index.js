const fs = require('fs')

const position = {
    horizontal: 0,
    depth: 0,
    aim: 0
}

function calculate(inputData) {
    inputData.forEach((data) => {
        let [dir, amt] = data.split(' ');
        amt = Number(amt);

        switch(dir) {
          case 'forward':
            position.depth += position.aim * amt;
            position.horizontal += amt;
            break;
          case 'up':
            position.aim -= amt;
            break;
          case 'down':
            position.aim += amt;
            break;
        }
    });

    console.log(position.horizontal * position.depth);
};


fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  calculate([...data.replace(/[\r]/g, '').split('\n')]);
});




