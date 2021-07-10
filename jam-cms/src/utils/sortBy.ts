import produce from 'immer';

export default function (array: any, param: any, direction = 'DESC') {
  let x: any;
  let y: any;

  if (direction.toUpperCase() === 'DESC') {
    x = 1;
    y = -1;
  } else {
    x = -1;
    y = 1;
  }

  const nextArray = produce(array, (draft: any) => {
    return draft.sort((a: any, b: any) => {
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
