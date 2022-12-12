import _ = require('lodash');

enum Command {
  addx = 'addx',
  noop = 'noop',
}

const insterestingCycles = [20, 60, 100, 140, 180, 220];

export default function partOne(input: string) {
  const commands = input.split('\n');
  let cycleNumber = 0;
  let currentCommandIndex = 0;
  let totalSignalStrength = 0;

  let X = 1;
  const stack = [];

  while (currentCommandIndex < commands.length) {
    cycleNumber++;

    const args = commands[currentCommandIndex].split(' ');

    if (insterestingCycles.includes(cycleNumber)) {
      totalSignalStrength += X * cycleNumber;
    }

    if (stack.length > 0) {
      X += Number(stack.pop());
      currentCommandIndex++;
    } else if (args[0] === Command.noop) {
      currentCommandIndex++;
    } else if (args[0] === Command.addx) {
      stack.push(Number(args[1]));
    }
  }

  console.log(totalSignalStrength);
}
