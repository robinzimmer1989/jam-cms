import React from 'react';

// import app components
import JamCMS from './JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import GatsbyImage from './components/GatsbyImage';
import { isLoggedIn, isPreview } from './utils/auth';

const Index = (props) => {
  const { source } = props;

  return isLoggedIn() || isPreview() ? (
    <JamCMS {...props} />
  ) : (
    React.cloneElement(props.children, { source })
  );
};

export default Index;

export { RichText, GatsbyImage, LoginForm, isLoggedIn };
