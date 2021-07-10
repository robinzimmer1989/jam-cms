import React from 'react';
import { LoginForm } from 'jam-cms';

// import app components
import Layout from '../components/Layout';

const Template = (props) => {
  return (
    <Layout {...props}>
      <div className="flex flex-col justify-between max-w-xl px-4 mx-auto lg:pt-16 md:px-8">
        <div className="pt-8 mb-16 lg:mb-0 lg:max-w-lg">
          <LoginForm url={process.env.GATSBY_JAM_CMS_URL} />
        </div>
      </div>
    </Layout>
  );
};

export default Template;
