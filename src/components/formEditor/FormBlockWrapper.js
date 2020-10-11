import React from 'react'
import styled, { css } from 'styled-components'
import produce from 'immer'
import { PlusCircleTwoTone, UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons'

// import app components
import FormFieldsForm from 'components/formEditor/FormFieldsForm'
import { useStore } from 'store'
import { colors } from 'theme'

const FormBlockWrapper = props => {
  const { index, onClick, children } = props

  const [
    {
      editorState: { form, editorIndex },
    },
    dispatch,
  ] = useStore()

  const handleOpenBlockDialog = newIndex => {
    dispatch({
      type: `SET_DIALOG`,
      payload: {
        open: true,
        title: 'Choose a Field',
        component: <FormFieldsForm index={newIndex} />,
        width: 800,
      },
    })
  }

  const handleMoveBlock = newIndex => {
    const nextForm = produce(form, draft => {
      if (newIndex > -1 && newIndex < draft.content.length) {
        const temp = draft.content[index]
        draft.content[index] = draft.content[newIndex]
        draft.content[newIndex] = temp
      }

      return draft
    })

    dispatch({
      type: `UPDATE_EDITOR_FORM`,
      payload: nextForm,
    })
  }

  const handleOpenBlock = () => dispatch({ type: `SET_EDITOR_INDEX`, payload: index })

  const isActive = editorIndex === index

  return (
    <Container active={isActive}>
      <Content onClick={onClick || handleOpenBlock} active={isActive}>
        <div>{children}</div>
      </Content>

      <AddButtonTop className={`icon`} onClick={() => handleOpenBlockDialog(index)}>
        <PlusCircleTwoTone />
      </AddButtonTop>

      <AddButtonBottom className={`icon`} onClick={() => handleOpenBlockDialog(index + 1)}>
        <PlusCircleTwoTone />
      </AddButtonBottom>

      <MoveIcons className={`icon`}>
        <MoveIcon onClick={() => handleMoveBlock(index - 1)} disabled={index === 0}>
          <UpCircleTwoTone />
        </MoveIcon>

        <MoveIcon onClick={() => handleMoveBlock(index + 1)} disabled={index === form.content.length - 1}>
          <DownCircleTwoTone />
        </MoveIcon>
      </MoveIcons>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
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

export default FormBlockWrapper
