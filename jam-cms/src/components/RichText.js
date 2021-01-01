import React from 'react';
import Parser from 'html-react-parser';
import { Link } from 'gatsby';

const RichText = (props) => {
  const { children } = props;

  const parse = (string) => {
    return Parser(string, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'a') {
          if (domNode.attribs.href.includes('http')) {
            return (
              <a href={domNode.attribs.href} target="_blank">
                {domNode.children.map((o) => parse(o.data))}
              </a>
            );
          } else {
            return (
              <Link to={domNode.attribs.href}>{domNode.children.map((o) => parse(o.data))}</Link>
            );
          }
        }
      },
    });
  };

  return typeof children === 'string' ? parse(children) : children;
};

export default RichText;
