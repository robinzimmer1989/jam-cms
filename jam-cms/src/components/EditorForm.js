import React, { useState } from 'react';
import { Space, Button, Select } from 'antd';

// import app components
import Input from './Input';
import Caption from './Caption';

import { useStore } from '../store';

const EditorForm = (props) => {
  const { id, email: defaultEmail = '', role: defaultRole = 'editor', onAdd, onUpdate } = props;

  const [, dispatch] = useStore();

  const [email, setEmail] = useState(defaultEmail);
  const [role, setRole] = useState(defaultRole);

  const handleSubmit = async () => {
    if (!email || !role) {
      return;
    }

    if (id) {
      onUpdate({ id, role });
    } else {
      onAdd({ email, role });
    }

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Space direction="vertical">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={``}
        disabled={!!defaultEmail}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      <Space direction="vertical" size={2}>
        <Caption children="Role" />
        <Select defaultValue={role || defaultRole} onChange={(v) => setRole(v)}>
          <Select.Option value={'subscriber'} children={'Subscriber'} />
          <Select.Option value={'editor'} children={'Editor'} />
          <Select.Option value={'administrator'} children={'Admin'} />
        </Select>
      </Space>

      <Button children={`Add`} onClick={handleSubmit} type="primary" />
    </Space>
  );
};

export default EditorForm;
