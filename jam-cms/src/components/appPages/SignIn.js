import React from 'react';

// import app components
import Edges from '../Edges';
import BaseLayout from '../BaseLayout';
import LoginForm from '../LoginForm';

const SignIn = () => {
  return (
    <BaseLayout>
      <Edges size="xs">
        <LoginForm />
      </Edges>
    </BaseLayout>
  );
};

export default SignIn;
