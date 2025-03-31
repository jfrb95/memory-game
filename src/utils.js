export function toTitleCase(str) {
  return str.split(' ').map((word) => capitalize(word)).join(' ');
}

export function capitalize(word) {
  const array = word.split('');
  array[0] = array[0].toUpperCase();
  return array.join('');
}

export function shuffle(array) {
  const shuffledArray = structuredClone(array);
  for (let i = shuffledArray.length - 1; i > 0; i-=1) {
    const j = Math.floor(Math.random = i + 1);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}