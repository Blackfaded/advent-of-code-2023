import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const inputs = file.split('\n');

const transformed = inputs.reduce<
  { numberAsString: string; index: number }[][]
>((acc, val, index) => {
  if (!acc[index]) {
    acc[index] = [];
  }
  const res = val.matchAll(/\.?(\d+)\.?/g);
  let match: IteratorResult<RegExpMatchArray, any> | null = null;
  while ((match = res.next()) && !match.done) {
    acc[index].push({
      numberAsString: match.value[1],
      index: match.value[0].startsWith('.')
        ? match.value.index! + 1
        : match.value.index!,
    });
  }
  return acc;
}, []);

const isSymbol = (char: string | undefined) => {
  if (char === undefined) {
    return false;
  }
  return char !== '.' && isNaN(Number(char));
};

const checkForNeighbourSymbol = (
  number: string,
  index1: number,
  index2: number
) => {
  const topLeft = isSymbol(inputs[index1 - 1]?.[index2 - 1]);
  const top = isSymbol(inputs[index1 - 1]?.[index2]);
  const topRight = isSymbol(inputs[index1 - 1]?.[index2 + 1]);
  const left = isSymbol(inputs[index1]?.[index2 - 1]);
  const right = isSymbol(inputs[index1]?.[index2 + 1]);
  const bottomLeft = isSymbol(inputs[index1 + 1]?.[index2 - 1]);
  const bottom = isSymbol(inputs[index1 + 1]?.[index2]);
  const bottomRight = isSymbol(inputs[index1 + 1]?.[index2 + 1]);

  return (
    topLeft ||
    top ||
    topRight ||
    left ||
    right ||
    bottomLeft ||
    bottom ||
    bottomRight
  );
};

const result = transformed.reduce((acc, row, index1) => {
  const validEntries = row.filter((num) => {
    let valid = false;
    for (let i = 0; i < num.numberAsString.length; i++) {
      const index2 = num.index + i;
      valid = checkForNeighbourSymbol(num.numberAsString, index1, index2);
      if (valid) {
        return true;
      }
    }
    return false;
  });

  return (
    acc +
    validEntries.map((v) => Number(v.numberAsString)).reduce((a, b) => a + b, 0)
  );
}, 0);

console.log(result);
