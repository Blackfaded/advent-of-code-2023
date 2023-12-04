import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const inputs = file.split('\n');

const characterNums: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getNumberFromString = (str: string | undefined) => {
  if (!str) {
    return 0;
  }
  return str in characterNums ? characterNums[str] : Number(str);
};

const result = inputs.reduce((acc, val) => {
  const regex = new RegExp(
    /(one|two|three|four|five|six|seven|eight|nine|\d)/g
  );
  const nums: string[] = [];
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(val))) {
    nums.push(match[0]);
    regex.lastIndex = match.index + 1;
  }

  const firstNumber = getNumberFromString(nums[0]);
  const lastNumber = getNumberFromString(nums[nums.length - 1]);
  return acc + (firstNumber * 10 + lastNumber);
}, 0);

console.log(result);
