import React from 'react';
import JamCms from 'jam-cms';

// import app components
import templates from '../templates';
import { theme, globalOptions } from '../theme';

const Cms = () => (
  <JamCms
    templates={templates}
    theme={theme}
    globalOptions={globalOptions}
    config={{
      source: process.env.GATSBY_CMS_SOURCE,
      auth: process.env.GATSBY_CMS_AUTH,
      storageKey: 'jam-cms-user',
      multisite: false,
    }}
  />
);

export default Cms;
