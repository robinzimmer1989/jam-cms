import Banner, { fields as bannerFields } from './Banner'
import Boxes, { fields as boxesFields } from './Boxes'
import Footer, { fields as footerFields } from './Footer'
import Header, { fields as headerFields } from './Header'
import Text, { fields as textFields } from './Text'
import TextImage, { fields as textImageFields } from './TextImage'
import Posts, { fields as postsFields } from './Posts'

const blocks = {
  Banner: {
    component: Banner,
    fields: bannerFields,
  },
  Boxes: {
    component: Boxes,
    fields: boxesFields,
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
  TextImage: {
    component: TextImage,
    fields: textImageFields,
  },
  Posts: {
    component: Posts,
    fields: postsFields,
  },
}

export default blocks
