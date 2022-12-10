import Trees from './Trees';

export default function partTwo(input: string) {
  const trees = new Trees(input);
  console.log(trees.getHighestScenicScore());
}
