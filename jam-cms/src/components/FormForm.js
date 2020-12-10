import React, { useState } from 'react';
import { Space, Button } from 'antd';

// import app components
import Input from './Input';
import { formActions } from '../actions';
import { useStore } from '../store';

const FormForm = (props) => {
  const { siteID } = props;

  const [{ config }, dispatch] = useStore();

  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    await formActions.addForm({ siteID, title }, dispatch, config);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default FormForm;
