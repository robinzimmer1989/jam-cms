import React from 'react'
import styled, { css } from 'styled-components'
import { Fab } from '@material-ui/core'
import AddIcon from 'react-ionicons/lib/IosAdd'

// import app components
import AddBlock from '../forms/AddBlock'
import { useStore } from 'store'
import { colors } from 'theme'

const BlockWrapper = props => {
  const { index, hideAddButtonTop, hideAddButtonBottom, onClick, children } = props

  const [
    {
      editorState: { activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  const handleOpenBlockDialog = newIndex => {
    dispatch({
      type: `SET_DIALOG`,
      payload: {
        open: true,
        component: <AddBlock index={newIndex} />,
        width: 'xs',
      },
    })
  }

  const handleOpenBlock = () => dispatch({ type: `SET_EDITOR_ACTIVE_BLOCK_INDEX`, payload: index })

  const isActive = activeBlockIndex === index

  return (
    <Container active={isActive}>
      <Content onClick={onClick || handleOpenBlock} active={isActive}>
        <div>{children}</div>
      </Content>

      {!hideAddButtonTop && (
        <AddButtonTop size="small" className={`icon icon-add`} onClick={() => handleOpenBlockDialog(index)}>
          <AddIcon />
        </AddButtonTop>
      )}

      {!hideAddButtonBottom && (
        <AddButtonBottom size="small" className={`icon icon-add`} onClick={() => handleOpenBlockDialog(index + 1)}>
          <AddIcon />
        </AddButtonBottom>
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
`

const Content = styled.div`
  border: 1px solid transparent;

  > div {
    pointer-events: none;
  }

  ${({ active }) =>
    active
      ? css`
          border-color: ${colors.primary.dark};
        `
      : css`
          &:hover {
            border-color: ${colors.primary.dark};
          }
        `};
`

const AddButtonTop = styled(Fab)`
  && {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, 50%);
  }
`

const AddButtonBottom = styled(Fab)`
  && {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
  }
`

export default BlockWrapper
