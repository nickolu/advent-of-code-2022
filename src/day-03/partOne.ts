const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function partOne(input) {
  const lines = input.split('\n');

  console.log(totalPriority(lines));
}

function totalPriority(lines: string[]) {
  let totalPriority = 0;

  lines.forEach((line) => {
    const rucksacks = splitLine(line);
    const matchingLetter = findMatchingLetterInRucksacks(
      rucksacks[0],
      rucksacks[1]
    );

    totalPriority += itemPriority(matchingLetter);
  });

  return totalPriority;
}

function findMatchingLetterInRucksacks(rucksackA: string, rucksackB: string) {
  const isLetterInRucksack = (letter, rucksack) =>
    rucksack.indexOf(letter) !== -1;

  for (let i = 0; i < items.length; i++) {
    if (
      isLetterInRucksack(items[i], rucksackA) &&
      isLetterInRucksack(items[i], rucksackB)
    ) {
      return items[i];
    }
  }

  return null;
}

function splitLine(input: string): string[] {
  const startOfSecondHalf = Math.floor(input.length / 2);

  return [
    input.substring(0, startOfSecondHalf),
    input.substring(startOfSecondHalf, 9999),
  ];
}

function itemPriority(item: string) {
  return items.indexOf(item) + 1;
}
