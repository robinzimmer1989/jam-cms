import React, { useState } from 'react';
import { Space, Button, Select, Checkbox } from 'antd';

// import app components
import Input from '../Input';
import Caption from '../Caption';
import { RootState, useAppDispatch, useAppSelector, hideDialog } from '../../redux';

const UserForm = (props: any) => {
  const { id, email: defaultEmail = '', roles: defaultRoles = ['editor'], onAdd, onUpdate } = props;

  const {
    cms: { site },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(defaultEmail);
  const [roles, setRoles] = useState(defaultRoles);
  const [sendEmail, setSendEmail] = useState(true);

  const userExists = !!id;

  const handleSubmit = async () => {
    if (!email || !roles.length) {
      return;
    }

    setLoading(true);

    if (id) {
      await onUpdate({ id, role: roles[0] });
    } else {
      await onAdd({ email, role: roles[0], sendEmail });
    }

    setLoading(false);

    dispatch(hideDialog());
  };

  return (
    <Space direction="vertical" size={20}>
      <Input
        label="Email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder={''}
        disabled={!!defaultEmail}
        onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit()}
      />

      <Space direction="vertical" size={2}>
        <Caption children="Role" />
        <Select defaultValue={roles?.[0] || defaultRoles?.[0]} onChange={(v) => setRoles([v])}>
          {site?.userRoles.map((o: any) => {
            return <Select.Option key={o.id} value={o.id} children={o.name} />;
          })}
        </Select>
      </Space>

      {!id && (
        <Checkbox checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)}>
          Send new user email
        </Checkbox>
      )}

      <Button
        children={userExists ? 'Update' : 'Add'}
        onClick={handleSubmit}
        type="primary"
        loading={loading}
      />
    </Space>
  );
};

export default UserForm;
