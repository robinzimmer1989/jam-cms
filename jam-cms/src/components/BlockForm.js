import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

// import app components
import { useStore } from '../store';

const BlockForm = (props) => {
  const { index, onSelect, blocks } = props;

  const [, dispatch] = useStore();

  const handleSelect = (blockName) => {
    onSelect(blockName, index);

    dispatch({ type: 'SET_EDITOR_SIDEBAR', payload: blockName });
    dispatch({ type: 'SET_EDITOR_INDEX', payload: index });
    dispatch({ type: 'CLOSE_DIALOG' });
  };

  return (
    <Container>
      {blocks &&
        Object.keys(blocks)
          .filter((key) => key !== 'header' && key !== 'footer')
          .map((key) => (
            <Button key={key} children={blocks[key].label} onClick={() => handleSelect(key)} />
          ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    width: 130px;
    margin: 0 10px 20px;
  }
`;

export default BlockForm;
