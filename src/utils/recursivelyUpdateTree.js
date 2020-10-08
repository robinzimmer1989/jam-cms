export default function recursivelyUpdateTree(node, func, param) {
  if (typeof func !== 'function' || !node.hasOwnProperty('children') || node.children.length < 1) {
    return
  }

  const newNodeChildren = node.children.map(child => {
    const newChild = func(node, child, param)

    return {
      ...child,
      ...newChild,
      children: recurseChildren(newChild, newChild.children, func, param),
    }
  })

  function recurseChildren(parent, children, func, param) {
    if (!children) {
      return
    }

    const newChildren = children.map(child => {
      const newChild = func(parent, child, param)

      if (child.hasOwnProperty('children') && child.children.length > 0) {
        return {
          ...child,
          ...newChild,
          children: recurseChildren(newChild, newChild.children, func, param),
        }
      }

      return {
        ...child,
        ...newChild,
      }
    })

    return newChildren
  }

  return newNodeChildren
}
