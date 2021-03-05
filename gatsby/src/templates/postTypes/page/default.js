import React from 'react';

// import app components
import Layout from '../../../components/Layout';

import Banner from '../../../components/banner/Banner';
import Boxes from '../../../components/boxes/Boxes';
import Posts from '../../../components/posts/Posts';
import TextImage from '../../../components/textImage/TextImage';
import TextEditor from '../../../components/textEditor/TextEditor';

const blocks = {
  banner: Banner,
  boxes: Boxes,
  posts: Posts,
  textimage: TextImage,
  texteditor: TextEditor,
};

const Template = (props) => {
  const {
    pageContext: { content, globalOptions },
  } = props;

  return (
    <Layout {...props}>
      {content?.blocks?.flex &&
        content.blocks.flex.map(({ id, ...fields }, index) => {
          const Component = blocks?.[id];
          return Component && <Component key={index} {...fields} globalOptions={globalOptions} />;
        })}
    </Layout>
  );
};

export default Template;
