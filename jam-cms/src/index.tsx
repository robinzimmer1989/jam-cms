import React from 'react';

// import app components
import JamCMS from './components/JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import GatsbyImage from './components/GatsbyImage';
import Seo from './components/Seo';

import { isLoggedIn, logout } from './utils/auth';
import { validateAccess } from './utils';

const Index = (props: any) => {
  const { source, settings, children } = props;

  // Check if user has access to jamCMS.
  const allowAccess = validateAccess();

  if (allowAccess && !settings?.decouple) {
    return <JamCMS {...props} />;
  } else {
    return (
      <>
        <Seo {...props} />
        {React.cloneElement(children, { source, settings })}
      </>
    );
  }
};

export default Index;

// Export all frontend components / functions
export { RichText, GatsbyImage, LoginForm, isLoggedIn, logout };
