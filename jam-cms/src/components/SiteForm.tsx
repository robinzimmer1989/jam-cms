import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { navigate } from 'gatsby';

// import app components
import Input from './Input';
import { siteActions } from '../actions';
import { useStore } from '../store';
import getRoute from '../routes';

const SiteForm = () => {
  const [{ config }, dispatch] = useStore();

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      return;
    }

    setLoading(true);

    const result = await siteActions.addSite({ title }, dispatch, config);

    if (result) {
      navigate(getRoute(`dashboard`, { siteID: result.id }));
    }

    setLoading(false);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical">
      <Input
        label="Title"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
      />
      <Button loading={loading} children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default SiteForm;
