const ELF_ITEMS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function partOne(input) {
  const lines = input.split('\n');

  console.log(totalPriority(lines));
}

function totalPriority(lines: string[]) {
  let totalPriority = 0;

  lines.forEach((line) => {
    const rucksacks = splitLine(line);
    const matchingItem = findMatchingItemInRucksacks(
      rucksacks[0],
      rucksacks[1]
    );

    totalPriority += itemPriority(matchingItem);
  });

  return totalPriority;
}

function findMatchingItemInRucksacks(rucksackA: string, rucksackB: string) {
  for (let i = 0; i < ELF_ITEMS.length; i++) {
    if (
      isItemInRucksack(ELF_ITEMS[i], rucksackA) &&
      isItemInRucksack(ELF_ITEMS[i], rucksackB)
    ) {
      return ELF_ITEMS[i];
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
  return ELF_ITEMS.indexOf(item) + 1;
}

function isItemInRucksack(item, rucksack) {
  return rucksack.indexOf(item) !== -1;
}
