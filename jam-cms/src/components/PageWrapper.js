import React from 'react';
import styled, { css } from 'styled-components';

// import app components

import { useStore } from '../store';

const PageWrapper = (props) => {
  const { template, children } = props;

  const [
    {
      editorState: { siteHasChanged, postHasChanged, sidebar },
    },
  ] = useStore();

  return (
    <Container sidebar={!!sidebar}>
      {template ? (
        <Content disableLinks={siteHasChanged || postHasChanged}>{children}</Content>
      ) : (
        <div id="jam-cms">{children}</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: ${({ sidebar }) => (sidebar ? 'calc(100% - 320px)' : '100%')};
  margin-left: ${({ sidebar }) => (sidebar ? '320px' : 0)};
  background: #fff;
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

export default PageWrapper;
