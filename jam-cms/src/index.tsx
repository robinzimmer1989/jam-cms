import React from 'react';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './JamCMS' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import JamCMS from './JamCMS';
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/LoginForm' was resolved to '/... Remove this comment to see the full error message
import LoginForm from './components/LoginForm';
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/RichText' was resolved to '/U... Remove this comment to see the full error message
import RichText from './components/RichText';
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/GatsbyImage' was resolved to ... Remove this comment to see the full error message
import GatsbyImage from './components/GatsbyImage';
import { isLoggedIn, getPreviewID } from './utils/auth';

const Index = (props: any) => {
  const { source } = props;

  return isLoggedIn() || getPreviewID() ? (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <JamCMS {...props} />
  ) : (
    React.cloneElement(props.children, { source })
  );
};

export default Index;

// Export all useful frontend components
export { RichText, GatsbyImage, LoginForm, isLoggedIn };
