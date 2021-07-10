import React, { useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled, { css } from 'styled-components';
import { Collapse, Popconfirm, Menu, Dropdown, Space, Typography } from 'antd';
import produce from 'immer';
import { DeleteTwoTone, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import app components
import Caption from '../Caption';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../EditorFields' or its corres... Remove this comment to see the full error message
import { getField } from '../EditorFields';
import { colors } from '../../theme';

const FlexibleContent = (props: any) => {
  const { id, label, instructions, site, items, value, onChange, dispatch } = props;

  const values = value || [];

  const [childActive, setChildActive] = useState([]);

  const handleAdd = (id: any) => {
    if (items) {
      const layout = items.find((o: any) => o.id === id);
      const newValues = produce(values, (draft: any) => {
        draft.push({
          id,
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ac' implicitly has an 'any' type.
          ...layout.fields.reduce((ac, a) => ({
            ...ac,
            [a.id]: a.defaultValue || ''
          }), {}),
        });

        return draft;
      });

      onChange(newValues);

      handleToggleChild(values.length);
    }
  };

  const handleRemove = (index: any) => {
    const newValues = produce(values, (draft: any) => {
      draft.splice(index, 1);
      return draft;
    });

    onChange(newValues);
  };

  const handleChange = (item: any, index: any) => {
    const newValues = produce(values, (draft: any) => {
      draft[index][item.id] = item.value;
      return draft;
    });

    onChange(newValues);
  };

  const handleToggleChild = (key: any) => {
    const newKeys = produce(childActive, (draft) => {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      if (childActive.includes(key)) {
        draft = draft.filter((k) => k !== key);
      } else {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        draft.push(key);
      }

      return draft;
    });
    setChildActive(newKeys);
  };

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const menuItems = items.map((o: any) => <Menu.Item key={o.id} children={o.label} onClick={() => handleAdd(o.id)} />);

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const menu = <Menu>{menuItems}</Menu>;

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? colors.tertiary : '#fff',
    padding: 2
  });

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDragging' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 2,
    ...draggableStyle
  });

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const index = result.source.index;
    const newIndex = result.destination.index;

    const newValues = produce(values, (draft: any) => {
      if (newIndex > -1 && newIndex < draft.length) {
        const temp = draft[index];
        draft[index] = draft[newIndex];
        draft[newIndex] = temp;
      }

      return draft;
    });

    onChange(newValues);
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <LabelContainer>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Space direction="vertical" size={6}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Caption children={label || id} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {instructions && <Typography.Text type="secondary" children={instructions} />}
        </Space>
      </LabelContainer>
      {values && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {values.map((value: any, index: any) => {
                  const layout = items.find((o: any) => o.id === value.id);

                  return (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                      isDragDisabled={childActive.includes(index)}
                    >
                      {(provided: any, snapshot: any) => (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                          <Collapse
                            activeKey={childActive}
                            onChange={() => handleToggleChild(index)}
                            expandIconPosition="right"
                          >
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <Collapse.Panel
                              key={index}
                              header={layout?.label || 'Not Found'}
                              extra={
                                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <DeleteIcon className={`icon`} onClick={(e: any) => e.stopPropagation()}>
                                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                  <DeleteIconContainer>
                                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <Popconfirm
                                      title="Are you sure？"
                                      onConfirm={() => handleRemove(index)}
                                      icon={
                                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <QuestionCircleOutlined style={{ color: colors.danger }} />
                                      }
                                      placement="left"
                                    >
                                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                      <DeleteTwoTone twoToneColor={colors.danger} />
                                    </Popconfirm>
                                  </DeleteIconContainer>
                                </DeleteIcon>
                              }
                            >
                              {layout?.fields &&
                                layout.fields.map((field: any, fieldIndex: any) => {
                                  return (
                                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <div key={field.id}>
                                      {getField({
                                        field: {
                                          ...field,
                                          value: value?.[field.id],
                                        },
                                        index,
                                        site,
                                        onChangeElement: (value: any) => handleChange(value, index),
                                        dispatch,
                                      })}
                                    </div>
                                  );
                                })}
                            </Collapse.Panel>
                          </Collapse>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <AddContainer>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Dropdown
          overlay={menu}
          trigger={['click']}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(triggerNode: HTMLElement) => (Node & Parent... Remove this comment to see the full error message
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AddButton siblings={values && values.length > 0}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <PlusOutlined />
          </AddButton>
        </Dropdown>
      </AddContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;

  .ant-collapse-item {
    position: relative;
  }

  .ant-collapse-header {
    cursor: grab;
  }
`;

const LabelContainer = styled.div`
  padding: 12px 4px 0;
`;

const DeleteIconContainer = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  opacity: ${(props: any) => props.disabled ? 0.4 : 1};
`;

const DeleteIcon = styled.div`
  position: absolute;
  z-index: 2;
  right: 50px;
  top: 0;
  height: 100%;
  display: flex;
`;

const AddContainer = styled.div`
  padding: 4px;
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

  ${({
  siblings
}: any) =>
    !siblings &&
    css`
      border-color: ${colors.tertiary};

      &:hover {
        border-color: #c9cfdb;
      }
    `}
`;

export default FlexibleContent;
