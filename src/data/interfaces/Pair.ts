export default interface Pair {
  key: string;
  value: string;
}

export function createPair(key: string, value: string): Pair {
  return { key, value };
}
