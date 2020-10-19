import React from 'react'
import styled, { css } from 'styled-components'
import { Button, Tooltip } from 'antd'
import { FullscreenExitOutlined } from '@ant-design/icons'
import { ThemeProvider } from 'styled-components'

// import app components
import { generateCss } from 'utils'
import { useStore } from 'store'

const PageWrapper = ({ children }) => {
  const [
    {
      editorState: { site, viewport },
    },
    dispatch,
  ] = useStore()

  const themeCss = generateCss(site)

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
        <ThemeProvider theme={site.settings}>
          <Page viewport={viewport} themeCss={themeCss}>
            {children}
          </Page>
        </ThemeProvider>
      )}
    </>
  )
}

const Page = styled.div`
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin: 0 auto;
  width: 100%;
  margin-bottom: 40px;

  ${({ viewport }) =>
    viewport === `fullscreen` &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
      overflow-y: auto;
      overflow-x: hidden;

      * {
        pointer-events: none;
      }
    `}

  ${props => props.themeCss}
`

const FullScreenExitButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 25;
`

export default PageWrapper
