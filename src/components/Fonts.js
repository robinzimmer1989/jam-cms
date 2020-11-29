import { useEffect } from 'react'
import WebFont from 'webfontloader'

const Fonts = ({ fonts }) => {
  useEffect(() => {
    const loadFont = async () => {
      await WebFont.load({
        classes: false,
        events: false,
        context: typeof window !== 'undefined' && window.frames[0].frameElement.contentWindow,
        ...fonts,
      })
    }

    loadFont()
  }, [])

  return null
}

export default Fonts
