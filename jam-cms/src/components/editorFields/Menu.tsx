import React, { useEffect, useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled, { css } from 'styled-components';
import { Button, Tree, Collapse, Space, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Parser from 'html-react-parser';
import produce from 'immer';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Input' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Input from '../Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../MenuPicker' was resolved to '/Users/rob... Remove this comment to see the full error message
import MenuPicker from '../MenuPicker';
import { recursivelyUpdateTree, removeFromTree, deepCopyTree } from '../../utils';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';
import { colors } from '../../theme';
const Menu = (props: any) => {
    const { value = [], maxLevel = 3, onChange } = props;
    const [{ editorState: { siteHasChanged }, },] = useStore();
    const [editing, setEditing] = useState([]);
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    // When a post is saved while a menu item is open, we need to manually reset the editing array to allow dragging
    useEffect(() => {
        !siteHasChanged && setEditing([]);
    }, [siteHasChanged]);
    useEffect(() => {
        if (value && Array.isArray(value)) {
            setItems(deepCopyTree(value));
        }
    }, [value]);
    // Function provided by Ant Design
    const onDrop = (info: any) => {
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const getLevel = () => {
            const dropPos = info.node.props.pos.split('-');
            // if item is dragged NOT to the top of a node the array will have an additional parameter
            let level = info.dropToGap ? dropPos.length - 1 : dropPos.length;
            const countChildren = (node: any, index: any) => {
                let newIndex = index;
                if (node?.children?.length) {
                    newIndex = countChildren(node.children, newIndex + 1);
                }
                return newIndex;
            };
            // We have to check if the node has children because they could potentially exceed the max level restriction
            if (info.dragNode.children.length) {
                level = level + countChildren(info.dragNode, 0);
            }
            return level;
        };
        if (getLevel() > Number(maxLevel)) {
            return message.error({ content: `Exceeded max depth of ${maxLevel}` });
        }
        const loop = (data: any, key: any, callback: any) => {
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
        let dragObj: any;
        loop(data, dragKey, (item: any, index: any, arr: any) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item: any) => {
                item.children = item.children || [];
                // where to insert
                item.children.push(dragObj);
            });
        }
        else if ((info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, (item: any) => {
                item.children = item.children || [];
                // where to insert
                item.children.unshift(dragObj);
            });
        }
        else {
            let ar;
            let i;
            loop(data, dropKey, (item: any, index: any, arr: any) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                ar.splice(i, 0, dragObj);
            }
            else {
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                ar.splice(i + 1, 0, dragObj);
            }
        }
        onChange(data);
    };
    const handleUpdate = (e: any, name: any, key: any) => {
        const updateItem = (parentNode: any, child: any, params: any) => {
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
    const handleRemove = (key: any) => {
        const newItems = removeFromTree({ children: [...items] }, key);
        onChange(newItems.children);
        // Remove key from array
        const nextValue = produce(editing, (draft) => {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            if (draft.includes(key)) {
                draft = draft.filter((k) => k !== key);
            }
            return draft;
        });
        setEditing(nextValue);
    };
    const handleAdd = (item: any) => {
        const nextValue = produce(items, (draft) => {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            draft.push(item);
            return draft;
        });
        onChange(nextValue);
    };
    const handleToggleCollapse = (key: any) => {
        const nextValue = produce(editing, (draft) => {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            if (draft.includes(key)) {
                draft = draft.filter((k) => k !== key);
            }
            else {
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                draft.push(key);
            }
            return draft;
        });
        setEditing(nextValue);
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Container>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Tree className="draggable-tree" draggable={editing.length === 0} showLine blockNode onDrop={onDrop} treeData={items} titleRender={(node) => {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return (<Collapse ghost onChange={() => handleToggleCollapse(node.key)}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Collapse.Panel header={<span style={{ cursor: editing.length === 0 ? 'grab' : 'not-allowed' }}>
                        {/* @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message */}
                        {Parser(node.title || ' ')}
                      </span>} showArrow={false}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Space direction="vertical">
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Input label="title" value={node.title} onChange={(e: any) => handleUpdate(e, 'title', node.key)}/>

                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Input label="Url" value={(node as any).url} onChange={(e: any) => handleUpdate(e, 'url', node.key)} disabled={(node as any).postTypeID}/>

                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Button size="small" danger children={`Remove`} onClick={() => handleRemove(node.key)} disabled={node.children.length > 0}/>
                    </Space>
                  </Collapse.Panel>
                </Collapse>);
        }}/>
        </div>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AddButton items={items && items.length > 0} onClick={() => setModal(true)}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <PlusOutlined />
        </AddButton>
      </div>
    </Container>

    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Modal title={'Menu Items'} visible={modal} onCancel={() => setModal(false)} width={600} footer={null}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MenuPicker onAdd={handleAdd}/>
    </Modal>
  </>;
};
const Container = styled.div `
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
const AddButton = styled.div `
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

  ${({ items }: any) => !items &&
    css `
      border-color: ${colors.tertiary};

      &:hover {
        border-color: #c9cfdb;
      }
    `}
`;
export default Menu;
