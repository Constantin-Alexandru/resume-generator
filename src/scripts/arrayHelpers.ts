export function insertAt<T>(array: T[], item: T, index: number): T[] {
  if (index < 0 || index > array.length) throw new Error('Index out of bounds');
  if (index === array.length) {
    array.push(item);
    return [...array];
  }

  return [...array.slice(0, index), item, ...array.slice(index)];
}

export function replaceAt<T>(array: T[], item: T, index: number): T[] {
  if (index < 0 || index >= array.length)
    throw new Error('Index out of bounds');

  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}

export function deleteAt<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length)
    throw new Error('Index out of bounds');

  return [...array.slice(0, index), ...array.slice(index + 1)];
}
