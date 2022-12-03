type ElfCounts = {
  [elfid: number]: number;
  highestIndex: number;
  highestValue: number;
};

export default function partOne(input) {
  const elfInventories = input.split('\n\n');
  const elfQuantities = elfInventories.reduce(
    (accumulator: ElfCounts, currentValue: string, i: number) => {
      const amounts = currentValue.split('\n');
      const totalCalories = amounts.reduce(
        (total, calories) => Number(total) + Number(calories),
        0
      );

      accumulator[i] = totalCalories;

      if (totalCalories > accumulator[accumulator.highestIndex]) {
        accumulator.highestIndex = i;
        accumulator.highestValue = totalCalories;
      }

      return accumulator;
    },
    {highestIndex: 0, highestValue: 0}
  );

  console.log(elfQuantities.highestValue);
}
