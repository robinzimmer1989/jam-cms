import React, { useEffect } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

const DatePicker = (props: any) => {
  const { value, defaultValue, format = 'DD/MM/YYYY', onChange } = props;

  useEffect(() => {
    if (!value && !defaultValue) {
      // Add fallback date in case no value or default value is provided
      const now = new Date();
      const formattedDate = moment(now).format(format);
      onChange(formattedDate);
    }
  }, [value, defaultValue]);

  return (
    (value || defaultValue) && (
      <AntDatePicker
        value={moment(value || defaultValue, format)}
        onChange={(value) => onChange(value ? (value as any)._d : '')}
        allowClear={false}
        style={{ width: '100%' }}
      />
    )
  );
};

export default DatePicker;
