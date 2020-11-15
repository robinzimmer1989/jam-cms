import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  body, iframe {
    background: #f8f9ff;
    overflow-y: scroll !important;
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

  .reset-font, .reset-font * {
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
      font-size: 14px !important;

      .ant-btn span {
        color: #fff !important;
      }
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

  .ant-page-header-heading-extra {
    display: flex;
    align-items: center;
  }

  .ant-tabs-tab-btn {
    font-size: 11px;
  }

  .ant-menu-item, .ant-menu-submenu-title {
    padding-left: 32px !important;
  }

  .ant-menu-item .anticon, .ant-menu-submenu-title .anticon {
    svg {
      width: 14px;
      height: 14px;
    }
  }

  .ant-page-header-heading-title {
    margin: 0;
  }
`
