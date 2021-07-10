import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';

const Edges = (props: any) => <Container {...props}>{props.children}</Container>;

const Container = styled.div`
  width: 100%;
  padding: 0 2.5%;
  margin: 0 auto;

  ${(props: any) => props.size === `xs` && `max-width: 460px;`}
  ${(props: any) => props.size === `sm` && `max-width: 600px;`}
  ${(props: any) => props.size === `md` && `max-width: 1024px;`}
  ${(props: any) => props.size === `lg` && `max-width: 1280px;`}
  ${(props: any) => props.size === `xl` && `max-width: 1440px;`}
`;

export default Edges;
