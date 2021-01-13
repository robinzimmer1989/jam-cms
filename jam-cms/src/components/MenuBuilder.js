import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Tree, Collapse, Space, Card, Tabs, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// import app components
import Input from './Input';
import ListItem from './ListItem';
import Tag from './Tag';
import {
  recursivelyUpdateTree,
  removeFromTree,
  deepCopyTree,
  generateRandomString,
  generateSlug,
} from '../utils';
import { colors } from '../theme';
import { useStore } from '../store';

const MenuBuilder = (props) => {
  const { value = [], onChange } = props;

  const [
    {
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const [filter, setFilter] = useState('Pages');
  const [items, setItems] = useState(deepCopyTree(value));
  const [customLink, setCustomLink] = useState({
    title: '',
    url: '',
  });

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

    setItems(data);
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

    setItems(newItems);
  };

  const handleRemove = (key) => {
    const newItems = removeFromTree({ children: [...items] }, key);
    setItems(newItems.children);
  };

  const handleSubmit = async () => {
    onChange(items);
    dispatch({ type: `CLOSE_DIALOG` });
  };

  const handleAddCustomLink = () => {
    if (!customLink.title || !customLink.url) {
      return;
    }

    setItems([
      ...items,
      { key: generateRandomString(), ...customLink, postTypeID: null, postID: null, children: [] },
    ]);
    setCustomLink({ title: '', url: '' });
  };

  return (
    <Container>
      <Tabs defaultActiveKey="all" onChange={(v) => setFilter(v)}>
        {Object.values(sites[siteID]?.postTypes).map((o) => {
          return <Tabs.TabPane key={o.title} tab={o.title.toUpperCase()} />;
        })}

        <Tabs.TabPane key={'custom-link'} tab={'CUSTOM LINK'} />
      </Tabs>

      <Boxes>
        <PostsBox>
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
                    hideImage
                    actions={[
                      <Button
                        key="add"
                        size="small"
                        disabled={status === 'draft'}
                        onClick={() =>
                          setItems([
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
        </PostsBox>
        <MenuBox>
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
        </MenuBox>
      </Boxes>

      <Button children={`Update`} onClick={handleSubmit} type="primary" />
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;

  .ant-tree {
    background-color: transparent;
  }

  .ant-collapse-content {
    padding: 20px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    border-bottom: none;
    background: transparent;
  }

  .rst__rowContents {
    min-width: 150px;
  }
`;

const Boxes = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
`;

const PostsBox = styled.div`
  background: #f7f7f7;
  width: 320px;
  height: 360px;
  padding: 10px 10px 6px;
  overflow: auto;
`;

const MenuBox = styled.div`
  height: 360px;
  flex: 1;
  padding: 10px 10px 6px;
  margin: 0 auto;
  overflow: auto;

  > div {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const StyledListItem = styled(ListItem)`
  .ant-card {
    box-shadow: none;
    background: ${colors.background.light};
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

export default MenuBuilder;
