import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Space, Collapse, Popconfirm, Typography } from 'antd';
import produce from 'immer';
import { DeleteTwoTone, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import app components
import Caption from '../Caption';
import { getField } from '../editor/Fields';
import { colors } from '../../theme';

export interface IRepeater {
  id: string;
  label?: string;
  instructions?: string;
  items: any[];
  value: any[];
  level: number;
  onChange: Function;
}

const Repeater = (props: IRepeater) => {
  const { id, label, instructions, items, value, onChange, level } = props;

  const values = value || [];

  const [childActive, setChildActive] = useState([] as any);

  const handleAdd = () => {
    const newValues = produce(values, (draft: any) => {
      if (items) {
        draft.push(
          items.reduce(
            (ac: any, a: any) => ({
              ...ac,
              [a.id]: a.defaultValue || '',
            }),
            {}
          )
        );
      }
      return draft;
    });

    onChange(newValues);

    handleToggleChild(values.length);
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

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? colors.tertiary : 'transparent',
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: '1px 0',
    ...draggableStyle,
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

  const handleToggleChild = (key: number) => {
    const newKeys = produce(childActive, (draft: any) => {
      if (childActive.includes(key)) {
        draft = draft.filter((k: number) => k !== key);
      } else {
        draft.push(key);
      }

      return draft;
    });
    setChildActive(newKeys);
  };

  return (
    <Container level={level}>
      <Space direction="vertical" size={6}>
        <Caption children={label || id} />
        {instructions && <Typography.Text type="secondary" children={instructions} />}
        {values && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided: any, snapshot: any) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {values.map((value: any, index: number) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={`item-${index}`}
                        index={index}
                        isDragDisabled={childActive.includes(index)}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <Collapse
                              activeKey={childActive}
                              onChange={() => handleToggleChild(index)}
                              expandIconPosition="right"
                            >
                              <Collapse.Panel
                                key={index}
                                header={`Item ${index + 1}`}
                                extra={
                                  <DeleteIcon
                                    className={`icon`}
                                    onClick={(e: any) => e.stopPropagation()}
                                  >
                                    <DeleteIconContainer>
                                      <Popconfirm
                                        title="Are you sure？"
                                        onConfirm={() => handleRemove(index)}
                                        icon={
                                          <QuestionCircleOutlined
                                            style={{ color: colors.danger }}
                                          />
                                        }
                                        placement="left"
                                      >
                                        <DeleteTwoTone twoToneColor={colors.danger} />
                                      </Popconfirm>
                                    </DeleteIconContainer>
                                  </DeleteIcon>
                                }
                              >
                                {items &&
                                  items.map((field: any, subIndex: any) => {
                                    return (
                                      <div key={subIndex}>
                                        {getField({
                                          field: { ...field, value: value[field.id] },
                                          index,
                                          onChangeElement: (value: any) =>
                                            handleChange(value, index),
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
        <AddButton siblings={values && values.length > 0} onClick={handleAdd}>
          <PlusOutlined />
        </AddButton>
      </Space>
    </Container>
  );
};

const Container = styled('div' as any)`
  padding: 12px ${({ level }: any) => (level === 0 ? '16px' : '10px')};
`;

const DeleteIconContainer = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  opacity: ${(props: any) => (props.disabled ? 0.4 : 1)};
`;

const DeleteIcon = styled.div`
  position: absolute;
  z-index: 2;
  right: 50px;
  top: 0;
  height: 100%;
  display: flex;
`;

const AddButton = styled('div' as any)`
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

  ${({ siblings }: any) =>
    !siblings &&
    css`
      border-color: ${colors.tertiary};

      &:hover {
        border-color: #c9cfdb;
      }
    `}
`;

export default Repeater;
