/* eslint-disable import/prefer-default-export */
export const orderByKeyObject = (items, key, order) => {
  const sort = items.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }

    return 0;
  });

  return order === 'DESC' ? sort.reverse() : sort;
};
