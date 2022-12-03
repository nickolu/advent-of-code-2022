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
  X = 'rock',
  Y = 'paper',
  Z = 'scissors',
}

export default function partOne(input: string) {
  const inputRows = input.split('\n');
  const accumulateRoundScores = (accumulator, currentValue) => {
    const inputs = currentValue.split(' ');
    const myInput = GameInput[inputs[1]];
    const opponentInput = GameInput[inputs[0]];

    return (accumulator += roundScore(myInput, opponentInput));
  };
  const total = inputRows.reduce(accumulateRoundScores, 0);

  console.log(total);
}

function roundScore(myInput: GameInput, opponentInput: GameInput) {
  let outcome: string;

  if (gameInputChoices[myInput].win === opponentInput) {
    outcome = 'win';
  } else if (myInput === opponentInput) {
    outcome = 'draw';
  } else {
    outcome = 'lose';
  }

  return outcomeValues[outcome] + gameInputChoices[myInput].value;
}
