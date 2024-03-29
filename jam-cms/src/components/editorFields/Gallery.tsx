import React from 'react';
import styled, { css } from 'styled-components';
import produce from 'immer';
import {
  CloseCircleOutlined,
  PlusOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';

// import app components
import Img from '../GatsbyImage';
import MediaLibrary from '../MediaLibrary';
import { colors } from '../../theme';
import { MediaItem } from '../../types';
import { useAppDispatch, uiActions } from '../../redux';

export interface IGallery {
  value: MediaItem[];
  onChange: Function;
}

const Gallery = (props: IGallery) => {
  const { onChange, value } = props;

  const dispatch: any = useAppDispatch();

  const values = value || [];

  const handleRemove = (index: any) => {
    const newValues = produce(values, (draft: any) => {
      draft.splice(index, 1);
      return draft;
    });

    onChange(newValues);
  };

  const handleMoveElement = (index: any, newIndex: any) => {
    const newValues = produce(values, (draft: any) => {
      if (newIndex > -1 && newIndex < draft.length) {
        const temp = draft[index];
        draft[index] = draft[newIndex];
        draft[newIndex] = temp;
      }
      return draft;
    });
    onChange(newValues);
  };

  const handleSelect = (items: any) => {
    onChange(items);
  };

  const handleClickAdd = () => {
    dispatch(
      uiActions.showDialog({
        open: true,
        title: 'Media',
        component: (
          <MediaLibrary onSelect={handleSelect} allow={['image']} selected={values} multiple />
        ),
        width: 1024,
      })
    );
  };

  return (
    <Container>
      {values &&
        values.map((o: any, i: any) => {
          return (
            <GalleryItem key={i}>
              <ImageContainer>
                {o && (
                  <Img
                    image={o}
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
                <CloseCircleOutlined style={{ color: colors.danger }} />
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
  transition: ease all 0.2s;
  background: #fff;
  border-radius: 50%;
  height: 14px;
  width: 14px;

  ${({ disabled }: any) =>
    disabled &&
    css`
      svg {
        opacity: 0.2;
      }
    `}

  .anticon {
    display: block;
  }
`;

const RemoveIcon = styled.div`
  ${icon}
  right: 4px;
  top: 4px;
`;

const LeftIcon = styled('div' as any)`
  ${icon}
  left: calc(50% - 20px);
  bottom: 4px;
`;

const RightIcon = styled('div' as any)`
  ${icon}
  right: calc(50% - 25px);
  bottom: 4px;
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
