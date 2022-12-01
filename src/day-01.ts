type hello = {
  world: string;
};

function myFunc(): hello {
  return {
    world: 'barfoo',
  };
}

console.log(myFunc());
