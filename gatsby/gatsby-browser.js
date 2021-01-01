import React from 'react';
import JamCms from 'jam-cms';

// import app components
import templates from './src/templates';
import { theme, globalOptions } from './src/theme';

export const wrapPageElement = ({ element, props }) => {
  return (
    <JamCms
      pageProps={props}
      templates={templates}
      theme={theme}
      globalOptions={globalOptions}
      source={process.env.GATSBY_CMS_SOURCE}
    >
      {element}
    </JamCms>
  );
};
