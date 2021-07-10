import React from 'react';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Input' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import Input from '../Input';

const Text = (props: any) => {
  const { value = '', placeholder, rows = 1, onChange } = props;

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Input value={value} placeholder={placeholder} onChange={onChange} rows={rows} />;
};

export default Text;
