import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Tree, Collapse, Space, Tabs, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// import app components
import Input from '../Input';
import ListItem from '../ListItem';
import Tag from '../Tag';
import {
  recursivelyUpdateTree,
  removeFromTree,
  deepCopyTree,
  generateRandomString,
  generateSlug,
} from '../../utils';
import { colors } from '../../theme';
import { useStore } from '../../store';

const Menu = (props) => {
  const { value = [], onChange } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
  ] = useStore();

  const [dialog, setDialog] = useState({ active: false, node: null });
  const [filter, setFilter] = useState('Pages');
  const [items, setItems] = useState([]);
  const [customLink, setCustomLink] = useState({
    title: '',
    url: '',
  });

  useEffect(() => {
    if (value && value.length > 0) {
      setItems(deepCopyTree(value));
    }
  }, [value]);

  // Get posts by filter
  const postType = Object.values(sites[siteID]?.postTypes).find((o) => o.title === filter);
  const posts = postType?.posts;

  // Function provided by Ant Design
  const onDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...items];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    onChange(data);
  };

  const handleUpdate = (e, name, key) => {
    const updateItem = (parentNode, child, params) => {
      if (child.key === params.key) {
        return {
          ...child,
          [name]: params.value,
        };
      }

      return child;
    };

    const newItems = recursivelyUpdateTree({ children: items }, updateItem, {
      key,
      value: e.target.value,
    });

    onChange(newItems);
  };

  const handleRemove = (key) => {
    const newItems = removeFromTree({ children: [...items] }, key);

    onChange(newItems.children);
  };

  const handleAddCustomLink = () => {
    if (!customLink.title || !customLink.url) {
      return;
    }

    onChange([
      ...items,
      { key: generateRandomString(), ...customLink, postTypeID: null, postID: null, children: [] },
    ]);
    setCustomLink({ title: '', url: '' });
  };

  return (
    <>
      <Container>
        <div>
          <div>
            <Tree
              className="draggable-tree"
              draggable
              blockNode
              onDrop={onDrop}
              treeData={items}
              titleRender={(node) => {
                return (
                  <Collapse expandIconPosition="right">
                    <Collapse.Panel header={node.title}>
                      <Space direction="vertical">
                        <Input
                          label="title"
                          value={node.title}
                          onChange={(e) => handleUpdate(e, 'title', node.key)}
                        />
                        {node.url && (
                          <Input
                            label="Url"
                            value={node.url}
                            onChange={(e) => handleUpdate(e, 'url', node.key)}
                            disabled={node.postTypeID}
                          />
                        )}
                        <Button
                          size="small"
                          danger
                          children={`Remove`}
                          onClick={() => handleRemove(node.key)}
                        />
                      </Space>
                    </Collapse.Panel>
                  </Collapse>
                );
              }}
            />
          </div>

          <Button
            children={`Add item`}
            onClick={() => setDialog({ active: true, node: null })}
            block
          />
        </div>
      </Container>

      <Modal
        title="Add item"
        visible={dialog.active}
        onCancel={() => setDialog({ active: false, node: null })}
        width={500}
        footer={null}
      >
        <Tabs defaultActiveKey={filter} onChange={(v) => setFilter(v)}>
          {Object.values(sites[siteID]?.postTypes).map((o) => {
            return <Tabs.TabPane key={o.title} tab={o.title.toUpperCase()} />;
          })}

          <Tabs.TabPane key={'custom-link'} tab={'CUSTOM LINK'} />
        </Tabs>

        <div>
          {posts &&
            Object.values(posts)
              .filter(({ status }) => status !== 'trash')
              .map(({ id, title, status, postTypeID }) => {
                const badges = [];

                if (status === 'draft') {
                  badges.push(<Tag key="status" children={status} />);
                }

                return (
                  <StyledListItem
                    key={id}
                    title={title}
                    status={badges}
                    actions={[
                      <Button
                        key="add"
                        size="small"
                        disabled={status === 'draft'}
                        onClick={() =>
                          onChange([
                            ...items,
                            {
                              key: generateRandomString(),
                              title,
                              postTypeID,
                              postID: id,
                              children: [],
                              url: generateSlug(postType, id, sites?.[siteID]?.frontPage, true),
                            },
                          ])
                        }
                        shape="circle"
                      >
                        <PlusOutlined />
                      </Button>,
                    ]}
                  />
                );
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
              <Button
                style={{ marginBottom: 20 }}
                children={`Add`}
                type="primary"
                onClick={handleAddCustomLink}
              />
            </Space>
          )}
        </div>
      </Modal>
    </>
  );
};

const Container = styled.div`
  overflow: auto;

  .ant-tree {
    background-color: transparent;
  }

  .ant-tree-list-holder-inner {
    padding: 6px 0;
  }

  .ant-tree-switcher {
    background: #fff;
    left: 0;
    border: 1px solid #d9d9d9;
  }

  .ant-tree-switcher .ant-tree-switcher-icon {
    transform: translateY(10px);
  }

  .ant-collapse-header {
    padding: 12px 16px 12px 32px !important;
  }

  .ant-tree-node-content-wrapper {
    padding: 0;

    &:hover {
      background-color: transparent;
    }
  }
  .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: transparent;
  }

  .ant-collapse-content {
    padding: 8px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    border-bottom: none;
    background: transparent;
  }

  .rst__rowContents {
    min-width: 150px;
  }
`;

const StyledListItem = styled(ListItem)`
  .ant-card {
    box-shadow: none !important;
    background: ${colors.secondaryContrast};
    border: 1px solid #d9d9d9;
    margin-bottom: 4px;
  }

  .ant-card-body {
    padding: 0 16px;
  }

  .ant-list-item-action li {
    padding: 0;
  }

  .ant-typography strong {
    font-weight: 400;
  }
`;

export default Menu;
