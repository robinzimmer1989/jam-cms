import React from 'react';
import Parser from 'html-react-parser';
import { Link } from 'gatsby';

const RichText = (props) => {
  const { children } = props;

  const parse = (string) => {
    return typeof string === 'string'
      ? Parser(string, {
          replace: (domNode) => {
            if (domNode.type === 'tag') {
              if (domNode.name === 'a') {
                if (domNode.attribs.href.includes('http')) {
                  return (
                    <a href={domNode.attribs.href} target="_blank">
                      {domNode.children.map((o) => parse(o.data))}
                    </a>
                  );
                } else if (
                  domNode.attribs.href.includes('tel:') ||
                  domNode.attribs.href.includes('mailto:')
                ) {
                  return (
                    <a href={domNode.attribs.href}>{domNode.children.map((o) => parse(o.data))}</a>
                  );
                } else {
                  return (
                    <Link to={domNode.attribs.href}>
                      {domNode.children.map((o) => parse(o.data))}
                    </Link>
                  );
                }
              }

              // Remove all special characters from string. This is necessary when using the code editor and start adding html elements.
              domNode.name = domNode.name.replace(/[^a-zA-Z ]/g, '');
            }
          },
        })
      : '';
  };

  return parse(children);
};

export default RichText;
