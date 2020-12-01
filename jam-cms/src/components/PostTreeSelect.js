import React from 'react';
import { TreeSelect, Space } from 'antd';

// import app components
import Caption from './Caption';
import { createDataTree } from '../utils';

const PostTreeSelect = (props) => {
  const { items = [], value, label, onChange } = props;

  const treePosts = createDataTree(items);

  const renderTreeNode = (item) => {
    return (
      <TreeSelect.TreeNode key={item.id} value={item.id} title={item.title}>
        {item.childNodes.map((o) => renderTreeNode(o))}
      </TreeSelect.TreeNode>
    );
  };

  return (
    <Space direction="vertical" size={2}>
      <Caption children={label} />
      <TreeSelect
        showSearch
        treeNodeFilterProp="title"
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
      >
        <TreeSelect.TreeNode value={0} title={`None`} />
        {treePosts.map((o) => renderTreeNode(o))}
      </TreeSelect>
    </Space>
  );
};

export default PostTreeSelect;
