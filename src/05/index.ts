import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const inputs = file.split('\n');

const seeds = inputs[0]
  .split('seeds: ')[1]
  .split(' ')
  .map((v) => Number(v));

const maps = inputs.slice(1).reduce<number[][][]>((acc, cur) => {
  if (cur === '') {
    acc.push([]);
    return acc;
  }
  if (isNaN(Number(cur.charAt(0)))) {
    return acc;
  }
  acc[acc.length - 1].push([...cur.split(' ').map((v) => Number(v))]);
  return acc;
}, []);

const part01 = () => {
  const getTransformedValue = (
    input: number,
    startValue: number,
    comparison: number,
    range: number
  ) => {
    if (input >= comparison && input < comparison + range) {
      return startValue + input - comparison;
    }
    return null;
  };

  const getTransformedValueForMap = (inputs: number[], mapping: number[][]) => {
    const values = inputs.map((input) => {
      return (
        mapping.reduce<number | null>(
          (acc, [startValue, comparison, range]) => {
            if (acc !== null) {
              return acc;
            }
            return getTransformedValue(input, startValue, comparison, range);
          },
          null
        ) ?? input
      );
    });

    return values;
  };

  const result = Math.min(
    ...maps.reduce((acc, cur) => {
      return getTransformedValueForMap(acc, cur);
    }, seeds)
  );
  console.log(result);
};

part01();
