import produce from 'immer';

export default function (array, param, direction = 'DESC') {
  let x;
  let y;

  if (direction.toUpperCase() === 'DESC') {
    x = 1;
    y = -1;
  } else {
    x = -1;
    y = 1;
  }

  const nextArray = produce(array, (draft) => {
    return draft.sort((a, b) => {
      if (a[param] < b[param]) {
        return x;
      } else if (b[param] < a[param]) {
        return y;
      } else {
        return 0;
      }
    });
  });

  return nextArray;
}
