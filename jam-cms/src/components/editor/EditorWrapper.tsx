import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';
import { Space, Button, Typography } from 'antd';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';
const EditorWrapper = (props: any) => {
    const { sidebarActive, loaded, locked, children } = props;
    const [{ cmsState: { sites, siteID }, editorState: { siteHasChanged, postHasChanged, changeIndex }, }, dispatch,] = useStore();
    // We need the window width to calculate scaling
    const [windowWidth, setWindowWidth] = useState(null);
    useEffect(() => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        setWindowWidth(window.innerWidth);
    }, []);
    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
            setWindowWidth(window.innerWidth);
        }, 100);
        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, []);
    useEffect(() => {
        // Disable all links on the page as soon as the content has changed
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        var anchors = document.querySelector('#jam-cms').querySelectorAll('a');
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].onclick = (e) => {
                // Always allow links which open in a new browser tab
                if ((e.target as any)?.target === '_blank') {
                    return true;
                }
                if (siteHasChanged || postHasChanged) {
                    e.preventDefault();
                    // Display confirmation dialog
                    dispatch({
                        type: 'SET_DIALOG',
                        payload: {
                            open: true,
                            title: 'Warning',
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            component: (<Space direction="vertical" size={20}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Typography children={'There are unsaved changes. Are you sure you want to discard them?'}/>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Space>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Button children="Cancel" onClick={() => dispatch({ type: 'CLOSE_DIALOG' })}/>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Button children="Discard changes" type="danger" onClick={() => {
                                    // Clicking on a tags with nested elements (i.e. span) returns the wrong 'target'. That's why we need to find the correct node ourselves.
                                    const href = (e as any)?.path?.length && (e as any).path.find((o: any) => o.href);
                                    if (href) {
                                        navigate(href);
                                    }
                                    dispatch({ type: 'CLOSE_DIALOG' });
                                }}/>
                  </Space>
                </Space>),
                            width: 320,
                        },
                    });
                }
            };
        }
    }, [changeIndex]);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<Container id="jam-cms" loaded={loaded} locked={locked} sidebar={{ active: sidebarActive, ...sites?.[siteID]?.editorOptions?.sidebar }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Inner loaded={loaded} locked={locked} sidebar={{ active: sidebarActive, ...sites?.[siteID]?.editorOptions?.sidebar }} windowWidth={windowWidth}>
        {children}
      </Inner>
    </Container>);
};
const Container = styled.div `
  ${({ loaded, locked, sidebar: { style, active } }: any) => loaded &&
    !locked &&
    style === 'scale' &&
    active &&
    css `
      height: 100vh;
    `}
`;
const Inner = styled.div `
  ${({ loaded, locked, sidebar: { style, active, position, width }, windowWidth }: any) => loaded &&
    !locked &&
    css `
      ${style === 'scale'
        ? active &&
            css `
            transform: ${windowWidth && `scale(${1 - width / windowWidth})`};
            transform-origin: ${position === 'left' ? 'right' : 'left'} top;
          `
        : style === 'inline'
            ? css `
            width: ${active ? `calc(100% - ${width}px)` : '100%'};
            margin-left: ${position === 'left' && active ? `${width}px` : 0};
            margin-right: ${position === 'right' && active ? `${width}px` : 0};
          `
            : style === 'overflow' && css ``}
    `}
`;
export default EditorWrapper;
