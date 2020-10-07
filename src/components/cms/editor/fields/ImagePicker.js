import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

// import app components
import Image from 'components/Image'
import { colors } from 'theme'

const ImagePicker = props => {
  const { label, onClick, value } = props

  return (
    <Container>
      <ImageContainer>
        <Image bg={true} {...value} />
      </ImageContainer>

      <Button children={label} onClick={onClick} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ImageContainer = styled.div`
  height: 100px;
  width: 100px;
  margin-right: 10px;
  background: ${colors.background.light};
`

export default ImagePicker
