import React from 'react';

// import app components
import Layout from '../components/Layout';

const NotFoundPage = (props) => {
  return (
    <Layout {...props}>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            NOT FOUND
          </h2>
          <hr className="w-full my-8 border-gray-300" />
        </div>

        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
