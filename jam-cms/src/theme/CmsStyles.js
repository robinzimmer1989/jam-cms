import { createGlobalStyle, css } from 'styled-components';

import colors from './colors';

const styles = css`
  background: ${colors.secondaryContrast};

  * {
    letter-spacing: normal;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
  }

  a {
    text-decoration: none;
  }

  img {
    margin: 0;
  }

  .ant-layout-header {
    position: relative;
    z-index: 1;
    height: 50px;
    background: #fff;
    padding: 0;
  }

  .ant-page-header {
    padding: 5px 0;
  }

  .ant-page-header-content {
    padding-bottom: 12px;
  }

  .ant-layout {
    background: transparent;
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

  .ant-card {
    box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  }

  .ant-list-item {
    padding: 10px 0;
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
    font-weight: 500;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    padding-left: 32px !important;
  }

  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    svg {
      width: 14px;
      height: 14px;
    }
  }

  .ant-collapse {
    position: relative;
    background-color: ${colors.secondaryContrast};
  }

  .ant-collapse > .ant-collapse-item {
    border: none;
  }

  .ant-collapse:last-child {
    border-bottom: 1px solid #d9d9d9;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 4px;
  }

  .ant-collapse-arrow {
    padding: 0 !important;
    top: 50% !important;
    transform: translateY(-50%);
  }
`;

export default createGlobalStyle`

  body {
    overflow-y: scroll;
  }

  .ant-modal-body {
    background: ${colors.secondaryContrast};
    ${styles}
  }

  .ant-menu-item-group-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  .ant-popover {
    max-width: 400px;

    p {
      margin-bottom: 10px;
    }
  }
  
  .jam-cms {
    ${styles}
  }
`;
