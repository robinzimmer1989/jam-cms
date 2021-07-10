import React, { useState } from 'react';
import { Space, Button } from 'antd';
import { navigate } from '@reach/router';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
import { getCurrentUser } from '../utils/auth';
import { siteActions } from '../actions';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
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

    const result = await siteActions.addSite(
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      { ownerID: getCurrentUser(config).sub, title },
      dispatch,
      config
    );

    if (result) {
      navigate(getRoute(`dashboard`, { siteID: result.id }));
    }

    setLoading(false);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space direction="vertical">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Input
        label="Title"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button loading={loading} children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default SiteForm;
