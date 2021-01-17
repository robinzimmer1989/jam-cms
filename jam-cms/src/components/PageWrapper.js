import React from 'react';
import styled, { css } from 'styled-components';

// import app components
import { useStore } from '../store';

const PageWrapper = ({ template, onClick, children }) => {
  const [
    {
      editorState: { siteHasChanged, postHasChanged },
    },
  ] = useStore();

  return (
    <Page onClick={onClick}>
      {template ? (
        <Content disableLinks={siteHasChanged || postHasChanged}>{children}</Content>
      ) : (
        <div id="jam-cms">{children}</div>
      )}
    </Page>
  );
};

const Page = styled.div`
  padding-top: 50px;
  width: 100%;
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
