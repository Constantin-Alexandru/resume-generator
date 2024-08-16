export function capitalize<T extends string>(str: T): Capitalize<typeof str> {
  if (str.length === 0) return '' as Capitalize<typeof str>;

  return (str[0].toUpperCase() + str.slice(1)) as Capitalize<typeof str>;
}
