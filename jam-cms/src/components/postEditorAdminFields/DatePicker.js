import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

const DatePicker = (props) => {
  const { value, defaultValue, format = 'DD/MM/YYYY', onChange } = props;

  return (
    <AntDatePicker
      value={moment(value || defaultValue, format)}
      onChange={(value) => onChange(value ? value._d : '')}
      allowClear={false}
    />
  );
};

export default DatePicker;
