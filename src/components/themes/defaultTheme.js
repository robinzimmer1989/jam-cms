import blocks from 'components/postBlocks'

export default {
  header: blocks['Header'].fields,
  footer: blocks['Footer'].fields,
  frontPage: '',
  colors: {
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    primaryText: '#ffffff',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    secondaryText: '#000000',
    background: '#f7f7f7',
    backgroundText: '#000000',
    surface: '#ffffff',
    surfaceText: '#000000',
    header: '#ffffff',
    headerText: '#000000',
    footer: '#ffffff',
    footerText: '#000000',
  },
  typography: {
    headlineFontFamily: 'Roboto',
    paragraphFontFamily: 'Roboto',
    h1: {
      fontSize: 40,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'primary',
      textTransform: 'none',
    },
    h2: {
      fontSize: 32,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'primary',
      textTransform: 'none',
    },
    h3: {
      fontSize: 28,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'backgroundText',
      textTransform: 'uppercase',
    },
    h4: {
      fontSize: 24,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'backgroundText',
      textTransform: 'none',
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'backgroundText',
      textTransform: 'none',
    },
    p: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'backgroundText',
      textTransform: 'none',
    },
    menuItem: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
      color: 'backgroundText',
      textTransform: 'uppercase',
    },
  },
  spacing: {
    marginTop: {
      sm: 30,
      md: 60,
      lg: 90,
    },
    marginBottom: {
      sm: 30,
      md: 60,
      lg: 90,
    },
    paddingTop: {
      sm: 30,
      md: 60,
      lg: 90,
    },
    paddingBottom: {
      sm: 30,
      md: 60,
      lg: 90,
    },
  },
  css: `
      

  `,
}
