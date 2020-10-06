import { set } from 'lodash'

import { sortBy } from 'utils'

export default function(menuItems) {
  const items = []

  // TODO: Make recursive function
  const orderedItems = menuItems.map(o => {
    return { ...o, position: o.position.split(',').map(i => +i), depth: o.position.split(',').length }
  })

  sortBy(orderedItems, 'depth', 'ASC')

  orderedItems.map(({ id, position, depth, post }) => {
    const item = {
      id,
      key: id,
      title: post?.title || 'None',
      subtitle: post?.slug || '',
      post,
      expanded: true,
    }

    if (depth === 1) {
      set(items, `${position[0]}`, item)
    } else if (depth === 2) {
      set(items, `${position[0]}.children.${position[1]}`, item)
    } else if (depth === 3) {
      set(items, `${position[0]}.children.${position[1]}.children.${position[2]}`, item)
    }
  })

  return items
}
