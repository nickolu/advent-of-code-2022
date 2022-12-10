export default class Trees {
  grid: number[][];

  constructor(input: string) {
    this.grid = input.split('\n').map((rowText) => {
      return rowText.split('').map((value) => Number(value));
    });
  }

  get rowCount() {
    return this.grid.length;
  }

  get columnCount() {
    return this.grid[0].length;
  }

  getTreeValue(rowIndex, columnIndex) {
    return this.grid[rowIndex][columnIndex];
  }

  getVisibleTreeCount() {
    return this.grid.reduce((accumulator, row, rowIndex) => {
      return row.reduce((accumulator, treeValue, columnIndex) => {
        if (this.isTreeVisible(rowIndex, columnIndex)) {
          accumulator++;
        }

        return accumulator;
      }, accumulator);
    }, 0);
  }

  isTreeVisible(rowIndex: number, columnIndex: number) {
    const isEdge =
      rowIndex === 0 ||
      columnIndex === 0 ||
      rowIndex === this.rowCount - 1 ||
      columnIndex === this.columnCount - 1;

    if (isEdge) {
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

  getTreeScenicScore(rowIndex: number, columnIndex: number) {
    const treeRow = this.grid[rowIndex];
    const treeColumn = this.grid.map((row) => row[columnIndex]);

    const isEdge =
      rowIndex === 0 ||
      columnIndex === 0 ||
      rowIndex === this.rowCount - 1 ||
      columnIndex === this.columnCount - 1;

    if (isEdge) {
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

    // console.log(
    //   'position:',
    //   columnIndex,
    //   rowIndex,
    //   'value:',
    //   this.getTreeValue(rowIndex, columnIndex),
    //   'scores:',
    //   left,
    //   right,
    //   up,
    //   down,
    //   'scenicScores:',
    //   left * right * up * down
    // );
    return left * right * up * down;
  }

  getHighestScenicScore() {
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
) {
  const currentTreeValue = trees[treeIndex];
  //   let isCountingTreesBefore = false;
  //   let isCountingTreesAfter = false;
  //   let numberOfTreesBefore = 0;
  //   let numberOfTreesAfter = 0;
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

    // if (i < treeIndex) {
    //   numberOfTreesBefore++;
    //   if (trees[i] >= currentTreeValue) {
    //     numberOfTreesBefore = 0;
    //   }
    // }

    // if (i === treeIndex) {
    //   numberOfTreesBefore++;
    //   isCountingTreesBefore = false;
    //   isCountingTreesAfter = true;
    // }

    // if (i > treeIndex) {
    //   if (trees[i] >= currentTreeValue) {
    //     isCountingTreesAfter = false;
    //   }
    //   if (isCountingTreesAfter) {
    //     numberOfTreesAfter++;
    //   }
    // }
  }

  return [treeIndex - indexOfViewBefore, indexOfViewAfter - treeIndex];
}

function isTreeVisibleInRow(trees: number[], treeIndex: number) {
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
