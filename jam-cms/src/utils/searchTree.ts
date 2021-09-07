export default function searchTree(
  tree: any,
  value: any,
  key: string = 'key',
  reverse: boolean = false
) {
  const stack = [...tree];

  while (stack.length) {
    const node = stack[reverse ? 'pop' : 'shift']();
    if (node[key] === value) {
      return node;
    }

    node.children && stack.push(...node.children);
  }

  return null;
}
