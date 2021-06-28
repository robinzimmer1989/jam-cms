import React, { useMemo } from 'react';
import { TreeSelect, Space } from 'antd';

// import app components
import Caption from './Caption';
import { createDataTree } from '../utils';

const PostTreeSelect = (props) => {
  const { items = [], value, label, onChange } = props;

  const tree = useMemo(() => {
    const treePosts = createDataTree(items);

    const renderTreeNode = (item) => {
      return (
        <TreeSelect.TreeNode key={item.id} value={item.id} title={item.title}>
          {item.childNodes.map((o) => renderTreeNode(o))}
        </TreeSelect.TreeNode>
      );
    };

    return (
      <TreeSelect
        showSearch
        treeNodeFilterProp="title"
        value={value}
        treeDefaultExpandAll
        onChange={onChange}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        <TreeSelect.TreeNode value={0} title={`None`} />
        {treePosts.map((o) => renderTreeNode(o))}
      </TreeSelect>
    );
  }, [value]);

  return (
    <Space direction="vertical" size={6}>
      <Caption children={label} />
      {tree}
    </Space>
  );
};

export default PostTreeSelect;
