import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'

import colors from './colors'

funstonTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  '*': {
    color: colors.text.dark,
  },
})

funstonTheme.baseFontSize = '16px'

export default new Typography(funstonTheme)
