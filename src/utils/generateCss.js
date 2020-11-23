import { css } from 'styled-components'

export default function generateCss(theme) {
  if (!theme) {
    return
  }

  const {
    typography: { h1, h2, h3, h4, h5, p, headlineFontFamily, paragraphFontFamily },
    colors,
  } = theme

  const h1Styles = {
    ...h1,
    color: colors[h1.color],
  }

  const h2Styles = {
    ...h2,
    color: colors[h2.color],
  }

  const h3Styles = {
    ...h3,
    color: colors[h3.color],
  }

  const h4Styles = {
    ...h4,
    color: colors[h4.color],
  }

  const h5Styles = {
    ...h5,
    color: colors[h5.color],
  }

  const pStyles = {
    ...p,
    color: colors[p.color],
  }

  return css`
    background-color: ${colors.background};
    color: ${colors.backgroundText};

    h1 {
      font-family: ${headlineFontFamily};
      ${h1Styles};
    }

    h2 {
      font-family: ${headlineFontFamily};
      ${h2Styles};
    }

    h3 {
      font-family: ${headlineFontFamily};
      ${h3Styles};
    }

    h4 {
      font-family: ${headlineFontFamily};
      ${h4Styles};
    }

    h5 {
      font-family: ${headlineFontFamily};
      ${h5Styles};
    }

    p,
    a,
    ul,
    ol,
    li {
      font-family: ${paragraphFontFamily};
      ${pStyles};
    }
  `
}
