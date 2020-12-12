import { createGlobalStyle } from 'styled-components';

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

  .ant-layout {
    background: transparent;
  }

  .ant-layout-header {
    height: unset;
    background: #fff;
    padding: 0;
  }

  .ant-layout-content {
    display: flex;
  }

  .ant-layout-footer {
    background: transparent;
  }

  .ant-layout-sider {
    box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  }

  .ant-page-header {
    padding: 12px 0;
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

  .ant-modal-body {
    background: #f8f9ff;
  }

  .ant-collapse {
    border: none;
    background: transparent;
  }

  .ant-collapse > .ant-collapse-item {
    border: none;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 6px 16px 6px 30px;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
    background: #fff;
  }

  .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    
  }
`;
