export default function deepCopyTree(obj) {
  if (obj) {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return [];
  }
}
