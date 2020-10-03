import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  overrides: {
    MuiFab: {
      sizeSmall: {
        width: 28,
        height: 28,
        minHeight: 'unset',
      },
    },
  },
})
