import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Collapse, Popconfirm } from 'antd';
import produce from 'immer';
import { DeleteTwoTone, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import app components
import Caption from '../Caption';
import { getField } from '../EditorFields';
import { colors } from '../../theme';

const Repeater = (props) => {
  const { id, label, site, items, value, onChange, dispatch } = props;

  const values = value || [];

  const [childActive, setChildActive] = useState([]);

  const handleAdd = () => {
    const newValues = produce(values, (draft) => {
      draft.push(items.reduce((ac, a) => ({ ...ac, [a.id]: a.defaultValue || '' }), {}));
      return draft;
    });

    onChange(newValues);

    handleToggleChild(values.length);
  };

  const handleRemove = (index) => {
    const newValues = produce(values, (draft) => {
      draft.splice(index, 1);
      return draft;
    });

    onChange(newValues);
  };

  const handleChange = (item, index) => {
    const newValues = produce(values, (draft) => {
      draft[index][item.id] = item.value;
      return draft;
    });

    onChange(newValues);
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? colors.tertiary : '#fff',
    padding: 2,
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 2,
    ...draggableStyle,
  });

  const handleDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const index = result.source.index;
    const newIndex = result.destination.index;

    const newValues = produce(values, (draft) => {
      if (newIndex > -1 && newIndex < draft.length) {
        const temp = draft[index];
        draft[index] = draft[newIndex];
        draft[newIndex] = temp;
      }

      return draft;
    });

    onChange(newValues);
  };

  const handleToggleChild = (key) => {
    const newKeys = produce(childActive, (draft) => {
      if (childActive.includes(key)) {
        draft = draft.filter((k) => k !== key);
      } else {
        draft.push(key);
      }

      return draft;
    });
    setChildActive(newKeys);
  };

  return (
    <Container>
      <LabelContainer>
        <Caption children={label || id} />
      </LabelContainer>
      {values && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {values.map((value, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                      isDragDisabled={childActive.includes(index)}
                    >
                      {(provided, snapshot) => (
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
                                <DeleteIcon className={`icon`} onClick={(e) => e.stopPropagation()}>
                                  <DeleteIconContainer>
                                    <Popconfirm
                                      title="Are you sure？"
                                      onConfirm={() => handleRemove(index)}
                                      icon={
                                        <QuestionCircleOutlined style={{ color: colors.warning }} />
                                      }
                                      placement="left"
                                    >
                                      <DeleteTwoTone twoToneColor={colors.warning} />
                                    </Popconfirm>
                                  </DeleteIconContainer>
                                </DeleteIcon>
                              }
                            >
                              {items &&
                                items.map((field, subIndex) => {
                                  return (
                                    <div key={subIndex}>
                                      {getField({
                                        field: { ...field, value: value[field.id] },
                                        index,
                                        site,
                                        onChangeElement: (value) => handleChange(value, index),
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

      <AddContainer>
        <AddButton siblings={values && values.length > 0} onClick={handleAdd}>
          <PlusOutlined />
        </AddButton>
      </AddContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;

  .ant-collapse-item {
    position: relative;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
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
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
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

  ${({ siblings }) =>
    !siblings &&
    css`
      border-color: ${colors.tertiary};

      &:hover {
        border-color: #c9cfdb;
      }
    `}
`;

export default Repeater;
