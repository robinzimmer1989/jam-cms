import { css } from 'styled-components';

import colors from './colors';

export default {
  fonts: {
    google: {
      families: ['Merriweather:400,700', 'Source+Sans+Pro:300,400,500,700'],
    },
  },
  css: css`
    body {
      padding-top: 80px;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1.5;
      text-transform: none;
      background: #fafcfd;
      color: ${colors.primary};
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    h1 {
      font-family: 'Merriweather';
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 1;
      line-height: 1.2;
      text-transform: none;
    }

    h2 {
      font-family: 'Merriweather';
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1.2;
      text-transform: none;
    }

    h3 {
      font-family: 'Merriweather';
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1.2;
      text-transform: 'uppercase';
    }

    h4 {
      font-family: 'Merriweather';
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1.2;
      text-transform: none;
    }

    h5 {
      font-family: 'Merriweather';
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 1;
      line-height: 1.2;
      text-transform: none;
    }
  `,
};
