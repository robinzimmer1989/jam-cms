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
    box-shadow: none;
  }

  .ant-card-bordered {
    border: 1px solid rgb(216 225 239);
  }

  .ant-list-item {
    padding: 10px 0;
  }

  .ant-list-item-meta-avatar {
    display: flex;
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

  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 20px;
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

  .ant-scroll-number-only-unit {
    font-size: 10px;
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

  .ant-menu-item-divider {
    background-color: rgba(240, 240, 240, 0.2) !important;
  }

  .anticon svg {
    display: flex;
  }

  .ant-btn > span {
    display: inline-flex;
  }
  
  .jam-cms {
    ${styles}
  }

  // Fullsize styles
  .jodit-container:not(.jodit_inline){
    background: ${colors.secondaryContrast} !important;


    .jodit-workplace {
      background: #fff;
    }

    .jodit-wysiwyg {
      padding: 20px !important;
    }
  
  }

  .jodit_fullsize-box_true.jodit_fullsize-box_true {
    z-index: 1000!important;
  }

  // Jodit related styles for element outside the actual component
  .jodit-popup-container {

    // Global styles
    * {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';
    }

    .jodit-popup{
      border: 1px solid #dadada;
      border-radius: 4px;
      box-shadow: none;
      overflow: hidden;
    }

    .jodit-toolbar-editor-collection_mode_horizontal:after {
      background: ${colors.secondaryContrast};
    }
    
    // Remove icons
    .jodit-toolbar-button_brush,
    .jodit-toolbar-button_file {
      display: none;
    }

    // Style popup
    .jodit-popup__content{
      padding: 0;
      max-height: 400px;
      background: ${colors.secondaryContrast};
    }

    .jodit-ui-input__label {
      margin-bottom: 6px;
      font-size: 10px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: ${colors.secondary};
    }

    .jodit-ui-block {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .jodit-ui-form {
      padding: 10px;
    }

    .jodit-toolbar-button, .jodit-toolbar-button__button {
      min-height: auto !important;
    }

    .jodit-toolbar-button__button {
      padding: 2px 6px;
    }

    .jodit-toolbar-button_image, .jodit-toolbar-button_link {
      display: none;
    }
  }
`;
