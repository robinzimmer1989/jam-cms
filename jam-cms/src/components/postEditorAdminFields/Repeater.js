import React from 'react';
import styled from 'styled-components';
import { Collapse, Button, Space } from 'antd';
import produce from 'immer';
import { UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';

// import app components
import { getField } from '../BlockEditFields';

const Repeater = (props) => {
  const { site, items, value, onChange, dispatch } = props;

  const values = value || [];

  const handleAdd = (index) => {
    const newValues = produce(values, (draft) => {
      draft.push(items.reduce((ac, a) => ({ ...ac, [a.id]: a.defaultValue || '' }), {}));
      return draft;
    });

    onChange(newValues);
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

  const handleMoveElement = (index, newIndex) => {
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

  return (
    <Container>
      <Space direction="vertical">
        <Space direction="vertical" size={10}>
          {values &&
            values.map((value, index) => {
              return (
                <Collapse key={index}>
                  <Collapse.Panel
                    header={`Item ${index + 1}`}
                    extra={
                      <MoveIcons className={`icon`} onClick={(e) => e.stopPropagation()}>
                        <MoveIcon
                          onClick={() => handleMoveElement(index, index - 1)}
                          disabled={index === 0}
                        >
                          <UpCircleTwoTone />
                        </MoveIcon>

                        <MoveIcon
                          onClick={() => handleMoveElement(index, index + 1)}
                          disabled={index === values.length - 1}
                        >
                          <DownCircleTwoTone />
                        </MoveIcon>
                      </MoveIcons>
                    }
                  >
                    <Space direction="vertical" size={30}>
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

                      <Button
                        size="small"
                        danger
                        children={`Remove`}
                        onClick={() => handleRemove(index)}
                      />
                    </Space>
                  </Collapse.Panel>
                </Collapse>
              );
            })}
        </Space>

        <Button onClick={() => handleAdd(items.length)}>Add</Button>
      </Space>
    </Container>
  );
};

const Container = styled.div`
  .ant-collapse-item {
    position: relative;
  }
`;

const MoveIcons = styled.div`
  position: absolute;
  z-index: 2;
  right: 5px;
  top: 0;
  height: 100%;
  display: flex;
`;

const MoveIcon = styled.div`
  width: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

export default Repeater;
