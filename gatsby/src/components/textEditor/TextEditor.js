import React from 'react';
import styled from 'styled-components';

// import app components
import Text from './Text';
import TextImage from './TextImage';
import Images from './Images';

const TextEditor = (props) => {
  const { flex } = props;

  const getFlexElement = (block) => {
    let el;

    switch (block.id) {
      case 'layout1':
        el = <Text {...block} />;
        break;

      case 'layout2':
        el = <TextImage {...block} />;
        break;

      case 'images':
        el = <Images {...block} />;
        break;

      default:
    }

    return el;
  };

  return (
    <Container>
      <Content>
        {flex && flex.map((block) => <div key={block.id}>{getFlexElement(block)}</div>)}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0;
  min-height: 40px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;

  > div {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default TextEditor;
