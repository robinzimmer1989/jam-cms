import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const Menu = (props) => {
  const { label, onClick } = props;

  return (
    <Container>
      <Button children={label} onClick={onClick} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default Menu;
