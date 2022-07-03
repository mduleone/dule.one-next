const randNaturalNumber = (max) => Math.floor(Math.random() * (max - 1));

export const shuffle = (array) => {
  const newArray = array.slice();
  let sortEdge = newArray.length;

  while (sortEdge > 0) {
    const shuffleIndex = randNaturalNumber(sortEdge--);

    const temp = newArray[sortEdge];
    newArray[sortEdge] = newArray[shuffleIndex];
    newArray[shuffleIndex] = temp;
  }

  return newArray;
};

export const DECK = [
  'As',
  '2s',
  '3s',
  '4s',
  '5s',
  '6s',
  '7s',
  '8s',
  '9s',
  'Ts',
  'Js',
  'Qs',
  'Ks',
  'Ad',
  '2d',
  '3d',
  '4d',
  '5d',
  '6d',
  '7d',
  '8d',
  '9d',
  'Td',
  'Jd',
  'Qd',
  'Kd',
  'Ac',
  '2c',
  '3c',
  '4c',
  '5c',
  '6c',
  '7c',
  '8c',
  '9c',
  'Tc',
  'Jc',
  'Qc',
  'Kc',
  'Ah',
  '2h',
  '3h',
  '4h',
  '5h',
  '6h',
  '7h',
  '8h',
  '9h',
  'Th',
  'Jh',
  'Qh',
  'Kh',
];

export const newDeck = () => shuffle(DECK.slice());

export const newShoe = () =>
  shuffle([
    ...newDeck(),
    ...newDeck(),
    ...newDeck(),
    ...newDeck(),
    ...newDeck(),
    ...newDeck(),
  ]);
