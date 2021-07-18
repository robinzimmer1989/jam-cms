import React from 'react';
import { PageProps } from 'gatsby';
import { Redirect } from '@reach/router';

// import app components
import JamCMS from './components/JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import GatsbyImage from './components/GatsbyImage';
import { isLoggedIn, getPreviewID } from './utils/auth';

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

const Index = (props: Props) => {
  const { source, settings, children } = props;

  // Check if user has access to jamCMS
  const allowAccess = isLoggedIn() || getPreviewID();

  if (allowAccess) {
    // Redirect to default site if no multisite is detected
    if (children?.props?.location?.pathname === '/jam-cms' && !settings?.multisite) {
      return <Redirect to="/jam-cms/site/default" noThrow />;
    } else {
      return <JamCMS {...props} />;
    }
  } else {
    return React.cloneElement(children, { source });
  }
};

export default Index;

// Export all useful frontend components / functions
export { RichText, GatsbyImage, LoginForm, isLoggedIn };
