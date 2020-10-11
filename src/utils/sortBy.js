export default function(array, param, direction = 'DESC') {
  let x, y
  if (direction.toUpperCase() === 'DESC') {
    x = 1
    y = -1
  } else {
    x = -1
    y = 1
  }

  array.sort((a, b) => (a[param] < b[param] ? x : b[param] < a[param] ? y : 0))
}
