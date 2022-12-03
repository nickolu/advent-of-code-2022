const gameInputChoices = {
  rock: {
    value: 1,
    win: 'scissors',
    lose: 'paper',
  },
  paper: {
    value: 2,
    win: 'rock',
    lose: 'scissors',
  },
  scissors: {
    value: 3,
    win: 'paper',
    lose: 'rock',
  },
};

const outcomeValues = {
  win: 6,
  draw: 3,
  lose: 0,
};

enum GameInput {
  A = 'rock',
  B = 'paper',
  C = 'scissors',
  X = 'lose',
  Y = 'draw',
  Z = 'win',
}

enum Outcome {
  lose = 'X',
  draw = 'Y',
  win = 'Z',
}

export default function partTwo(input: string) {
  const rounds = input.split('\n');
  const accumulateRoundScores = (accumulator: number, currentValue: string) => {
    const inputs = currentValue.split(' ');
    const desiredOutcome = GameInput[inputs[1]];
    const opponentInput = GameInput[inputs[0]];

    return (accumulator += roundScore(opponentInput, desiredOutcome));
  };

  const total = rounds.reduce(accumulateRoundScores, 0);

  console.log(total);
}

function roundScore(opponentInput: GameInput, desiredOutcome: GameInput) {
  let myInput: GameInput;

  if (Outcome[desiredOutcome] === Outcome.draw) {
    myInput = opponentInput;
  } else {
    myInput = gameInputChoices[opponentInput][desiredOutcome];
  }

  return outcomeValues[desiredOutcome] + gameInputChoices[myInput].value;
}
