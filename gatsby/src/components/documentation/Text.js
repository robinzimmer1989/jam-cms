import React from 'react';
import styled from 'styled-components';

// import app components
import Wysiwyg from '../Wysiwyg';

const Text = (props) => {
  const { text } = props;

  return (
    <Container>
      <Wysiwyg>{text}</Wysiwyg>
    </Container>
  );
};

const Container = styled.div`
  margin: 30px 0;
`;

export default Text;
