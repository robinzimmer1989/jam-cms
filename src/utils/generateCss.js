import { css } from 'styled-components'

export default function generateCss(site) {
  if (!site) {
    return
  }

  const {
    settings: {
      typography: { h1, h2, h3, h4, h5, p, headlineFontFamily, paragraphFontFamily },
    },
  } = site

  return css`
    h1 {
      font-family: ${headlineFontFamily};
      ${h1};
    }

    h2 {
      font-family: ${headlineFontFamily};
      ${h2};
    }

    h3 {
      font-family: ${headlineFontFamily};
      ${h3};
    }

    h4 {
      font-family: ${headlineFontFamily};
      ${h4};
    }

    h5 {
      font-family: ${headlineFontFamily};
      ${h5};
    }

    p,
    a,
    ul,
    ol,
    li,
    span,
    div {
      font-family: ${paragraphFontFamily};
      ${p};
    }
  `
}
