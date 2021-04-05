import React from 'react';
import styled, { css } from 'styled-components';
import produce from 'immer';
import Img from 'gatsby-image';
import {
  CloseCircleOutlined,
  PlusOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';

// import app components
import MediaLibrary from '../MediaLibrary';
import { colors } from '../../theme';

const Gallery = (props) => {
  const { onChange, value, dispatch } = props;

  const values = value || [];

  const handleRemove = (index) => {
    const newValues = produce(values, (draft) => {
      draft.splice(index, 1);
      return draft;
    });

    onChange(newValues);
  };

  const handleMoveElement = (index, newIndex) => {
    const newValues = produce(values, (draft) => {
      if (newIndex > -1 && newIndex < draft.length) {
        const temp = draft[index];
        draft[index] = draft[newIndex];
        draft[newIndex] = temp;
      }
      return draft;
    });
    onChange(newValues);
  };

  const handleSelect = (items) => {
    onChange(items);
  };

  const handleClickAdd = () => {
    dispatch({
      type: `SET_DIALOG`,
      payload: {
        open: true,
        component: (
          <MediaLibrary onSelect={handleSelect} allow={['image']} selected={values} multiple />
        ),
        width: 1024,
      },
    });
  };

  return (
    <Container>
      {values &&
        values.map((o, i) => {
          return (
            <GalleryItem key={i}>
              <ImageContainer>
                {o?.localFile?.childImageSharp?.fluid && (
                  <Img
                    fluid={o.localFile.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt={o.alt}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </ImageContainer>

              <LeftIcon
                disabled={i - 1 === -1}
                className="icon"
                onClick={() => i - 1 > -1 && handleMoveElement(i, i - 1)}
              >
                <LeftCircleOutlined style={{ color: colors.secondary }} />
              </LeftIcon>

              <RightIcon
                disabled={i === values.length - 1}
                className="icon"
                onClick={() => i < values.length && handleMoveElement(i, i + 1)}
              >
                <RightCircleOutlined style={{ color: colors.secondary }} />
              </RightIcon>

              <RemoveIcon className="icon" onClick={() => handleRemove(i)}>
                <CloseCircleOutlined style={{ color: colors.warning }} />
              </RemoveIcon>
            </GalleryItem>
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

const GalleryItem = styled.div`
  position: relative;
  height: 75px;
  width: 75px;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: rgba(240, 242, 245, 0.8);
    }

    .icon {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const icon = css`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  padding: 4px;
  transition: ease all 0.2s;
  ${({ disabled }) =>
    disabled &&
    css`
      svg {
        opacity: 0.2;
      }
    `}
`;

const RemoveIcon = styled.div`
  ${icon}
  right: 2px;
  top: 2px;
`;

const LeftIcon = styled.div`
  ${icon}
  left: calc(50% - 25px);
  bottom: 2px;
`;

const RightIcon = styled.div`
  ${icon}
  right: calc(50% - 25px);
  bottom: 2px;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondaryContrast};
`;

const AddContainer = styled.div`
  margin-bottom: 10px;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  border: 1px solid ${colors.tertiary};
  cursor: pointer;
  transition: ease all 0.2s;
`;

export default Gallery;
