import { css } from 'styled-components';

export default {
  fonts: {
    google: {
      families: ['Nerko+One:400,400i,700', 'Roboto+Condensed:400,700'],
    },
  },
  css: css`
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

    body {
      font-family: 'Roboto Condensed';
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1;
      text-transform: none;
    }

    h1 {
      font-family: 'Nerko One';
      font-size: 40px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1;
      text-transform: none;
    }

    h2 {
      font-family: 'Nerko One';
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1;
      text-transform: none;
    }

    h3 {
      font-family: 'Nerko One';
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1;
      text-transform: 'uppercase';
    }

    h4 {
      font-family: 'Nerko One';
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1;
      text-transform: none;
    }

    h5 {
      font-family: 'Nerko One';
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1;
      text-transform: none;
    }
  `,
};
