import React from 'react';

// import app components
import Layout from '../../components/Layout';
import banner from '../../components/Banner';
import boxes from '../../components/Boxes';
import posts from '../../components/Posts';
import textimage from '../../components/TextImage';
import texteditor from '../../components/TextEditor';

const blocks = {
  banner,
  boxes,
  posts,
  textimage,
  texteditor,
};

const Template = (props) => {
  const {
    pageContext: { content, globalOptions },
  } = props;

  return (
    <Layout {...props}>
      {content?.blocks?.flex &&
        content.blocks.flex.map(({ id, ...fields }, index) => {
          const Component = blocks?.[id]?.component;
          return Component && <Component key={index} {...fields} globalOptions={globalOptions} />;
        })}
    </Layout>
  );
};

export default Template;

export const PageDefaultTemplate = {
  id: 'default',
  label: 'Default',
  postTypeID: 'page',
  component: Template,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'blocks',
      label: 'Content',
      type: 'group',
      fields: [
        {
          id: 'flex',
          label: 'Blocks',
          type: 'flexible_content',
          items: Object.values(blocks),
        },
      ],
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};
