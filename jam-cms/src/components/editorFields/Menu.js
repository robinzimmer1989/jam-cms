import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, Tree, Collapse, Space, Tabs, Modal, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import Parser from 'html-react-parser';
import produce from 'immer';

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
import { useStore } from '../../store';
import { colors } from '../../theme';

const Menu = (props) => {
  const { value = [], onChange } = props;

  const [
    {
      cmsState: { sites, siteID },
      editorState: { siteHasChanged },
    },
  ] = useStore();

  const [editing, setEditing] = useState([]);
  const [dialog, setDialog] = useState({ active: false, node: null });
  const [filter, setFilter] = useState('Pages');
  const [items, setItems] = useState([]);
  const [customLink, setCustomLink] = useState({
    title: '',
    url: '',
  });

  // When a post is saved while a menu item is open, we need to manually reset the editing array to allow dragging
  useEffect(() => {
    !siteHasChanged && setEditing([]);
  }, [siteHasChanged]);

  useEffect(() => {
    if (value && Array.isArray(value)) {
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

    // Remove key from array
    const nextValue = produce(editing, (draft) => {
      if (draft.includes(key)) {
        draft = draft.filter((k) => k !== key);
      }
      return draft;
    });

    setEditing(nextValue);
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

  const handleToggleCollapse = (key) => {
    const nextValue = produce(editing, (draft) => {
      if (draft.includes(key)) {
        draft = draft.filter((k) => k !== key);
      } else {
        draft.push(key);
      }

      return draft;
    });

    setEditing(nextValue);
  };

  return (
    <>
      <Container>
        <div>
          <div>
            <Tree
              className="draggable-tree"
              draggable={editing.length === 0}
              showLine
              blockNode
              onDrop={onDrop}
              treeData={items}
              titleRender={(node) => {
                return (
                  <Collapse ghost onChange={() => handleToggleCollapse(node.key)}>
                    <Collapse.Panel
                      header={
                        <span style={{ cursor: editing.length === 0 ? 'grab' : 'not-allowed' }}>
                          {Parser(node.title || ' ')}
                        </span>
                      }
                      showArrow={false}
                    >
                      <Space direction="vertical">
                        <Input
                          label="title"
                          value={node.title}
                          onChange={(e) => handleUpdate(e, 'title', node.key)}
                        />

                        <Input
                          label="Url"
                          value={node.url}
                          onChange={(e) => handleUpdate(e, 'url', node.key)}
                          disabled={node.postTypeID}
                        />

                        <Button
                          size="small"
                          danger
                          children={`Remove`}
                          onClick={() => handleRemove(node.key)}
                          disabled={node.children.length > 0}
                        />
                      </Space>
                    </Collapse.Panel>
                  </Collapse>
                );
              }}
            />
          </div>

          <AddButton
            onClick={() => setDialog({ active: true, node: null })}
            items={items && items.length > 0}
          >
            <PlusOutlined />
          </AddButton>
        </div>
      </Container>

      <Modal
        title="Add item"
        visible={dialog.active}
        onCancel={() => setDialog({ active: false, node: null })}
        width={400}
        footer={null}
      >
        <Tabs defaultActiveKey={filter} onChange={(v) => setFilter(v)}>
          {Object.values(sites[siteID]?.postTypes).map((o) => {
            return <Tabs.TabPane key={o.title} tab={o.title.toUpperCase()} />;
          })}

          <Tabs.TabPane key={'custom-link'} tab={'CUSTOM LINK'} />
        </Tabs>

        <div>
          {filter !== 'custom-link' && (
            <>
              {isEmpty(posts) ? (
                <EmptyContainer>
                  <Empty
                    imageStyle={{
                      height: 120,
                    }}
                  />
                </EmptyContainer>
              ) : (
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
                        disabled={status === 'draft'}
                        onClick={() =>
                          status === 'publish' &&
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
                      />
                    );
                  })
              )}
            </>
          )}
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
  && {
    overflow: auto;

    .ant-tree {
      background-color: transparent;
    }

    .ant-tree-list-holder {
      padding-top: 6px;
    }

    .ant-collapse {
      background-color: transparent;
      border: none !important;
    }

    .ant-collapse-header {
      padding: 5px !important;
    }

    .ant-tree-switcher-line-icon {
      transform: translateY(3px);
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

    .ant-collapse-content-box {
      padding-top: 0 !important;
    }

    .ant-collapse-content > .ant-collapse-content-box {
      border-bottom: none;
      background: transparent;
    }

    .rst__rowContents {
      min-width: 150px;
    }
  }
`;

const StyledListItem = styled(ListItem)`
  .ant-card {
    box-shadow: none !important;
    background: #fff;
    border: 1px solid #d9d9d9;
    margin-bottom: 4px;

    ${({ disabled }) =>
      disabled
        ? css`
            cursor: not-allowed;
            opacity: 0.4;
          `
        : css`
            cursor: pointer;
            opacity: 1;

            &:hover {
              opacity: 0.8;
            }
          `}
  }

  .ant-card-body {
    padding: 0 16px;
  }

  .ant-list-item-meta-title {
    margin: 0;
    line-height: 1;
  }

  .ant-typography strong {
    font-weight: 400;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;
  transition: ease-in all 0.2s;

  &:hover {
    border-color: ${colors.tertiary};
  }

  ${({ items }) =>
    !items &&
    css`
      border-color: ${colors.tertiary};

      &:hover {
        border-color: #c9cfdb;
      }
    `}
`;

export default Menu;
