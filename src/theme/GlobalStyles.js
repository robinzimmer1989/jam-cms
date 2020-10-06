import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  body {
    background: #f8f9ff;
  }

  html {
    overflow-y: auto;
  }

  a {
    text-decoration: none;
  }

  * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  }

  img {
    margin: 0;
  }

  .ant-layout {
    background: transparent;
  }

  .ant-layout-header {
    background: transparent;
  }

  .ant-layout-footer {
    background: transparent;
  }

  .ant-layout-sider {
    box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  }

  .ant-page-header {
    padding-left: 0;
    padding-right: 0;
  }

  .ant-card {
    box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  }

  .ant-space-vertical {
    width: 100%;
  }

  .ant-select {
    width: 100%;
  }
`
