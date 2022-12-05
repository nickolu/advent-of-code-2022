export default function partOne(input) {
  const lines = input.split('\n');

  console.log(findLinesWithAnyOverlap(lines));
}

function findLinesWithAnyOverlap(lines) {
  return lines.reduce((accumulator, line) => {
    const [elfA, elfB] = line.split(',');

    if (isOverlap(elfA, elfB) || isOverlap(elfB, elfA)) {
      accumulator++;
    }
    return accumulator;
  }, 0);
}

function isOverlap(elfARange, elfBRange) {
  elfARange = elfARange.split('-').map((value) => Number(value));
  elfBRange = elfBRange.split('-').map((value) => Number(value));

  const isValueInRange = (value, range) => {
    const [min, max] = range;
    return value >= min && value <= max;
  };

  const isMinValueInRange =
    isValueInRange(elfARange[0], elfBRange) &&
    isValueInRange(elfARange[0], elfBRange);
  const isMaxValueInRange =
    isValueInRange(elfARange[0], elfBRange) &&
    isValueInRange(elfARange[0], elfBRange);

  if (isMinValueInRange || isMaxValueInRange) {
    return true;
  }

  return false;
}
