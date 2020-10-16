import React from 'react'
import styled, { css } from 'styled-components'
import { PlusCircleTwoTone, UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons'

// import app components
import { useStore } from 'store'
import { colors } from 'theme'

const BlockWrapper = props => {
  const { index, renderedElements, isTemplate, onClick, children, onOpenDialog, onMoveElement } = props

  const [
    {
      editorState: { editorIndex },
    },
    dispatch,
  ] = useStore()

  const handleOpenBlock = () => dispatch({ type: `SET_EDITOR_INDEX`, payload: index })

  const isActive = editorIndex === index

  return (
    <Container active={isActive}>
      <Content onClick={onClick || handleOpenBlock} active={isActive}>
        <div>{children}</div>
      </Content>

      {!isTemplate && index !== 'header' && (
        <AddButtonTop className={`icon`} onClick={() => onOpenDialog(index)}>
          <PlusCircleTwoTone />
        </AddButtonTop>
      )}

      {!isTemplate && index !== 'footer' && (
        <AddButtonBottom className={`icon`} onClick={() => onOpenDialog(index + 1)}>
          <PlusCircleTwoTone />
        </AddButtonBottom>
      )}

      {!isTemplate && index !== 'header' && index !== 'footer' && (
        <MoveIcons className={`icon`}>
          <MoveIcon onClick={() => onMoveElement(index, index - 1)} disabled={index === 0}>
            <UpCircleTwoTone />
          </MoveIcon>

          <MoveIcon onClick={() => onMoveElement(index, index + 1)} disabled={index === renderedElements.length - 1}>
            <DownCircleTwoTone />
          </MoveIcon>
        </MoveIcons>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  cursor: pointer;

  .icon {
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    .icon {
      opacity: 1;
      pointer-events: all;
    }
  }
  /* Dummy element to make hovering over move icons possible */
  &:before {
    content: '';
    position: absolute;
    left: 100%;
    top: 0;
    width: 30px;
    height: 100%;
  }
`

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

  ${({ active }) =>
    active
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
`

const AddButtonTop = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`

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
`

const MoveIcons = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  top: 50%;
  transform: translate(25px, -50%);
`

const MoveIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`

export default BlockWrapper
