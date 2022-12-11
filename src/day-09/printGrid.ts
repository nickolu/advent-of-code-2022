import {HeadNode, NodePosition, TailNode} from './Node';
import Rope from './Rope';

/* utility for printing the position of objects on the grid */

export function printPart1Grid(
  headNode: HeadNode,
  tailNode: TailNode,
  showTrail: boolean,
  showNodes: boolean
) {
  const gridWidth = 6;
  const gridHeight = 6;
  const grid = Array.from(new Array(gridHeight))
    .map(
      (_, rowIndex) =>
        Array.from(new Array(gridWidth))
          .map((_, columnIndex) => {
            if (showNodes) {
              if (columnIndex === headNode.x && rowIndex === headNode.y) {
                return 'H';
              }
              if (columnIndex === tailNode.x && rowIndex === tailNode.y) {
                return 'T';
              }
            }

            let positionMarker = '.';
            if (showTrail) {
              Object.values(tailNode.visitedPositions).forEach(
                (position: NodePosition) => {
                  if (columnIndex === position.x && rowIndex === position.y) {
                    positionMarker = '#';
                  }
                }
              );
            }

            return positionMarker;
          })
          .join('') + '\n'
    )
    .reverse()
    .join('');

  console.log(grid);
}

export function printPart2Grid(rope: Rope, showTrail: boolean) {
  const gridWidth = 100;
  const gridHeight = 2000;
  const offsetWidth = gridWidth / 2;
  const offsetHeight = gridHeight / 2;
  const grid = Array.from(new Array(gridHeight))
    .map(
      (_, rowIndex) =>
        Array.from(new Array(gridWidth))
          .map((_, columnIndex) => {
            let positionMarker = '.';
            if (
              columnIndex + offsetWidth === 0 &&
              rowIndex + offsetHeight === 0
            ) {
              return 's';
            }

            if (showTrail) {
              const tailVisitedPositions = Object.values(
                rope.tailNode.visitedPositions
              );
              for (let i = 0; i < tailVisitedPositions.length; i++) {
                if (
                  columnIndex - offsetWidth === tailVisitedPositions[i].x &&
                  rowIndex - offsetHeight === tailVisitedPositions[i].y
                ) {
                  return '#';
                }
              }

              return '.';
            }
            rope.nodes.forEach((node, i) => {
              if (
                columnIndex - offsetWidth === node.x &&
                rowIndex - offsetHeight === node.y
              ) {
                positionMarker = getRopeCharacter(rope, i);
              }
            });

            return positionMarker;
          })
          .join('') + '\n'
    )
    .reverse()
    .join('');

  console.log(grid);
}

function getRopeCharacter(rope: Rope, i: number): string {
  if (i === 0) {
    return 'H';
  }
  if (i === rope.nodes.length - 1) {
    return 'T';
  }
  return i.toString();
}
