import React from 'react';
import styled from 'styled-components';

const Edges = (props) => <Container {...props}>{props.children}</Container>;

const Container = styled.div`
  width: 100%;
  padding: 0 2.5%;
  margin: 0 auto;

  ${(props) => props.size === `xs` && `max-width: 460px;`}
  ${(props) => props.size === `sm` && `max-width: 600px;`}
  ${(props) => props.size === `md` && `max-width: 1024px;`}
  ${(props) => props.size === `lg` && `max-width: 1280px;`}
  ${(props) => props.size === `xl` && `max-width: 1440px;`}
`;

export default Edges;
