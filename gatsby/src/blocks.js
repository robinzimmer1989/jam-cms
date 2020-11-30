import Header, { fields as headerFields } from './components/blocks/Header'
import Footer, { fields as footerFields } from './components/blocks/Footer'
import Banner, { fields as bannerFields } from './components/blocks/Banner'
import Boxes, { fields as boxesFields } from './components/blocks/Boxes'
import Posts, { fields as postsFields } from './components/blocks/Posts'
import TextImage, { fields as textImageFields } from './components/blocks/TextImage'
import Text, { fields as textFields } from './components/blocks/Text'

const blocks = {
  header: {
    component: Header,
    fields: headerFields,
  },
  footer: {
    component: Footer,
    fields: footerFields,
  },
  banner: {
    component: Banner,
    fields: bannerFields,
  },
  boxes: {
    component: Boxes,
    fields: boxesFields,
  },
  posts: {
    component: Posts,
    fields: postsFields,
  },
  textimage: {
    component: TextImage,
    fields: textImageFields,
  },
  text: {
    component: Text,
    fields: textFields,
  },
}

export default blocks
