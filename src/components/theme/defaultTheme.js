import blocks from '../blocks'

export default {
  header: blocks['Header'].fields,
  footer: blocks['Footer'].fields,
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
  },
  typography: {
    headlineFontFamily: 'Roboto',
    paragraphFontFamily: 'Roboto',
    h1: {
      fontSize: 40,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
    },
    h2: {
      fontSize: 32,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
    },
    h3: {
      fontSize: 28,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
    },
    h4: {
      fontSize: 24,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
    },
    p: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 1,
      lineHeight: 1,
    },
  },
}
