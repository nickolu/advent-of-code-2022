import {head, tail} from 'lodash';
import _ = require('lodash');

type NodePosition = {
  x: number;
  y: number;
};

type DirectionValue = [number, number];

const directionValuesMap = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
  LU: [-1, 1],
  LD: [-1, -1],
  RU: [1, 1],
  RD: [1, -1],
};

const directionValues = Object.values(directionValuesMap);

const perpendicularDirectionValues = [
  directionValuesMap.U,
  directionValuesMap.D,
  directionValuesMap.L,
  directionValuesMap.R,
];

abstract class Node {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class HeadNode extends Node {
  move(direction: string) {
    const [x, y] = directionValuesMap[direction];

    this.x += x;
    this.y += y;
  }
}

const startingPosition: NodePosition = {x: 0, y: 0};

class TailNode extends Node {
  visitedPositions: {[id: string]: NodePosition};

  constructor(headNode: HeadNode) {
    super();
    this.visitedPositions = {
      '00': {x: 0, y: 0},
    };
  }

  isHeadNodeConnected(headNode: HeadNode) {
    const [xDistance, yDistance] = getDistanceBetweenNodes(this, headNode);
    return xDistance < 2 && yDistance < 2;
  }

  followHead(headNode: HeadNode) {
    if (this.isHeadNodeConnected(headNode)) {
      return;
    }

    const availableSpacesAroundHead = nodePerpendicularSpaces(headNode);
    const availableSpacesAroundTail = nodeAdjacentSpaces(this);

    const overlap = findOverlappingPosition(
      availableSpacesAroundHead,
      availableSpacesAroundTail
    );

    this.moveToPosition(overlap);
  }

  moveToPosition(position: NodePosition) {
    this.x = position.x;
    this.y = position.y;
    this.addVisitedPosition(position);
  }

  addVisitedPosition(position: NodePosition) {
    const key = `x${position.x}y${position.y}`;

    this.visitedPositions[key] = position;
  }
}

function nodePerpendicularSpaces(node: Node) {
  return perpendicularDirectionValues.map((directionValue: DirectionValue) => {
    const [increaseX, increaseY] = directionValue;
    const {x, y} = node;

    return {x: x + increaseX, y: y + increaseY};
  });
}

function nodeAdjacentSpaces(node: Node) {
  return Object.keys(directionValuesMap).map((key: string) => {
    const [increaseX, increaseY] = directionValuesMap[key];
    const {x, y} = node;

    return {x: x + increaseX, y: y + increaseY, direction: key, old: {x, y}};
  });
}

function findOverlappingPosition(
  group1: NodePosition[],
  group2: NodePosition[]
) {
  for (let i = 0; i < group1.length; i++) {
    for (let j = 0; j < group2.length; j++) {
      if (group1[i].x === group2[j].x && group1[i].y === group2[j].y) {
        return group1[i];
      }
    }
  }
}

function getDistanceBetweenNodes(node1, node2): DirectionValue {
  const x = Math.abs(node1.x - node2.x);
  const y = Math.abs(node1.y - node2.y);
  return [x, y];
}

export default function partOne(input: string) {
  const commands = input.split('\n');
  const headNode = new HeadNode();
  const tailNode = new TailNode(headNode);
  let iterations = 0;
  commands.forEach((command) => {
    const [direction, times] = command.split(' ');

    _.times(Number(times), () => {
      iterations++;
      // console.log('headNode', headNode.x, headNode.y);
      // console.log('tailNode', tailNode.x, tailNode.y);
      // console.log('direction', direction);
      // printGrid(headNode, tailNode);
      // printGrid(headNode, tailNode, false, true);
      headNode.move(direction);
      tailNode.followHead(headNode);

      // console.log('moved');
      // console.log('headNode', headNode.x, headNode.y);
      // console.log('tailNode', tailNode.x, tailNode.y);
      // console.log('===============');
    });
  });
  // console.log('iterations', iterations);

  // console.log(tailNode.visitedPositions);

  // printGrid(headNode, tailNode, true, false);

  console.log(Object.keys(tailNode.visitedPositions).length);
}

function printGrid(
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
