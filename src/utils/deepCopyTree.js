export default function deepCopyTree(obj) {
  return JSON.parse(JSON.stringify(obj))
}
