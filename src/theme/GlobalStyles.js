import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  body, iframe {
    background: #f8f9ff;
    overflow-y: auto !important;
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

  .blockName {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
  }

  .flexible-content-empty {
      
      font-size: 14px !important;

      .ant-empty-image, .ant-empty-footer {
        display: flex;
        justify-content: center;
      }

      .ant-empty-image {
        margin-bottom: 20px;
      }

      .ant-btn-primary {
        color: #fff;
        background: #1890ff;
        border: 1px solid #1890ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 2px;
        outline: 0;
        cursor: pointer;

        &:hover {
          color: #fff;
          background: #40a9ff;
          border-color: #40a9ff;
        }
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
