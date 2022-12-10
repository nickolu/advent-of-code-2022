export default class Trees {
  grid: number[][];

  constructor(input: string) {
    this.grid = input.split('\n').map((rowText) => {
      return rowText.split('').map((value) => Number(value));
    });
  }

  get rowCount(): number {
    return this.grid.length;
  }

  get columnCount(): number {
    return this.grid[0].length;
  }

  getTreeValue(rowIndex: number, columnIndex: number): number {
    return this.grid[rowIndex][columnIndex];
  }

  getVisibleTreeCount(): number {
    let totalTrees = 0;

    this.grid.forEach((row, rowIndex) => {
      row.forEach((treeValue, columnIndex) => {
        if (this.isTreeVisible(rowIndex, columnIndex)) {
          totalTrees++;
        }
      });
    });

    return totalTrees;
  }

  isTreeOnEdge(rowIndex: number, columnIndex: number): boolean {
    return (
      rowIndex === 0 ||
      columnIndex === 0 ||
      rowIndex === this.rowCount - 1 ||
      columnIndex === this.columnCount - 1
    );
  }

  isTreeVisible(rowIndex: number, columnIndex: number): boolean {
    if (this.isTreeOnEdge(rowIndex, columnIndex)) {
      return true;
    }

    const treeRow = [...this.grid[rowIndex]];

    if (isTreeVisibleInRow(treeRow, columnIndex)) {
      return true;
    }

    const treeColumn = this.grid.map((row) => row[columnIndex]);

    if (isTreeVisibleInRow(treeColumn, rowIndex)) {
      return true;
    }

    return false;
  }

  getTreeScenicScore(rowIndex: number, columnIndex: number): number {
    const treeRow = this.grid[rowIndex];
    const treeColumn = this.grid.map((row) => row[columnIndex]);

    if (this.isTreeOnEdge(rowIndex, columnIndex)) {
      return 0;
    }

    const [left, right] = countVisibleTreesBeforeAndAfterTree(
      treeRow,
      columnIndex
    );

    const [up, down] = countVisibleTreesBeforeAndAfterTree(
      treeColumn,
      rowIndex
    );

    return left * right * up * down;
  }

  getHighestScenicScore(): number {
    let highest = 0;
    this.grid.forEach((row, rowIndex) => {
      row.forEach((tree, columnIndex) => {
        const scenicScore = this.getTreeScenicScore(rowIndex, columnIndex);
        if (scenicScore > highest) {
          highest = scenicScore;
        }
      });
    });

    return highest;
  }
}

function countVisibleTreesBeforeAndAfterTree(
  trees: number[],
  treeIndex: number
): [number, number] {
  const currentTreeValue = trees[treeIndex];
  const lastTreeIndex = trees.length - 1;
  let indexOfViewBefore = 0;
  let indexOfViewAfter = lastTreeIndex;

  for (let i = 0; i < trees.length; i++) {
    if (indexOfViewAfter === lastTreeIndex) {
      if (trees[i] >= currentTreeValue) {
        if (i < treeIndex) {
          indexOfViewBefore = i;
        }
        if (i > treeIndex) {
          indexOfViewAfter = i;
        }
      }
    } else {
      break;
    }
  }

  return [treeIndex - indexOfViewBefore, indexOfViewAfter - treeIndex];
}

function isTreeVisibleInRow(trees: number[], treeIndex: number): boolean {
  const currentTreeValue = trees[treeIndex];
  let tallestTreeBefore = 0;
  let tallestTreeAfter = 0;

  for (let i = 0; i < trees.length; i++) {
    if (i < treeIndex) {
      if (trees[i] > tallestTreeBefore) {
        tallestTreeBefore = trees[i];
      }
    } else if (i > treeIndex) {
      if (trees[i] > tallestTreeAfter) {
        tallestTreeAfter = trees[i];
      }
    }
  }

  const isVisibleBefore = tallestTreeBefore < currentTreeValue;
  const isVisibleAfter = tallestTreeAfter < currentTreeValue;

  return isVisibleBefore || isVisibleAfter;
}
