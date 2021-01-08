import React from 'react';
import styled, { StyleSheetManager, createGlobalStyle, css } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import { useStore } from '../store';
import Fonts from './Fonts';
import minireset from '../theme/styles/minireset';

const Iframe = ({ theme, children }) => {
  const [
    {
      editorState: { viewport, siteHasChanged, postHasChanged },
    },
  ] = useStore();

  return (
    <Container>
      <Frame
        style={{
          width: '100%',
          height: viewport === 'fullscreen' ? '100vh' : 'calc(100vh - 50px)',
          overflow: 'auto',
        }}
      >
        <FrameContextConsumer>
          {(frameContext) => (
            <StyleSheetManager target={frameContext.document.head}>
              <>
                <ThemeStyles />
                <Fonts fonts={theme.fonts} />
                <Content disableLinks={siteHasChanged || postHasChanged}>{children}</Content>
              </>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </Frame>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ThemeStyles = createGlobalStyle`
  ${minireset}
  ${({ theme }) => theme.css}

  
`;

const Content = styled.div`
  ${({ disableLinks }) =>
    disableLinks &&
    css`
      a {
        pointer-events: none !important;
      }
    `}
`;

export default Iframe;
