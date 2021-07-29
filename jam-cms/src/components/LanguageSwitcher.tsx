import React from 'react';
import { Select } from 'antd';

// import app components
import { useStore } from '../store';

const LanguageSwitcher = () => {
  const [
    {
      cmsState: { siteID, sites, activeLanguage },
    },
    dispatch,
  ] = useStore();

  return (
    <Select
      value={activeLanguage}
      onChange={(v: any) => dispatch({ type: 'SET_ACTIVE_LANGUAGE', payload: v })}
      style={{ width: '100px' }}
    >
      <Select.Option value="all">All</Select.Option>
      {sites[siteID]?.languages?.languages?.map((o: any) => (
        <Select.Option key={o.id} value={o.slug}>
          {o.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
