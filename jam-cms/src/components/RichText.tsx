import React from 'react';
import Parser from 'html-react-parser';
import { Link } from '@reach/router';
const RichText = (props: any) => {
    const { children } = props;
    const parse = (string: any) => {
        return typeof string === 'string'
            ? Parser(string, {
                replace: (domNode) => {
                    if (domNode.type === 'tag') {
                        if ((domNode as any).name === 'a') {
                            if ((domNode as any).attribs.href.includes('http')) {
                                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                return (<a href={(domNode as any).attribs.href} target="_blank">
                      {(domNode as any).children.map((o: any) => parse(o.data))}
                    </a>);
                            }
                            else if ((domNode as any).attribs.href.includes('tel:') ||
                                (domNode as any).attribs.href.includes('mailto:')) {
                                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                return <a href={(domNode as any).attribs.href}>{(domNode as any).children.map((o: any) => parse(o.data))}</a>;
                            }
                            else {
                                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                return (<Link to={(domNode as any).attribs.href}>
                      {(domNode as any).children.map((o: any) => parse(o.data))}
                    </Link>);
                            }
                        }
                        // Remove all special characters from string. This is necessary when using the code editor and start adding html elements.
                        (domNode as any).name = (domNode as any).name.replace(/[^a-zA-Z1-9 ]/g, '');
                    }
                },
            })
            : '';
    };
    return parse(children);
};
export default RichText;
