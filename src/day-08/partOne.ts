import Trees from './Trees';

export default function partOne(input: string) {
  const trees = new Trees(input);
  console.log(trees.getVisibleTreeCount());
}
