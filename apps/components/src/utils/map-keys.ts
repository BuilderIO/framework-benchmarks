export function mapValues<T, U>(
  obj: { [key: string]: T },
  fn: (value: T, key: string) => U
): { [key: string]: U } {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {} as { [key: string]: U });
}
