import React from 'react';
import { Collapse, Button, Space, Menu, Dropdown } from 'antd';
import produce from 'immer';

// import app components
import { getField } from '../BlockEditFields';

const FlexibleContent = (props) => {
  const { site, items, value, onChange, dispatch } = props;

  const values = value || [];

  const handleAdd = (id, index) => {
    const layout = items.find((o) => o.id === id);

    const newValues = produce(values, (draft) => {
      const fields = [];
      layout.fields.map((field) => {
        fields.push({ ...field, value: field.defaultValue || '' });
      });

      draft.push({ ...layout, value: fields });

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

  const handleChange = (item, index, fieldIndex) => {
    const newValues = produce(values, (draft) => {
      draft[index].fields[fieldIndex].value = item.value;
      return draft;
    });

    onChange(newValues);
  };

  const menuItems = items.map((o) => (
    <Menu.Item key={o.id} children={o.label} onClick={() => handleAdd(o.id, items.length)} />
  ));

  const menu = <Menu>{menuItems}</Menu>;

  return (
    <Space direction="vertical">
      <Space direction="vertical" size={10}>
        {values &&
          values.map((value, index) => {
            const layout = items.find((o) => o.id === value.id);

            return (
              <Collapse key={index}>
                <Collapse.Panel header={layout?.label || 'NA'}>
                  <Space direction="vertical" size={30}>
                    {layout?.fields &&
                      layout.fields.map((field, fieldIndex) => {
                        return (
                          <div key={field.id}>
                            {getField({
                              field: { ...field, value: value.fields[fieldIndex].value },
                              index,
                              site,
                              onChangeElement: (value) => handleChange(value, index, fieldIndex),
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

      <Dropdown overlay={menu}>
        <Button>Add</Button>
      </Dropdown>
    </Space>
  );
};

export default FlexibleContent;
