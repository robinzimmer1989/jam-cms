import React from 'react';

import JamCMS from './JamCMS';
import LoginForm from './components/LoginForm';
import RichText from './components/RichText';
import { isLoggedIn } from './utils/auth';

const Index = (props) => (isLoggedIn() ? <JamCMS {...props} /> : props.children);

export { RichText, LoginForm, isLoggedIn };
export default Index;
