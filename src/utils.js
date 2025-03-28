export function toTitleCase(str) {
  return str.split(' ').map((word) => capitalize(word)).join(' ');
}

export function capitalize(word) {
  const array = word.split('');
  array[0] = array[0].toUpperCase();
  return array.join('');
}