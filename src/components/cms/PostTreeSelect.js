import React from 'react'
import { TreeSelect, Space } from 'antd'

// import app components
import Caption from 'components/Caption'
import { createDataTree } from 'utils'

const PostTreeSelect = props => {
  const { items = {}, value, onChange } = props

  const treePosts = createDataTree(Object.values(items))

  const renderTreeNode = item => {
    return (
      <TreeSelect.TreeNode key={item.id} value={item.id} title={item.title}>
        {item.childNodes.map(o => renderTreeNode(o))}
      </TreeSelect.TreeNode>
    )
  }

  return (
    <Space direction="vertical" size={2}>
      <Caption children={`Parent`} />
      <TreeSelect
        showSearch
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
      >
        <TreeSelect.TreeNode value={``} title={`None`} />
        {treePosts.map(o => renderTreeNode(o))}
      </TreeSelect>
    </Space>
  )
}

export default PostTreeSelect
