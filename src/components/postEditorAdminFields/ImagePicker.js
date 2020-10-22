import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

// import app components
import Image from 'components/Image'
import { colors } from 'theme'

const ImagePicker = props => {
  const { buttonText = 'Edit', onClick, value = '' } = props

  return (
    <Container>
      <ImageContainer>
        <Image bg={true} image={value} />
      </ImageContainer>

      <Button children={buttonText} onClick={onClick} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ImageContainer = styled.div`
  height: 80px;
  width: 80px;
  margin-right: 10px;
  background: ${colors.background.light};
`

export default ImagePicker
