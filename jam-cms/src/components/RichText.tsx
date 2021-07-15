import React from 'react';
import Parser from 'html-react-parser';
import { Link } from 'gatsby';

const RichText = (props: any) => {
  const { children } = props;

  const parse = (string: any) => {
    return typeof string === 'string'
      ? Parser(string, {
          replace: (domNode: any) => {
            let node = { ...domNode };

            if (node.type === 'tag') {
              if (node.name === 'a') {
                if (node.attribs.href.includes('http')) {
                  node = (
                    <a href={node.attribs.href} target="_blank">
                      {node.children.map((o: any) => parse(o.data))}
                    </a>
                  );
                } else if (
                  node.attribs.href.includes('tel:') ||
                  node.attribs.href.includes('mailto:')
                ) {
                  node = (
                    <a href={node.attribs.href}>{node.children.map((o: any) => parse(o.data))}</a>
                  );
                } else {
                  node = (
                    <Link to={node.attribs.href}>
                      {node.children.map((o: any) => parse(o.data))}
                    </Link>
                  );
                }
              }

              // The parser function complains when there is invalid inline CSS (missing ':').
              // That's why we need to remove it so the user can type in the code editor.
              if (node?.attribs?.style) {
                node.attribs.style = node.attribs.style
                  .split(';')
                  .filter((s: string) => s.includes(':'))
                  .join(';');
              }

              // Remove all special characters from string. This is necessary when using the code editor and start adding html elements.
              if (node?.name) {
                node.name = node.name.replace(/[^a-zA-Z1-9]/g, '');
              }

              return node;
            }
          },
        })
      : '';
  };
  return parse(children);
};

export default RichText;
