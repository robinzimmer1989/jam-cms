import React from 'react';
import styled from 'styled-components';
import { Collapse, Button, Space, Menu, Dropdown } from 'antd';
import produce from 'immer';
import { UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';

// import app components
import { getField } from '../BlockEditFields';

const FlexibleContent = (props) => {
  const { site, items, value, onChange, dispatch } = props;

  const values = value || [];

  const handleAdd = (id, index) => {
    const layout = items.find((o) => o.id === id);
    const newValues = produce(values, (draft) => {
      draft.push({
        id,
        ...layout.fields.reduce((ac, a) => ({ ...ac, [a.id]: a.defaultValue || '' }), {}),
      });
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

  const menuItems = items.map((o) => (
    <Menu.Item key={o.id} children={o.label} onClick={() => handleAdd(o.id, items.length)} />
  ));

  const menu = <Menu>{menuItems}</Menu>;

  return (
    <Container>
      <Space direction="vertical">
        <Space direction="vertical" size={10}>
          {values &&
            values.map((value, index) => {
              const layout = items.find((o) => o.id === value.id);

              return (
                <Collapse key={index}>
                  <Collapse.Panel
                    header={layout?.label || 'NA'}
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
                      {layout?.fields &&
                        layout.fields.map((field, fieldIndex) => {
                          return (
                            <div key={field.id}>
                              {getField({
                                field: {
                                  ...field,
                                  value: value?.[field.id],
                                },
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

        <Dropdown overlay={menu} trigger={['click']}>
          <Button>Add</Button>
        </Dropdown>
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

export default FlexibleContent;
