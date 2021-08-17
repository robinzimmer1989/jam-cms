import React from 'react';
import { Provider } from 'react-redux';

// import app components
import Router from './router/Router';
import { store } from '../redux';

const JamCMS = (props: any) => {
  const { fields, source, settings, privateTemplateExists } = props;

  return (
    <Provider store={store}>
      <Router
        pageContext={props?.pageContext}
        defaultComponent={props.children}
        config={{ source, settings, privateTemplateExists }}
        fields={fields}
      />
    </Provider>
  );
};

export default JamCMS;
