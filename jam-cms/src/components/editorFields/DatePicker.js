import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

const DatePicker = (props) => {
  const { value, defaultValue, format = 'DD/MM/YYYY', onChange } = props;

  // Add fallback date in case no value or default value is provided
  const now = new Date();

  return (
    <AntDatePicker
      value={moment(value || defaultValue || now, format)}
      onChange={(value) => onChange(value ? value._d : '')}
      allowClear={false}
    />
  );
};

export default DatePicker;
