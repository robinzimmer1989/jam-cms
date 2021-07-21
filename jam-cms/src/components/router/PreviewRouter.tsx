import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { Button } from 'antd';

// import components
import PreviewEditor from '../editor/PreviewEditor';
import Loader from '../Loader';

import { useStore } from '../../store';

const PreviewRouter = (props: any) => {
  const [
    {
      cmsState: { sites, siteID },
    },
  ] = useStore();

  return (
    <>
      {sites[siteID] ? (
        <Router>
          <PreviewEditor path={'*'} {...props} />
        </Router>
      ) : (
        <Loader text="Load Preview" />
      )}

      <PreviewBanner children="Preview" type="primary" />
    </>
  );
};

const PreviewBanner = styled(Button)`
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 9999;
  transform: rotate(270deg) translate(-50%, 50%);
  transform-origin: left;
`;

export default PreviewRouter;
