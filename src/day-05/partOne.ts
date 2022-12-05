type CrateMap = {
  [index: string]: string[];
};

export default function partOne(input: string) {
  const [crateDrawing, instructions] = input.split('\n\n');
  const crateMap = transformCrateDrawingToCratesMap(crateDrawing);

  applyInstructionsToCrateMap(instructions, crateMap);

  const topOfEachStack = Object.values(crateMap)
    .map((crateList) => crateList[crateList.length - 1])
    .join('');

  console.log(topOfEachStack);
}

function applyInstructionsToCrateMap(
  input: string,
  crateMap: CrateMap
): CrateMap {
  const instructions = input.split('\n');

  instructions.forEach((instruction) => {
    const [numberToMove, fromColumn, toColumn] = instruction
      .split(' ')
      .filter((value) => !isNaN(Number(value)));

    for (let i = 0; i < Number(numberToMove); i++) {
      const moved = crateMap[fromColumn].pop();
      crateMap[toColumn].push(moved);
    }
  });

  return crateMap;
}

function transformCrateDrawingToCratesMap(crateDrawing: string): CrateMap {
  const crateDrawingRows = crateDrawing.split('\n');

  const accumulateCrateMap = (accumulator: CrateMap, currentValue: string) => {
    const columnValues = splitLineIntoColumnValues(currentValue);
    const pushValidValuesToRelativeColumn = (value: string, i: number) => {
      const currentColumn = i + 1;

      if (value[1] !== ' ') {
        if (accumulator[currentColumn] === undefined) {
          accumulator[currentColumn] = [];
        }
        if (value[1] && isNaN(Number(value[1]))) {
          accumulator[currentColumn].unshift(value[1]);
        }
      }
    };
    columnValues.forEach(pushValidValuesToRelativeColumn);

    return accumulator;
  };

  return crateDrawingRows.reduce(accumulateCrateMap, {});
}

function splitLineIntoColumnValues(line: string): string[] {
  const characters = line.split('');
  const lastColumn = characters.splice(line.length - 3, 3);

  const {columns} = characters.reduce(
    (accumulator, currentCharacter, i) => {
      accumulator.currentCrate += currentCharacter;

      if (accumulator.currentCrate.length === 4) {
        accumulator.columns.push(accumulator.currentCrate);
        accumulator.currentCrate = '';
      }

      return accumulator;
    },
    {currentCrate: '', columns: []}
  );

  columns.push(lastColumn.join('') + ' ');

  return columns;
}
