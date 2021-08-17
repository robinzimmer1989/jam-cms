import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { Button } from 'antd';

// import components
import PreviewEditor from '../editor/PreviewEditor';
import Loader from '../Loader';
import { RootState, useAppSelector } from '../../redux';

const PreviewRouter = (props: any) => {
  const {
    cms: { site },
  } = useAppSelector((state: RootState) => state);

  return (
    <>
      {site ? (
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
