const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function partOne(input) {
  const lines = input.split('\n');

  console.log(totalPriority(lines));
}

function totalPriority(lines: string[]) {
  let totalPriority = 0;

  lines.forEach((line) => {
    totalPriority += priorityOfMatchingLetterInRucksacks(line);
  });

  return totalPriority;
}

function priorityOfMatchingLetterInRucksacks(line) {
  const rucksacks = splitLineToRucksacks(line);
  const matchingLetter = findSameLetterInRucksacks(rucksacks[0], rucksacks[1]);

  return itemPriority(matchingLetter);
}

function itemPriority(item: string) {
  return items.indexOf(item) + 1;
}

function splitLineToRucksacks(input: string): string[] {
  const rucksackBStartIndex = Math.floor(input.length / 2);
  const rucksackA = input.substring(0, rucksackBStartIndex);
  const rucksackB = input.substring(rucksackBStartIndex, 9999);

  return [rucksackA, rucksackB];
}

function findSameLetterInRucksacks(rucksackA: string, rucksackB: string) {
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
