import React from 'react';

import JamCMS from './JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import { isLoggedIn } from './utils/auth';

const Index = (props) => {
  const { source } = props;

  return isLoggedIn() ? <JamCMS {...props} /> : React.cloneElement(props.children, { source });
};

export { RichText, LoginForm, isLoggedIn };
export default Index;
