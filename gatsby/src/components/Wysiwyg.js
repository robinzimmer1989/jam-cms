import React from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';

// import app components
import { colors } from '../theme';

const Wysiwyg = (props) => {
  const { children } = props;

  return (
    <Container>
      {children && Parser(children)}
      <div className="clear" />
    </Container>
  );
};

const Container = styled.div`
  *:first-child {
    margin-top: 0;
  }

  *:nth-last-child(2) {
    margin-bottom: 0;
  }

  p {
    margin-bottom: 20px;
  }

  h1,
  h2,
  h3 {
    margin-bottom: 20px;
  }

  img {
    margin-bottom: 20px;

    &.alignleft {
      float: left;
      margin-right: 20px;
    }

    &.alignright {
      float: right;
      margin-left: 20px;
    }
  }

  a {
    text-decoration: underline;
    color: ${colors.secondary};
  }

  ul {
    list-style: disc;
    margin-left: 18px;
  }

  .clear {
    clear: both;
  }
`;

export default Wysiwyg;
