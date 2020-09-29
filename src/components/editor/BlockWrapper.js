import React from 'react'
import styled, { css } from 'styled-components'
import { IconButton } from '@material-ui/core'
import AddIcon from 'react-ionicons/lib/IosAdd'
import DeleteIcon from 'react-ionicons/lib/IosTrash'

// import app components
import AddBlock from '../forms/AddBlock'
import { useStore } from '../../store'

const BlockWrapper = props => {
  const { index, children } = props

  const [
    {
      editorState: { post, activeBlockIndex },
    },
    dispatch,
  ] = useStore()

  const handleOpenBlockDialog = () => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        component: <AddBlock index={index + 1} />,
        width: 'xs',
      },
    })
  }

  const handleOpenBlock = () =>
    dispatch({ type: 'SET_EDITOR_ACTIVE_BLOCK_INDEX', payload: index })

  const handleRemoveBlock = () => {
    const blocks = [...post.content]
    blocks.splice(index, 1)

    dispatch({
      type: 'SET_EDITOR_POST',
      payload: {
        ...post,
        content: blocks,
      },
    })
  }

  const isActive = activeBlockIndex === index

  return (
    <Container active={isActive}>
      <Content onClick={handleOpenBlock} active={isActive}>
        {children}
      </Content>

      <AddButton className={`icon icon-add`} onClick={handleOpenBlockDialog}>
        <AddIcon />
      </AddButton>

      <DeleteButton className={`icon icon-remove`} onClick={handleRemoveBlock}>
        <DeleteIcon />
      </DeleteButton>
    </Container>
  )
}

const Container = styled.div`
  position: relative;

  .icon {
    opacity: 0;
    pointer-events: none;
  }

  ${({ active }) =>
    !active &&
    css`
      &:hover {
        .icon {
          opacity: 1;
          pointer-events: all;
        }
      }
    `}
`

const Content = styled.div`
  border: 1px solid ${({ active }) => (active ? 'blue' : 'transparent')};
`

const AddButton = styled(IconButton)`
  && {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
  }
`

const DeleteButton = styled(IconButton)`
  && {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
  }
`

export default BlockWrapper
