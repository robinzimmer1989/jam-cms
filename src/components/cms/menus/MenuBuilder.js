import React, { useState } from 'react'
import produce from 'immer'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import SortableTree, { removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree'
import DeleteIcon from 'react-ionicons/lib/IosTrashOutline'

// import app components
import FormWrapper from '../forms/FormWrapper'
import flatToNestedMenuItems from './flatToNestedMenuItems'

import { useStore } from 'store'
import { colors } from 'theme'

const MenuBuilder = props => {
  const { id: menuSlug } = props

  const [
    {
      postState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const menu = site?.menus?.items.find(o => o.slug === menuSlug)
  const menuID = menu?.id || null
  const menuItems = menu?.menuItems?.items || []
  const flatMenuItems = flatToNestedMenuItems(menuItems)

  // TODO: Add tabs for different post types
  const [category, setCategory] = useState('Page')
  const [items, setItems] = useState(flatMenuItems)

  // Get posts by category from postState
  const postType = sites[siteID]?.postTypes?.items.find(o => o.title === category)
  const posts = postType?.posts?.items

  const removeItem = ({ path }) => {
    const newItems = removeNodeAtPath({
      treeData: items,
      path,
      getNodeKey: ({ node }) => node.key,
    })

    setItems(newItems)
  }

  const handleSubmit = async () => {
    // Transform to GraphQL data structure
    const flatItems = getFlatDataFromTree({ treeData: items, getNodeKey: ({ node }) => node.key })

    const modifiedItems = flatItems.map(o => {
      return {
        id: o.node.id || null,
        key: o.node?.post?.id,
        siteID,
        postID: o.node?.post?.id || null,
        post: o.node.post,
        position: o.lowerSiblingCounts.toString(),
      }
    })

    const menu = {
      id: menuID,
      menuItems: {
        items: modifiedItems,
      },
      slug: menuSlug,
    }

    const nextSite = produce(site, draft => {
      if (menuID) {
        const menuIndex = site.menus.items.findIndex(o => o.id === menuID)
        draft.menus.items[menuIndex] = menu
      } else {
        draft.menus.items = [...draft.site.menus.items, menu]
      }
    })

    dispatch({
      type: `SET_EDITOR_SITE`,
      payload: nextSite,
    })

    dispatch({ type: `CLOSE_DIALOG` })
  }

  return (
    <FormWrapper title={`Menu`} button={<Button children={`Accept`} onClick={handleSubmit} variant="contained" />}>
      <Grid>
        <GridItem>
          {posts &&
            posts.map(({ id, title, slug }) => {
              return (
                <PostItem
                  key={id}
                  onClick={() =>
                    setItems([...items, { id: null, key: id, title, subtitle: slug, post: { id, title, slug } }])
                  }
                >
                  {title}
                </PostItem>
              )
            })}
        </GridItem>

        <GridItem>
          <SortableTree
            treeData={items}
            onChange={newItems => setItems(newItems)}
            maxDepth={3}
            getNodeKey={({ node }) => node.key}
            generateNodeProps={nodeProps => {
              return {
                buttons: [
                  <RemoveButton size="small" onClick={() => removeItem(nodeProps)}>
                    <DeleteIcon />
                  </RemoveButton>,
                ],
              }
            }}
          />
        </GridItem>
      </Grid>
    </FormWrapper>
  )
}

const Grid = styled.div`
  display: flex;
  justify-content: space-around;
`

const GridItem = styled.div`
  width: calc(50% - 20px);
  height: 400px;
  padding: 20px;
  overflow: auto;
  background: ${colors.background.light};
  border: 1px solid ${colors.background.dark};

  .rst__rowContents {
    min-width: 150px;
  }
`

const PostItem = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin-bottom: 10px;
  cursor: pointer;
`

const RemoveButton = styled.div`
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export default MenuBuilder
