/**
 * Usage: array.sort(sortBy('key'))
 */
export const sortBy = (key: any) => {
  return (a: any, b: any) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

export const sortByNumeric = (key: any) => {
  return (a: any, b: any) => {
    let aVal = parseFloat(a[key]);
    let bVal = parseFloat(b[key]);

    if (isNaN(aVal)) {
      aVal = a[key];
    }
    if (isNaN(bVal)) {
      bVal = b[key];
    }

    return aVal > bVal ? 1 : bVal > aVal ? -1 : 0;
  };
};
