import { css } from 'styled-components';

import colors from './colors';

export default css`
  body {
    padding-top: 80px;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1;
    line-height: 1.5;
    text-transform: none;
    background-color: #fafcfd;
    color: ${colors.primary};
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: inherit;
    }

    &:active {
      color: inherit;
    }

    &:active,
    &:hover {
      text-decoration: none;
      outline: 0;
    }

    &:focus {
      text-decoration: none;
      outline: 0;
    }

    &[disabled] {
      color: inherit;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: inherit;
    font-weight: 500;
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
`;
