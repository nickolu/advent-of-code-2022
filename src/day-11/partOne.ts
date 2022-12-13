import _ = require('lodash');
import {javascript} from 'webpack';

const monkeyRegistry: {
  [id: string]: Monkey;
} = {};

class Monkey {
  id: string;
  items: number[];
  test: number;
  testResult: boolean;
  inspectedItemsCount: number;
  operationValue: string;
  ifTrue: string;
  ifFalse: string;

  constructor(id: string) {
    this.id = id;
    this.items = [];
    this.inspectedItemsCount = 0;
  }
  multiplyWorry() {
    const [a, b, c, operator, amount] = this.operationValue.split(' ');
    const operationString = ['old', operator, amount].join(' ');

    let old = this.items[0];
    old = eval(operationString);

    console.log(
      `worry level ${this.items[0]} is changed by operation: (${operationString}) to become ${old}`
    );

    this.items[0] = old;
  }
  throwTo(monkey: Monkey) {
    const currentItem = this.items.splice(0, 1)[0];
    console.log(
      `Item with worry level ${currentItem} is thrown to monkey ${monkey.id}.`
    );
    monkey.items.push(currentItem);
  }

  inspectAndThrowAllItems() {
    const itemsToThrow = [...this.items];
    itemsToThrow.forEach(() => {
      this.inspectAndThrowCurrentItem();
    });
  }

  inspectAndThrowCurrentItem() {
    console.log(
      `monkey ${this.id} inspects an item with a worry of ${this.items[0]}`
    );
    this.inspectedItemsCount++;
    this.multiplyWorry();

    this.items[0] = Math.floor(this.items[0] / 3);
    console.log(
      `Monkey gets bored with item. Worry level is divided by 3 to ${this.items[0]}`
    );
    const testResult = this.items[0] % this.test === 0;
    if (testResult) {
      console.log(`current worry level is  divisible by ${this.test}`);
      this.throwTo(monkeyRegistry[this.ifTrue]);
    } else {
      console.log(`current worry level is not divisible by ${this.test}`);
      this.throwTo(monkeyRegistry[this.ifFalse]);
    }
  }
}

class Setup {
  monkey: Monkey;
  constructor() {}
  initCommand(command: string, value: string) {
    if (command.indexOf('Monkey') > -1) {
      const [monkeyCommand, monkeyValue] = command.split(' ');
      command = monkeyCommand;
      value = monkeyValue[0];
    }

    const commandMap = {
      Monkey: () => this.setMonkey(value),
      'Starting items': () => this.setStartingItems(value),
      Operation: () => this.setOperation(value),
      Test: () => this.setTestValue(value),
      'If true': () => this.setIfTrue(value),
      'If false': () => this.setIfFalse(value),
    };

    commandMap[command]();
  }

  setMonkey(value: string) {
    this.monkey = this.getMonkey(value);
  }

  setStartingItems(value: string) {
    this.monkey.items = value.split(', ').map((v) => Number(v));
  }

  setOperation(value: string) {
    this.monkey.operationValue = value;
  }

  setTestValue(value: string) {
    const args = value.split(' ');
    const denominator = args[args.length - 1];
    this.monkey.test = Number(denominator);
  }

  setIfTrue(value: string) {
    const [a, b, c, targetMonkey] = value.split(' ');
    this.monkey.ifTrue = targetMonkey;
  }

  setIfFalse(value: string) {
    const [a, b, c, targetMonkey] = value.split(' ');
    this.monkey.ifFalse = targetMonkey;
  }

  getMonkey(value: string) {
    if (!monkeyRegistry[value]) {
      monkeyRegistry[value] = new Monkey(value);
    }

    return monkeyRegistry[value];
  }
}

function round() {
  const monkeyCount = Object.keys(monkeyRegistry).length;

  for (let i = 0; i < monkeyCount; i++) {
    const monkey = monkeyRegistry[i];
    monkey.inspectAndThrowAllItems();
  }
}

function calculateMonkeyBusiness() {
  const monkeyActivity = Object.values(monkeyRegistry).map((monkey) => {
    return monkey.inspectedItemsCount;
  });

  monkeyActivity.sort((a, b) => b - a);
  console.log(monkeyActivity);
  console.log(monkeyActivity[0], monkeyActivity[1]);
  return monkeyActivity[0] * monkeyActivity[1];
}

export default function partOne(input: string) {
  const lines = input.split('\n');
  const setup = new Setup();
  const NUMBER_OF_ROUNDS = 20;

  lines.forEach((line, i) => {
    line = line.trim();
    if (line === '') {
      return;
    }

    const [command, value] = line.split(': ');

    setup.initCommand(command, value);
  });

  _.times(NUMBER_OF_ROUNDS, round);
  console.log(calculateMonkeyBusiness());
}
