export default function partOne(input) {
  const lines = input.split('\n');

  console.log(findLinesWithCompleteOverlap(lines));
}

function findLinesWithCompleteOverlap(lines) {
  return lines.reduce((accumulator, line) => {
    const [elfA, elfB] = line.split(',');

    if (
      isFirstRangeInsideSecondRange(elfA, elfB) ||
      isFirstRangeInsideSecondRange(elfB, elfA)
    ) {
      accumulator++;
    }
    return accumulator;
  }, 0);
}

function isFirstRangeInsideSecondRange(firstRange, secondRange) {
  firstRange = firstRange.split('-').map((value) => Number(value));
  secondRange = secondRange.split('-').map((value) => Number(value));

  if (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1]) {
    return true;
  }
  return false;
}
