import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';
import { Space, Button, Typography } from 'antd';

// import app components
import { RootState, useAppDispatch, useAppSelector, showDialog, hideDialog } from '../../redux';

const EditorWrapper = (props: any) => {
  const { sidebarActive, loaded, locked, children } = props;

  const {
    cms: {
      site,
      editor: { siteHasChanged, postHasChanged, changeIndex },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  // We need the window width to calculate scaling
  const [windowWidth, setWindowWidth] = useState(null as any);

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
    // Disable all links on the page as soon as the content has changed
    const anchors = document.querySelector('#jam-cms')?.querySelectorAll('a') || [];

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].onclick = (e: any) => {
        // Always allow links which open in a new browser tab
        if ((e.target as any)?.target === '_blank') {
          return true;
        }

        if (siteHasChanged || postHasChanged) {
          e.preventDefault();
          // Display confirmation dialog
          dispatch(
            showDialog({
              open: true,
              title: 'Warning',
              component: (
                <Space direction="vertical" size={20}>
                  <Typography
                    children={'There are unsaved changes. Are you sure you want to discard them?'}
                  />
                  <Space>
                    <Button children="Cancel" onClick={() => dispatch(hideDialog())} />
                    <Button
                      children="Discard changes"
                      danger
                      type="primary"
                      onClick={() => {
                        // Clicking on a tags with nested elements (i.e. span) returns the wrong 'target'. That's why we need to find the correct node ourselves.
                        const node = e?.path?.length && e.path.find((o: any) => o.href);

                        if (node) {
                          navigate(node.href);
                        }

                        dispatch(hideDialog());
                      }}
                    />
                  </Space>
                </Space>
              ),
              width: 320,
            })
          );
        }
      };
    }
  }, [changeIndex]);

  return (
    <Container
      id="jam-cms"
      loaded={loaded}
      locked={locked}
      sidebar={{ active: sidebarActive, ...site?.editorOptions?.sidebar }}
    >
      <Inner
        loaded={loaded}
        locked={locked}
        sidebar={{ active: sidebarActive, ...site?.editorOptions?.sidebar }}
        windowWidth={windowWidth}
      >
        {children}
      </Inner>
    </Container>
  );
};

const Container = styled('div' as any)`
  ${({ loaded, locked, sidebar: { style, active } }: any) =>
    loaded &&
    !locked &&
    style === 'scale' &&
    active &&
    css`
      height: 100vh;
    `}
`;

const Inner = styled('div' as any)`
  ${({ loaded, locked, sidebar: { style, active, position, width }, windowWidth }: any) =>
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

export default EditorWrapper;
