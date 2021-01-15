import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import produce from 'immer';
import Img from 'gatsby-image';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import app components
import MediaLibrary from '../MediaLibrary';
import { colors } from '../../theme';

const Gallery = (props) => {
  const { onChange, value, dispatch } = props;

  const values = value || [];

  const handleRemove = () => {};

  const handleSelect = (value) => {
    const newValues = produce(values, (draft) => {
      draft.push(value);
      return draft;
    });

    onChange(newValues);
  };

  const handleClickAdd = () => {
    dispatch({
      type: `SET_DIALOG`,
      payload: {
        open: true,
        component: <MediaLibrary onSelect={handleSelect} allow={['image']} />,
        width: 1024,
      },
    });
  };

  return (
    <Container>
      {values &&
        values.map((o) => {
          return (
            <ImageContainer>
              {o?.childImageSharp?.fluid && (
                <Img
                  fluid={o.childImageSharp.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt={o.alt}
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </ImageContainer>
          );
        })}

      <AddContainer>
        <AddButton onClick={handleClickAdd}>
          <PlusOutlined />
        </AddButton>
      </AddContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  height: 68px;
  width: 68px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.text.light};
`;

const AddContainer = styled.div`
  margin-bottom: 10px;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 68px;
  width: 68px;
  border: 2px dotted ${colors.text.light};
  cursor: pointer;
  transition: ease all 0.2s;

  &:hover {
    border-color: #7e7e7e;
  }
`;

export default Gallery;
