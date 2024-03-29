import React from 'react';
import { Button, Typography, Space, Input } from 'antd';

export interface ILink {
  title: string;
  url: string;
  target?: string;
}

export interface ILinkField {
  value: ILink;
  defaultValue?: string;
  onClick: any;
  onRemove: any;
}

const Link = (props: ILinkField) => {
  const { value, onClick, onRemove } = props;

  const exists = value?.title && value?.url;

  return (
    <Space direction="vertical">
      {exists && (
        <div>
          <Typography children={value.title} />
          <Input size="small" value={value.url} disabled />
        </div>
      )}
      <Space>
        <Button children={exists ? 'Edit' : 'Add Link'} onClick={onClick} size="small" />
        {exists && <Button children="Remove" onClick={onRemove} size="small" danger />}
      </Space>
    </Space>
  );
};

export default Link;
