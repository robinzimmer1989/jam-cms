import React from 'react';
import { Select } from 'antd';

// import app components
import { RootState, useAppDispatch, useAppSelector, setActiveLanguage } from '../redux';

const LanguageSwitcher = () => {
  const {
    cms: { site, activeLanguage },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  return (
    <Select
      value={activeLanguage}
      onChange={(v: any) => dispatch(setActiveLanguage(v))}
      style={{ width: '100px' }}
    >
      <Select.Option value="all">All</Select.Option>
      {site?.languages?.languages?.map((o: any) => (
        <Select.Option key={o.id} value={o.slug}>
          {o.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
