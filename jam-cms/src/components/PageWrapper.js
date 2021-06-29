import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';
import { Space, Button, Typography } from 'antd';

// import app components
import { useStore } from '../store';

const PageWrapper = (props) => {
  const { sidebarActive, loaded, locked, template, children } = props;

  const [
    {
      cmsState: { sites, siteID },
      editorState: { siteHasChanged, postHasChanged },
    },
    dispatch,
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

  useEffect(() => {
    var anchors = document.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].onclick = (e) => {
        if (e.target.target === '_blank') {
          return true;
        }

        if (siteHasChanged || postHasChanged) {
          e.preventDefault();

          dispatch({
            type: 'SET_DIALOG',
            payload: {
              open: true,
              title: 'Warning',
              component: (
                <Space direction="vertical" size={20}>
                  <Typography
                    children={'There are unsaved changes. Are you sure you want to discard them?'}
                  />
                  <Space>
                    <Button children="Cancel" onClick={() => dispatch({ type: 'CLOSE_DIALOG' })} />
                    <Button
                      children="Discard changes"
                      type="danger"
                      onClick={() => {
                        if (e?.target?.href) {
                          navigate(e.target.href);
                        }

                        dispatch({ type: 'CLOSE_DIALOG' });
                      }}
                    />
                  </Space>
                </Space>
              ),
              width: 320,
            },
          });
        } else {
          return true;
        }
      };
    }
  }, [siteHasChanged, postHasChanged]);

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
        {template ? children : <div id="jam-cms">{children}</div>}
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

export default PageWrapper;
