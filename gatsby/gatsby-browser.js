import React from 'react';
import JamCms from 'jam-cms';

// import app components
import templates from './src/templates';
import { globalOptions } from './src/theme';

export const wrapPageElement = ({ element }) => {
  return (
    <JamCms
      templates={templates}
      globalOptions={globalOptions}
      source={process.env.GATSBY_CMS_SOURCE}
    >
      {element}
    </JamCms>
  );
};
