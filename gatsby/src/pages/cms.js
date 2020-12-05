import React from 'react';
import JamCms from 'jam-cms';

import theme from '../theme';
import blocks from '../components/blocks';

const Cms = () => <JamCms blocks={blocks} theme={theme} />;

export default Cms;
