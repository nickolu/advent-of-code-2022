export default function partTwo(input) {
  const elfInventories = input.split('\n\n');
  const elfQuantities = elfInventories.map((inventory: string, i: number) => {
    const amounts = inventory.split('\n');
    const totalCalories = amounts.reduce(
      (total, calories) => Number(total) + Number(calories),
      0
    );
    return totalCalories;
  });

  elfQuantities.sort((a: number, b: number) => b - a);

  console.log(elfQuantities[0] + elfQuantities[1] + elfQuantities[2]);
}
