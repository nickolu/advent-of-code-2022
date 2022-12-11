import _ = require('lodash');
import Rope, {applyCommandsToRope} from './Rope';

export default function partTwo(input: string) {
  const commands = input.split('\n');
  const rope = new Rope(10);
  applyCommandsToRope(commands, rope);

  console.log(rope.tailNode.visitedPositionNames.length);
}
