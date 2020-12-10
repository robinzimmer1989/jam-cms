import React from 'react';
import styled from 'styled-components';
import { Collapse, Button, Popconfirm } from 'antd';
import produce from 'immer';
import {
  UpCircleTwoTone,
  DownCircleTwoTone,
  DeleteTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons';

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
      {values &&
        values.map((value, index) => {
          return (
            <Collapse key={index} bordered={false}>
              <Collapse.Panel
                header={`Item ${index + 1}`}
                extra={
                  <Icons className={`icon`} onClick={(e) => e.stopPropagation()}>
                    <Icon>
                      <Popconfirm
                        title="Are you sure？"
                        onConfirm={() => handleRemove(index)}
                        icon={<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />}
                        placement="left"
                      >
                        <DeleteTwoTone twoToneColor="#ff4d4f" />
                      </Popconfirm>
                    </Icon>

                    <Icon
                      onClick={() => handleMoveElement(index, index - 1)}
                      disabled={index === 0}
                    >
                      <UpCircleTwoTone />
                    </Icon>

                    <Icon
                      onClick={() => handleMoveElement(index, index + 1)}
                      disabled={index === values.length - 1}
                    >
                      <DownCircleTwoTone />
                    </Icon>
                  </Icons>
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
          );
        })}

      <Button onClick={() => handleAdd(items.length)} block>
        Add Repeater
      </Button>
    </Container>
  );
};

const Container = styled.div`
  .ant-collapse-item {
    position: relative;
  }
`;

const Icons = styled.div`
  position: absolute;
  z-index: 2;
  right: 5px;
  top: 0;
  height: 100%;
  display: flex;
`;

const Icon = styled.div`
  width: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

export default Repeater;
