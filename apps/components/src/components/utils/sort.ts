/**
 * Usage: array.sort(sortBy('key'))
 */
export const sortBy = (key: any) => {
  return (a: any, b: any) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};
