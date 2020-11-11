import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { Button, Row, Col, List, Tree, Collapse, Space, Card, Tabs } from 'antd'
import AddIcon from 'react-ionicons/lib/IosAdd'

// import app components
import Input from './Input'
import { recursivelyUpdateTree, removeFromTree, deepCopyTree } from '../utils'
import { useStore } from '../store'

const MenuBuilder = (props) => {
  const { value = [], onChange } = props

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore()

  const [filter, setFilter] = useState('Pages')
  const [items, setItems] = useState(deepCopyTree(value))
  const [customLink, setCustomLink] = useState({
    title: '',
    url: '',
  })

  // Get posts by filter
  const postType = Object.values(sites[siteID]?.postTypes).find((o) => o.title === filter)
  const posts = postType?.posts

  // Function provided by Ant Design
  const onDrop = (info) => {
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
    const data = [...items]

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert
        item.children.push(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    setItems(data)
  }

  const handleUpdate = (e, name, key) => {
    const updateItem = (parentNode, child, params) => {
      if (child.key === params.key) {
        return {
          ...child,
          [name]: params.value,
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

  const handleRemove = (key) => {
    const newItems = removeFromTree({ children: [...items] }, key)
    setItems(newItems.children)
  }

  const handleSubmit = async () => {
    onChange(items)
    dispatch({ type: `CLOSE_DIALOG` })
  }

  const handleAddCustomLink = () => {
    if (!customLink.title || !customLink.url) {
      return
    }

    setItems([...items, { key: uuidv4(), ...customLink, postTypeID: null, postID: null, children: [] }])
    setCustomLink({ title: '', url: '' })
  }

  return (
    <Container>
      <Row justify="space-between">
        <Col span="11">
          <Card>
            <Tabs defaultActiveKey="all" onChange={(v) => setFilter(v)}>
              {Object.values(sites[siteID]?.postTypes).map((o) => {
                return <Tabs.TabPane key={o.title} tab={o.title.toUpperCase()} />
              })}

              <Tabs.TabPane key={'custom-link'} tab={'CUSTOM LINK'} />
            </Tabs>

            <ItemsContainer>
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

              {filter === 'custom-link' && (
                <Space direction="vertical" size={20}>
                  <Input
                    label="Title"
                    value={customLink.title}
                    onChange={(e) => setCustomLink({ ...customLink, title: e.target.value })}
                  />
                  <Input
                    label="Url"
                    value={customLink.url}
                    onChange={(e) => setCustomLink({ ...customLink, url: e.target.value })}
                    placeholder="https://"
                  />
                  <Button style={{ marginBottom: 20 }} children={`Add`} type="primary" onClick={handleAddCustomLink} />
                </Space>
              )}
            </ItemsContainer>
          </Card>
        </Col>

        <Col span="12">
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            onDrop={onDrop}
            treeData={items}
            titleRender={(node) => {
              const header = node.url ? `${node.title} - Custom` : node.title

              return (
                <Collapse>
                  <Collapse.Panel header={header}>
                    <Space direction="vertical">
                      <Input label="title" value={node.title} onChange={(e) => handleUpdate(e, 'title', node.key)} />
                      {node.url && (
                        <Input label="Url" value={node.url} onChange={(e) => handleUpdate(e, 'url', node.key)} />
                      )}
                      <Button size="small" danger children={`Remove`} onClick={() => handleRemove(node.key)} />
                    </Space>
                  </Collapse.Panel>
                </Collapse>
              )
            }}
          />
        </Col>
      </Row>
      <Button children={`Update`} onClick={handleSubmit} type="primary" />
    </Container>
  )
}

const Container = styled.div`
  .ant-row {
    height: 400px;
  }

  .ant-card-body {
    padding: 24px 0 0 24px;
  }

  .rst__rowContents {
    min-width: 150px;
  }
`

const ItemsContainer = styled.div`
  max-height: 290px;
  overflow-y: auto;
  padding-right: 24px;
`

export default MenuBuilder
