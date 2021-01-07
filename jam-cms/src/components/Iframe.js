import React from 'react';
import styled, { StyleSheetManager, createGlobalStyle } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import { useStore } from '../store';
import Fonts from './Fonts';
import minireset from '../theme/styles/minireset';

const Iframe = ({ theme, children }) => {
  const [
    {
      editorState: { viewport },
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
              <div>
                <ThemeStyles />
                <Fonts fonts={theme.fonts} />
                {children}
              </div>
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

export default Iframe;
