import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Tooltip } from 'antd';
import { FullscreenExitOutlined } from '@ant-design/icons';

// import app components
import Iframe from './Iframe';
import { useStore } from '../store';

const PageWrapper = ({ theme, children }) => {
  const [
    {
      editorState: { site, viewport },
    },
    dispatch,
  ] = useStore();

  return (
    <>
      {viewport === `fullscreen` && (
        <Tooltip key={`view-fullscreen`} title={`Exit Fullscreen`} placement="left">
          <FullScreenExitButton>
            <Button
              onClick={() => dispatch({ type: `SET_EDITOR_VIEWPORT`, payload: `desktop` })}
              icon={<FullscreenExitOutlined />}
              shape="circle"
              type="primary"
              size="large"
            />
          </FullScreenExitButton>
        </Tooltip>
      )}

      {site && (
        <Page viewport={viewport}>
          <Iframe theme={theme}>{children}</Iframe>
        </Page>
      )}
    </>
  );
};

const Page = styled.div`
  margin: 0 auto;
  width: 100%;

  ${({ viewport }) =>
    viewport === `fullscreen`
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 20;
          overflow: hidden;

          * {
            pointer-events: none;
          }
        `
      : viewport === `desktop`
      ? css``
      : viewport === `tablet`
      ? css`
          max-width: 768px;
        `
      : viewport === `mobile` &&
        css`
          max-width: 360px;
        `}
`;

const FullScreenExitButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 25;
`;

export default PageWrapper;
