import React from 'react';
import JamCms from 'jam-cms';

// import app components
import { jamCms } from '../theme';
import blocks from '../components/blocks';

const Cms = () => (
  <JamCms
    blocks={blocks}
    theme={jamCms}
    config={{
      source: process.env.GATSBY_CMS_SOURCE,
      auth: process.env.GATSBY_CMS_AUTH,
      storageKey: 'jam-cms-user',
      multisite: false,
    }}
  />
);

export default Cms;
