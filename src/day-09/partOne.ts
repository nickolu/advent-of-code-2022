import Rope, {applyCommandsToRope} from './Rope';

export default function partOne(input: string) {
  const commands = input.split('\n');
  const rope = new Rope(2);

  applyCommandsToRope(commands, rope);

  console.log(rope.tailNode.visitedPositionNames.length);
}
