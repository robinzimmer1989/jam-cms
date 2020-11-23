import React, { useEffect, useState } from 'react'
import styled, { css, StyleSheetManager } from 'styled-components'
import { Button, Tooltip } from 'antd'
import { FullscreenExitOutlined } from '@ant-design/icons'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import Helmet from 'react-helmet'

// import app components
import { generateCss } from '../utils'
import { useStore } from '../store'
import { GlobalStyles } from '../theme'

const PageWrapper = ({ theme, children, ...rest }) => {
  const [
    {
      editorState: { site, viewport },
    },
    dispatch,
  ] = useStore()

  const iframeRef = React.createRef()

  const [height, setHeight] = useState(0)
  const [fonts, setFonts] = useState([])

  const handleResize = (iframe) => {
    if (viewport === 'fullscreen') {
      typeof window !== `undefined` && setHeight(window.innerHeight)
    } else if (
      iframe.current &&
      iframe.current.node &&
      iframe.current.node.contentDocument &&
      iframe.current.node.contentDocument.body.scrollHeight !== 0
    ) {
      // Calculate height automatically based on body height of iframe
      setHeight(iframe.current.node.contentDocument.body.scrollHeight + 30)
    }
  }

  useEffect(() => handleResize(iframeRef), [children, viewport])

  useEffect(() => {
    if (theme?.typography) {
      const { headlineFontFamily, paragraphFontFamily } = theme.typography

      setFonts([...new Set([headlineFontFamily, paragraphFontFamily])])
    }
  }, [theme])

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
          <Frame
            style={{ width: '100%', height, overflow: 'auto' }}
            head={
              <>
                <style>${minireset}</style>

                {fonts.map((s) => (
                  <link key={s} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${s}`} />
                ))}
              </>
            }
            onLoad={() => handleResize(iframeRef)}
            ref={iframeRef}
          >
            <Helmet></Helmet>

            <FrameContextConsumer>
              {(frameContext) => (
                <StyleSheetManager target={frameContext.document.head}>
                  <ContentWrapper viewport={viewport}>
                    <GlobalStyles />

                    {children}
                  </ContentWrapper>
                </StyleSheetManager>
              )}
            </FrameContextConsumer>
          </Frame>
        </Page>
      )}
    </>
  )
}

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
`

const ContentWrapper = styled.div`
  margin-top: ${({ viewport }) => (viewport === 'fullscreen' ? 0 : '13px')};
  /* box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07); */
  ${({ theme }) => theme && generateCss(theme)}
`

const FullScreenExitButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 25;
`

const minireset = css`
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }

  td:not([align]),
  th:not([align]) {
    text-align: left;
  }
`

export default PageWrapper
