import Banner, { fields as bannerFields } from './Banner'
import Footer, { fields as footerFields } from './Footer'
import Header, { fields as headerFields } from './Header'
import Text, { fields as textFields } from './Text'

const blocks = {
  Banner: {
    component: Banner,
    fields: bannerFields,
  },
  Footer: {
    component: Footer,
    fields: footerFields,
  },
  Header: {
    component: Header,
    fields: headerFields,
  },
  Text: {
    component: Text,
    fields: textFields,
  },
}

export default blocks
