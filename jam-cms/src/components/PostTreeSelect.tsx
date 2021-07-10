import React, { useMemo } from 'react';
import { TreeSelect, Space } from 'antd';

// import app components
import Caption from './Caption';
import { createDataTree } from '../utils';

const PostTreeSelect = (props: any) => {
  const { items = [], value, label, onChange } = props;

  const tree = useMemo(() => {
    const treePosts = createDataTree(items);

    const renderTreeNode = (item: any) => {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TreeSelect.TreeNode key={item.id} value={item.id} title={item.title}>
          {item.childNodes.map((o: any) => renderTreeNode(o))}
        </TreeSelect.TreeNode>
      );
    };

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TreeSelect
        showSearch
        treeNodeFilterProp="title"
        value={value}
        treeDefaultExpandAll
        onChange={onChange}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TreeSelect.TreeNode value={0} title={`None`} />
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type. */}
        {treePosts.map((o) => renderTreeNode(o))}
      </TreeSelect>
    );
  }, [value]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space direction="vertical" size={6}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Caption children={label} />
      {tree}
    </Space>
  );
};

export default PostTreeSelect;
