import React, { useState } from 'react';
import { Space, Button, Select, Checkbox } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
import Caption from './Caption';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';

const UserForm = (props: any) => {
  const { id, email: defaultEmail = '', role: defaultRole = 'editor', onAdd, onUpdate } = props;

  const [, dispatch] = useStore();

  const [email, setEmail] = useState(defaultEmail);
  const [role, setRole] = useState(defaultRole);
  const [sendEmail, setSendEmail] = useState('checked');

  const userExists = !!id;

  const handleSubmit = async () => {
    if (!email || !role) {
      return;
    }

    if (id) {
      onUpdate({ id, role });
    } else {
      onAdd({ email, role, sendEmail: sendEmail === 'checked' });
    }

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Space direction="vertical" size={20}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Input
        label="Email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder={``}
        disabled={!!defaultEmail}
        onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
      />

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Space direction="vertical" size={2}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Caption children="Role" />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Select defaultValue={role || defaultRole} onChange={(v) => setRole(v)}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Select.Option value={'subscriber'} children={'Subscriber'} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Select.Option value={'editor'} children={'Editor'} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Select.Option value={'administrator'} children={'Admin'} />
        </Select>
      </Space>

      {!id && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Checkbox defaultValue={sendEmail} onChange={(e) => setSendEmail(e.target.checked)}>
          Send new user email
        </Checkbox>
      )}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button children={userExists ? 'Update' : 'Add'} onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default UserForm;
