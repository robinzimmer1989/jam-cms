import { useEffect } from 'react'

const Fonts = ({ fonts }) => {
  useEffect(() => {
    const loadFont = async () => {
      const WebFont = require('webfontloader')

      await WebFont.load({
        classes: false,
        events: false,
        context: window.frames[0].frameElement.contentWindow,
        ...fonts,
      })
    }

    typeof window !== 'undefined' && loadFont()
  }, [])

  return null
}

export default Fonts
