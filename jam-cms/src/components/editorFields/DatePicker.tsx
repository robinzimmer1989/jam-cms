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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {(value || defaultValue) && (<AntDatePicker value={moment(value || defaultValue, format)} onChange={(value) => onChange(value ? (value as any)._d : '')} allowClear={false}/>)}
    </>);
};
export default DatePicker;
