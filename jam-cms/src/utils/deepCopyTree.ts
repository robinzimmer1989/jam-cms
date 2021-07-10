export default function deepCopyTree(obj: any) {
  if (obj) {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return [];
  }
}
