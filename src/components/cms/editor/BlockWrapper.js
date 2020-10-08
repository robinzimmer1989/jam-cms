import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'

// import app components
import BlockForm from '../forms/BlockForm'
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
        title: 'Choose a Block',
        component: <BlockForm index={newIndex} />,
        width: 800,
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
        <AddButtonTop className={`icon icon-add`} onClick={() => handleOpenBlockDialog(index)}>
          <Button type="primary" shape="circle" icon={<PlusCircleTwoTone />} size={'large'} />
        </AddButtonTop>
      )}

      {!hideAddButtonBottom && (
        <AddButtonBottom className={`icon icon-add`} onClick={() => handleOpenBlockDialog(index + 1)}>
          <Button type="primary" shape="circle" icon={<PlusCircleTwoTone />} size={'large'} />
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

const AddButtonTop = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, 50%);
`

const AddButtonBottom = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
`

export default BlockWrapper
