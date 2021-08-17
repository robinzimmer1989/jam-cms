import React from 'react';
import { PageProps } from 'gatsby';
import { Redirect } from '@reach/router';

// import app components
import JamCMS from './components/JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import GatsbyImage from './components/GatsbyImage';
import Seo from './components/Seo';

import { isLoggedIn, deleteUser, logout } from './utils/auth';
import { validateAccess } from './utils';

interface Props extends PageProps {
  source?: string;
  fields?: any;
  settings: {
    sync: boolean;
    multisite: boolean;
  };
  privateTemplateExists: boolean;
  children: any;
}

const Index = (props: Props) => {
  const { source, settings, children } = props;

  // Check if user has access to jamCMS.
  const allowAccess = validateAccess();

  if (allowAccess) {
    // Redirect to default site if no multisite is detected
    if (children?.props?.location?.pathname === '/jam-cms' && !settings?.multisite) {
      return <Redirect to="/jam-cms/site/default" noThrow />;
    } else {
      return <JamCMS {...props} />;
    }
  } else {
    deleteUser();

    return (
      <>
        <Seo {...props} />
        {React.cloneElement(children, { source })}
      </>
    );
  }
};

export default Index;

// Export all useful frontend components / functions
export { RichText, GatsbyImage, LoginForm, isLoggedIn, logout };
