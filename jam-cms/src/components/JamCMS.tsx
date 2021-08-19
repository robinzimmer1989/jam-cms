import React from 'react';
import { Provider } from 'react-redux';

// import app components
import Router from './router/Router';
import { store } from '../redux';
import { formatFields } from '../utils';

const JamCMS = (props: any) => {
  const { fields, source, settings, privateTemplateExists } = props;

  return (
    <Provider store={store}>
      <Router
        pageContext={props?.pageContext}
        defaultComponent={props.children}
        config={{ source, settings, privateTemplateExists }}
        fields={formatFields(fields)}
      />
    </Provider>
  );
};

export default JamCMS;
