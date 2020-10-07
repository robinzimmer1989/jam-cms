import React, { useState } from 'react'
import produce from 'immer'
import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { Button, Row, Col, List, Tree, Collapse } from 'antd'
import DeleteIcon from 'react-ionicons/lib/IosTrashOutline'

// import app components
import { useStore } from 'store'

const MenuBuilder = props => {
  const { id: menuSlug } = props

  const [
    {
      postState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const menuItems = sites?.[siteID]?.menus?.[menuSlug]?.content

  console.log(sites)

  // TODO: Add tabs for different post types
  const [category, setCategory] = useState('Page')
  const [items, setItems] = useState([...menuItems])

  // Get posts by category
  const postType = Object.values(sites[siteID]?.postTypes).find(o => o.title === category)
  const posts = postType?.posts

  // Function provided by Ant Design
  const onDrop = info => {
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    const dropPos = info.node.props.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children, key, callback)
        }
      }
    }
    const newItems = [...items]

    let dragObj
    loop(newItems, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      loop(newItems, dropKey, item => {
        item.children = item.children || []
        item.children.push(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1 // On the bottom gap
    ) {
      loop(newItems, dropKey, item => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(newItems, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }
    setItems(newItems)
  }

  const handleSubmit = async () => {
    const nextSite = produce(site, draft => {
      set(draft, `menus.${menuSlug}.content`, items)
    })

    dispatch({
      type: `SET_EDITOR_SITE`,
      payload: nextSite,
    })

    dispatch({ type: `CLOSE_DIALOG` })
  }

  return (
    <Container>
      <Row justify="space-between">
        <Col span="12">
          {posts &&
            Object.values(posts).map(({ id, title, postTypeID }) => {
              return (
                <List.Item
                  key={id}
                  extra={[
                    <Button
                      size="small"
                      onClick={() => setItems([...items, { key: uuidv4(), title, postTypeID, postID: id }])}
                    >
                      <DeleteIcon />
                    </Button>,
                  ]}
                >
                  {title}
                </List.Item>
              )
            })}
        </Col>

        <Col span="12">
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            onDrop={onDrop}
            treeData={items}
            titleRender={node => {
              return (
                <Collapse defaultActiveKey={['1']}>
                  <Collapse.Panel header={node.title} key="1">
                    <p>test</p>
                  </Collapse.Panel>
                </Collapse>
              )
            }}
          />
        </Col>
      </Row>
      <Button children={`Accept`} onClick={handleSubmit} type="primary" />
    </Container>
  )
}

const Container = styled.div`
  .ant-row {
    height: 400px;
  }

  .rst__rowContents {
    min-width: 150px;
  }
`

export default MenuBuilder
