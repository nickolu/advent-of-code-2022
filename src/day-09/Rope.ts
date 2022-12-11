import _ = require('lodash');
import {directionValuesMap, HeadNode, TailNode} from './Node';

export default class Rope {
  headNode: HeadNode;
  tailNodes: TailNode[];

  constructor(length: number) {
    this.headNode = new HeadNode();
    this.tailNodes = getEmptyArray(length - 1).map((_, i) => new TailNode());
  }

  move(direction: [number, number]) {
    this.headNode.move(direction);
    this.tailNodes.reduce(
      (nodeToFollow: TailNode | HeadNode, currentNode: TailNode): TailNode => {
        currentNode.followNode(nodeToFollow);
        return currentNode;
      },
      this.headNode
    );
  }

  get visitedPositions() {
    return Object.keys(this.tailNode);
  }

  get nodes() {
    return [this.headNode, ...this.tailNodes];
  }

  get tailNode(): TailNode {
    return this.nodes[this.nodes.length - 1] as TailNode;
  }
}

export function applyCommandsToRope(commands: string[], rope: Rope) {
  commands.forEach((command) => {
    const [direction, times] = command.split(' ');

    _.times(Number(times), () => {
      rope.move(directionValuesMap[direction]);
    });
  });
}

function getEmptyArray(length: number) {
  return Array.from(new Array(length));
}
