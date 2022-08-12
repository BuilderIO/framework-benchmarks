export type AnyObject = Record<string, any>;

export function sortBy<T extends AnyObject>(key: keyof T) {
  return (a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
}
