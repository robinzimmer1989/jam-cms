import React from 'react';
import JamCms from 'jam-cms';

// import app components
import { jamCms } from '../theme';
import blocks from '../components/blocks';

const Cms = () => <JamCms blocks={blocks} theme={jamCms} />;

export default Cms;
