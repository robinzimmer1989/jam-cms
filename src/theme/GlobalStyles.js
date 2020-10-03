import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  body {
    background: #f8f9ff;
  }

  html {
    overflow-y: auto;
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
`
