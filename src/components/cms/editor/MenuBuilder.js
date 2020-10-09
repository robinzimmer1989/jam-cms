import React, { useState } from 'react'
import produce from 'immer'
import { set } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { Button, Row, Col, List, Tree, Collapse, Space, Card } from 'antd'
import AddIcon from 'react-ionicons/lib/IosAdd'

// import app components
import Input from 'components/Input'
import { recursivelyUpdateTree, removeFromTree } from 'utils'
import { useStore } from 'store'

const MenuBuilder = props => {
  const { id: menuSlug } = props

  const [
    {
      sitesState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const menuItems = sites?.[siteID]?.menus?.[menuSlug]?.content || []

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

  const handleUpdate = (e, key) => {
    const updateItem = (parentNode, child, params) => {
      if (child.key === params.key) {
        return {
          ...child,
          title: params.value,
        }
      }

      return child
    }

    const newItems = recursivelyUpdateTree({ children: items }, updateItem, {
      key,
      value: e.target.value,
    })

    setItems(newItems)
  }

  const handleRemove = key => {
    const newItems = removeFromTree({ children: [...items] }, key)
    setItems(newItems.children)
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
        <Col span="8">
          <Card>
            {posts &&
              Object.values(posts).map(({ id, title, postTypeID }) => {
                return (
                  <List.Item
                    key={id}
                    extra={[
                      <Button
                        key="add"
                        size="small"
                        onClick={() =>
                          setItems([...items, { key: uuidv4(), title, postTypeID, postID: id, children: [] }])
                        }
                        shape="circle"
                      >
                        <AddIcon />
                      </Button>,
                    ]}
                  >
                    {title}
                  </List.Item>
                )
              })}
          </Card>
        </Col>

        <Col span="14">
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            onDrop={onDrop}
            treeData={items}
            titleRender={node => {
              return (
                <Collapse>
                  <Collapse.Panel header={node.title}>
                    <Space direction="vertical">
                      <Input label="title" value={node.title} onChange={e => handleUpdate(e, node.key)} />
                      <Button size="small" danger children={`Remove`} onClick={() => handleRemove(node.key)} />
                    </Space>
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
