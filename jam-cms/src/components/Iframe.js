import React, { useEffect, useState } from 'react';
import { StyleSheetManager, createGlobalStyle } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import { useStore } from '../store';
import Fonts from './Fonts';

const Iframe = ({ theme, children }) => {
  const [
    {
      editorState: { viewport },
    },
  ] = useStore();

  const iframeRef = React.createRef();

  const [height, setHeight] = useState(0);

  const handleResize = (iframe) => {
    if (viewport === 'fullscreen') {
      typeof window !== `undefined` && setHeight(window.innerHeight);
    } else if (
      iframe.current &&
      iframe.current.node &&
      iframe.current.node.contentDocument &&
      iframe.current.node.contentDocument.body.scrollHeight !== 0
    ) {
      // Calculate height automatically based on body height of iframe
      setHeight(iframe.current.node.contentDocument.body.scrollHeight);
    }
  };

  useEffect(() => handleResize(iframeRef), [children, viewport]);

  return (
    <div>
      <Frame
        style={{ width: '100%', height, overflow: 'auto' }}
        onLoad={() => handleResize(iframeRef)}
        ref={iframeRef}
      >
        <FrameContextConsumer>
          {(frameContext) => (
            <StyleSheetManager target={frameContext.document.head}>
              <div>
                <ThemeCSS />
                <Fonts fonts={theme.fonts} />
                {children}
              </div>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </Frame>
    </div>
  );
};

const ThemeCSS = createGlobalStyle`
  ${({ theme }) => theme.css}

  .blockName {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
  }

  .flexible-content-empty {
    font-size: 14px !important;

    .ant-empty-image, .ant-empty-footer {
      display: flex;
      justify-content: center;
    }

    .ant-empty-image {
      margin-bottom: 20px;
    }

    .ant-btn-primary {
      background: #1890ff;
      border: 1px solid #1890ff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      height: 32px;
      padding: 4px 15px;
      border-radius: 2px;
      outline: 0;
      cursor: pointer;

      &:hover {
        color: #fff;
        background: #40a9ff;
        border-color: #40a9ff;
      }

      span {
        color: #fff;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
      }
    }
  }
`;

export default Iframe;
