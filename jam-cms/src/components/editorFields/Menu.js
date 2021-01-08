import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const Menu = (props) => {
  const { onClick } = props;

  return (
    <Container>
      <Button children="Edit" onClick={onClick} size="medium" />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 8px;
`;

export default Menu;
