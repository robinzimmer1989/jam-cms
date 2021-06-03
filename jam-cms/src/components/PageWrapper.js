import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';

// import app components
import { useStore } from '../store';

const PageWrapper = (props) => {
  const { sidebarActive, loaded, locked, template, children } = props;

  const [
    {
      cmsState: { sites, siteID },
      editorState: { siteHasChanged, postHasChanged },
    },
  ] = useStore();

  // We need the window width to calculate scaling
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 100);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <Container
      loaded={loaded}
      locked={locked}
      sidebar={{ active: sidebarActive, ...sites?.[siteID]?.editorOptions?.sidebar }}
    >
      <Inner
        loaded={loaded}
        locked={locked}
        sidebar={{ active: sidebarActive, ...sites?.[siteID]?.editorOptions?.sidebar }}
        windowWidth={windowWidth}
      >
        {template ? (
          <Content disableLinks={siteHasChanged || postHasChanged}>{children}</Content>
        ) : (
          <div id="jam-cms">{children}</div>
        )}
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  ${({ loaded, locked, sidebar: { style, active } }) =>
    loaded &&
    !locked &&
    style === 'scale' &&
    active &&
    css`
      height: 100vh;
    `}
`;

const Inner = styled.div`
  ${({ loaded, locked, sidebar: { style, active, position, width }, windowWidth }) =>
    loaded &&
    !locked &&
    css`
      ${style === 'scale'
        ? active &&
          css`
            transform: ${windowWidth && `scale(${1 - width / windowWidth})`};
            transform-origin: ${position === 'left' ? 'right' : 'left'} top;
          `
        : style === 'inline'
        ? css`
            width: ${active ? `calc(100% - ${width}px)` : '100%'};
            margin-left: ${position === 'left' && active ? `${width}px` : 0};
            margin-right: ${position === 'right' && active ? `${width}px` : 0};
          `
        : style === 'overflow' && css``}
    `}
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
