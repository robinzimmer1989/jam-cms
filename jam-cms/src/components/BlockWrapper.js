import React from 'react';
import styled, { css } from 'styled-components';
import { PlusCircleTwoTone, UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';

// import app components
import { useStore } from '../store';
import { colors } from '../theme';

const BlockWrapper = (props) => {
  const {
    index,
    renderedBlocks,
    isTemplate,
    onClick,
    children,
    onOpenDialog,
    onMoveElement,
    settings,
  } = props;

  const [
    {
      editorState: { editorIndex, viewport },
    },
    dispatch,
  ] = useStore();

  const isActive = editorIndex === index;

  const blockName = index === 'header' || index === 'footer' ? index : renderedBlocks[index].name;

  const handleOpenBlock = () => dispatch({ type: `SET_EDITOR_INDEX`, payload: index });

  return (
    <Container
      active={isActive}
      viewport={viewport}
      onClick={() => dispatch({ type: `SET_EDITOR_SIDEBAR`, payload: true })}
    >
      <Content onClick={onClick || handleOpenBlock} active={isActive} viewport={viewport}>
        <ContentWrapper>{children}</ContentWrapper>
      </Content>

      <BlockName className="blockName" children={blockName} />

      {!isTemplate && index !== 'header' && (
        <AddButtonTop
          className={`icon`}
          onClick={() => onOpenDialog(index === 'footer' ? renderedBlocks.length : index)}
        >
          <PlusCircleTwoTone />
        </AddButtonTop>
      )}

      {!isTemplate && index !== 'footer' && (
        <AddButtonBottom
          className={`icon`}
          onClick={() => onOpenDialog(index === 'header' ? 0 : index + 1)}
        >
          <PlusCircleTwoTone />
        </AddButtonBottom>
      )}

      {!isTemplate && index !== 'header' && index !== 'footer' && (
        <MoveIcons className={`icon`}>
          <MoveIcon onClick={() => onMoveElement(index, index - 1)} disabled={index === 0}>
            <UpCircleTwoTone />
          </MoveIcon>

          <MoveIcon
            onClick={() => onMoveElement(index, index + 1)}
            disabled={index === renderedBlocks.length - 1}
          >
            <DownCircleTwoTone />
          </MoveIcon>
        </MoveIcons>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  cursor: pointer;

  .icon,
  .blockName {
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    .blockName,
    .icon {
      opacity: 1;
      pointer-events: all;
    }
  }

  ${({ active, viewport }) =>
    active &&
    viewport !== 'fullscreen' &&
    css`
      .blockName {
        opacity: 1;
        pointer-events: all;
      }
    `};
`;

const Content = styled.div`
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border: 1px solid transparent;
  }

  > div {
    pointer-events: none;
  }

  ${({ active, viewport }) =>
    active && viewport !== 'fullscreen'
      ? css`
          &:after {
            border-color: ${colors.primary.dark};
          }
        `
      : css`
          &:hover:after {
            border-color: ${colors.primary.dark};
          }
        `};
`;

const ContentWrapper = styled.div``;

const BlockName = styled.div`
  && {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    padding: 2px 6px;
    background: ${colors.primary.dark};
    color: #fff;
    text-transform: uppercase;
    font-size: 9px;
  }
`;

const AddButtonTop = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`;

const AddButtonBottom = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoveIcons = styled.div`
  position: absolute;
  z-index: 2;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const MoveIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

export default BlockWrapper;
