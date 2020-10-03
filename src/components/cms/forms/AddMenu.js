import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree'
import DeleteIcon from 'react-ionicons/lib/IosTrashOutline'

// import app components
import FormWrapper from './FormWrapper'

import { collectionActions } from 'actions'
import { useStore } from 'store'
import { colors } from 'theme'

const AddMenu = props => {
  const { value, onChange } = props

  // TODO: Add tabs for different post types
  const [category, setCategory] = useState('Page')
  const [items, setItems] = useState([])

  const [
    {
      postState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  // Filter out pages from all sites data
  const postType = sites[siteID]?.postTypes?.items.find(o => o.title === category)
  const posts = postType?.posts?.items

  // As soon as posts are loaded, we gonna assign the 'real' title and slug from the posts array
  useEffect(() => {
    if (value.length > 0 && posts) {
      const menuItems = value
        .map(({ id, type }) => {
          if (type === 'post') {
            const post = posts.find(o => o.id === id)

            if (post) {
              return { id, type, title: post.title, slug: post.slug }
            }
          } else if (type === 'link') {
          }

          return null
        })
        .filter(o => !!o)

      setItems(menuItems)
    }
  }, [value, posts])

  // Load collection in case user visits editor directly
  useEffect(() => {
    const loadCollection = async postTypeID => {
      await collectionActions.getCollection({ postTypeID }, dispatch)
    }

    const postType = site?.postTypes?.items.find(o => o.title === category)
    postType && loadCollection(postType.id)
  }, [site, category])

  const handleSubmit = () => {
    // Only return page id / link + title combination for custom links
    const menuItems = items.map(({ id, type }) => {
      return { id, type }
    })

    onChange(menuItems)
  }

  const removeItem = ({ path }) => {
    const newItems = removeNodeAtPath({
      treeData: items,
      path,
      getNodeKey: ({ node }) => node.id,
    })

    setItems(newItems)
  }

  return (
    <FormWrapper title={`Menu`} button={<Button children={`Save`} onClick={handleSubmit} variant="contained" />}>
      <Grid>
        <GridItem>
          {posts &&
            posts.map(({ id, title, slug: subtitle }) => {
              return (
                <PostItem key={id} onClick={() => setItems([...items, { id, title, subtitle, type: 'post' }])}>
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
            shouldCopyOnOutsideDrop={true}
            getNodeKey={({ node }) => node.id}
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

export default AddMenu
