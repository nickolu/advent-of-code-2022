const ELF_ITEMS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function partTwo(input) {
  const lines = input.split('\n');
  console.log(totalPriority(lines));
}

type ElfGroup = string[];
type ElfGroups = {elfGroups: ElfGroup[]; totalPriority: number};

function totalPriority(lines: string[]) {
  const elfGroupData = lines.reduce(accumulateTotalPriorityForElfGroups, {
    elfGroups: [[]],
    totalPriority: 0,
  });

  return elfGroupData.totalPriority;
}

function accumulateTotalPriorityForElfGroups(
  accumulator: ElfGroups,
  currentElf: string
) {
  let totalPriority = accumulator.totalPriority;
  const elfGroups = [...accumulator.elfGroups];
  const currentElfGroup = elfGroups[elfGroups.length - 1];
  currentElfGroup.push(currentElf);

  if (currentElfGroup.length === 3) {
    elfGroups.push([]);
    const item = findMatchingItemInElfGroup(currentElfGroup);
    totalPriority += itemPriority(item);
  }

  return {
    elfGroups: [...elfGroups],
    totalPriority,
  };
}

function findMatchingItemInElfGroup(elfGroup: ElfGroup) {
  for (let i = 0; i < ELF_ITEMS.length; i++) {
    if (
      isItemInRucksack(ELF_ITEMS[i], elfGroup[0]) &&
      isItemInRucksack(ELF_ITEMS[i], elfGroup[1]) &&
      isItemInRucksack(ELF_ITEMS[i], elfGroup[2])
    ) {
      return ELF_ITEMS[i];
    }
  }

  return null;
}

function itemPriority(item: string) {
  return ELF_ITEMS.indexOf(item) + 1;
}

function isItemInRucksack(item, rucksack) {
  return rucksack.indexOf(item) !== -1;
}
