import {over} from 'lodash';

export type NodePosition = {
  x: number;
  y: number;
};

export const directionValuesMap = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

abstract class Node {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  get position() {
    const {x, y} = this;
    return {x, y};
  }

  move(direction: [number, number]) {
    const [x, y] = direction;

    this.x += x;
    this.y += y;
  }
}

export class HeadNode extends Node {}
export class TailNode extends Node {
  visitedPositions: {[id: string]: NodePosition};

  constructor() {
    super();
    this.visitedPositions = {
      x0y0: {x: 0, y: 0},
    };
  }

  get visitedPositionNames() {
    return Object.keys(this.visitedPositions);
  }

  followNode(node: Node) {
    if (areNodesConnected(this, node)) {
      return;
    }

    let moveX = 0;
    let moveY = 0;

    if (this.y !== node.y) {
      if (this.y > node.y) {
        moveY = -1;
      } else {
        moveY = 1;
      }
    }

    if (this.x !== node.x) {
      if (this.x > node.x) {
        moveX = -1;
      } else {
        moveX = 1;
      }
    }

    this.move([moveX, moveY]);
    this.addVisitedPosition(this.position);
  }

  addVisitedPosition(position: NodePosition) {
    const key = `x${position.x}y${position.y}`;

    this.visitedPositions[key] = position;
  }
}

function areNodesConnected(node1: Node, node2: Node): boolean {
  const x = Math.abs(node1.x - node2.x);
  const y = Math.abs(node1.y - node2.y);

  return x < 2 && y < 2;
}
