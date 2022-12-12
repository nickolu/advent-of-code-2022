enum Command {
  addx = 'addx',
  noop = 'noop',
}

export default function partTwo(input: string) {
  const commands = input.split('\n');
  let cycleNumber = 0;
  let currentCommandIndex = 0;

  let X = 1;
  const stack = [];
  let spriteIndex = 0;
  const crtWidth = 40;
  const crtScreen = [[], [], [], [], [], []];

  while (currentCommandIndex < commands.length) {
    cycleNumber++;
    const currentPixel = cycleNumber;
    const args = commands[currentCommandIndex].split(' ');

    let currentCrtRowIndex = Math.ceil(currentPixel / crtWidth) - 1;
    let currentCrtPosition = (currentPixel % crtWidth) - 1;

    if (currentCrtPosition === -1) {
      currentCrtPosition = 39;
    }

    if (stack.length > 0) {
      drawPixel(crtScreen, currentCrtRowIndex, currentCrtPosition, spriteIndex);
      X += Number(stack.pop());
      spriteIndex = X - 1;
      currentCommandIndex++;
    } else if (args[0] === Command.noop) {
      drawPixel(crtScreen, currentCrtRowIndex, currentCrtPosition, spriteIndex);
      currentCommandIndex++;
    } else if (args[0] === Command.addx) {
      drawPixel(crtScreen, currentCrtRowIndex, currentCrtPosition, spriteIndex);
      stack.push(Number(args[1]));
    }

    console.log('cycle', cycleNumber);
  }

  function drawPixel(
    crtScreen,
    currentCrtRowIndex,
    currentCrtPosition,
    spriteIndex
  ) {
    if (
      currentCrtPosition >= spriteIndex &&
      currentCrtPosition < spriteIndex + 3
    ) {
      crtScreen[currentCrtRowIndex][currentCrtPosition] = '#';
    } else {
      crtScreen[currentCrtRowIndex][currentCrtPosition] = '.';
    }
  }

  console.log(crtScreen.map((row) => row.join('')).join('\n'));
}
