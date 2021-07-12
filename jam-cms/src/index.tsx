import React from 'react';
import { PageProps } from 'gatsby';

// import app components
import JamCMS from './JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import GatsbyImage from './components/GatsbyImage';
import { isLoggedIn, getPreviewID } from './utils/auth';

interface Props extends PageProps {
  source?: string;
  fields?: any;
  settings?: {
    postsPerPage?: number;
    sunc?: boolean;
  };
  siteID: any;
}

const Index = (props: Props) => {
  const { source } = props;

  return isLoggedIn() || getPreviewID() ? (
    <JamCMS {...props} />
  ) : (
    React.cloneElement(props.children, { source })
  );
};

export default Index;

// Export all useful frontend components
export { RichText, GatsbyImage, LoginForm, isLoggedIn };
