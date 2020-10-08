export default function removeFromTree(tree, key) {
  if (tree.key === key) return undefined

  const children = tree.children.map(child => removeFromTree(child, key)).filter(node => !!node)

  return {
    ...tree,
    children,
  }
}
