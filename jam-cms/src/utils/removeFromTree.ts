export default function removeFromTree(tree: any, key: any) {
  if (tree.key === key) return undefined;

  const children = tree.children
    .map((child: any) => removeFromTree(child, key))
    .filter((node: any) => !!node);

  return {
    ...tree,
    children,
  };
}
