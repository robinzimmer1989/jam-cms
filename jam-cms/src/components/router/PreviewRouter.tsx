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
    cms: { siteLoaded },
  } = useAppSelector((state: RootState) => state);

  return (
    <>
      {siteLoaded ? (
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
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
`;

export default PreviewRouter;
