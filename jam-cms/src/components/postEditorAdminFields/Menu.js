import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const Menu = (props) => {
  const { onClick } = props;

  return (
    <Container>
      <Button children="Edit" onClick={onClick} block />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default Menu;
