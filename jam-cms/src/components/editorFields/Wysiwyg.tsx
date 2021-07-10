import React from 'react';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Jodit' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import HTMLEditor from '../Jodit';

const Wysiwyg = (props: any) => {
  const { value, onChange } = props;

  const handleChange = (c: any) => onChange(c);

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <HTMLEditor onChange={handleChange} defaultValue={value} />;
};

export default Wysiwyg;
