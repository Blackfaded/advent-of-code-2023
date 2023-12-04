import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const inputs = file.split('\n');

const threshold = {
  red: 12,
  green: 13,
  blue: 14,
};

// Part 1
const result = inputs.reduce((acc, val) => {
  const gameValSplit = val.split(':');
  const id = Number(gameValSplit[0].split(' ')[1]);
  const stacks = gameValSplit[1]
    .split(';')
    .map((s) => s.split(',').map((s) => s.trim()));

  const valid = stacks.every((val) => {
    return val.every((v) => {
      const [number, value] = v.split(' ');
      return (
        (value === 'red' && Number(number) <= threshold.red) ||
        (value === 'blue' && Number(number) <= threshold.blue) ||
        (value === 'green' && Number(number) <= threshold.green)
      );
    });
  });
  if (valid) {
    return acc + id;
  }

  return acc;
}, 0);

console.log(result);

// Part 2
const result2 = inputs.reduce((acc, val) => {
  const gameValSplit = val.split(':');
  const stacks = gameValSplit[1]
    .split(';')
    .map((s) => s.split(',').map((s) => s.trim()));

  const max = stacks.reduce<Record<string, number>>(
    (acc, val) => {
      val.forEach((v) => {
        const [number, value] = v.split(' ');
        if (acc[value] < Number(number)) {
          acc[value] = Number(number);
        }
      });
      return acc;
    },
    {
      red: 0,
      blue: 0,
      green: 0,
    }
  );

  return acc + max.red * max.blue * max.green;
}, 0);

console.log(result2);
