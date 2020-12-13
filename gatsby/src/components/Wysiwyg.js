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
  h3,
  h4,
  h5,
  h6 {
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
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  li {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  ul {
    list-style: disc;
    margin-left: 18px;
    margin-bottom: 20px;
  }

  pre {
    padding: 4px 10px;
    background: #f7f7f7;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .clear {
    clear: both;
  }
`;

export default Wysiwyg;
