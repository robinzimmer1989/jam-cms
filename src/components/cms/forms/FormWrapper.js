import React from 'react'
import styled from 'styled-components'

const FormWrapper = props => {
  const { title, children, button } = props

  return (
    <>
      {title && <Title children={title} />}
      {children && <Content children={children} />}
      <Buttons>{button}</Buttons>
    </>
  )
}

const Title = styled.h2`
  padding: 20px;
  margin: 0;
`

const Content = styled.div`
  padding: 20px;
`

const Buttons = styled.div`
  padding: 20px;
`

export default FormWrapper
