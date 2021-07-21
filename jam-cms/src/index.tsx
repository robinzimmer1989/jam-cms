import React from 'react';
import { PageProps } from 'gatsby';
import { Redirect } from '@reach/router';

// import app components
import JamCMS from './components/JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import GatsbyImage from './components/GatsbyImage';
import { isLoggedIn, deleteUser } from './utils/auth';
import { validateAccess } from './utils';

interface Props extends PageProps {
  source?: string;
  fields?: any;
  settings: {
    sync: boolean;
    multisite: boolean;
  };
  siteID: any;
  privateTemplateExists: boolean;
  children: any;
}

let firstRender = true;

const Index = (props: Props) => {
  const { source, settings, children } = props;

  // Check if user has access to jamCMS.
  // We can only check for jwtAuthExpiration on initial render because the expiry date doesn't get set again when refreshing the token.
  const allowAccess = validateAccess(firstRender);

  if (firstRender) {
    firstRender = false;
  }

  if (allowAccess) {
    // Redirect to default site if no multisite is detected
    if (children?.props?.location?.pathname === '/jam-cms' && !settings?.multisite) {
      return <Redirect to="/jam-cms/site/default" noThrow />;
    } else {
      return <JamCMS {...props} />;
    }
  } else {
    deleteUser();
    return React.cloneElement(children, { source });
  }
};

export default Index;

// Export all useful frontend components / functions
export { RichText, GatsbyImage, LoginForm, isLoggedIn };
