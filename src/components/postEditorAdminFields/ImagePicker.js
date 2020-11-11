import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import Img from 'gatsby-image'

// import app components
import { colors } from '../../theme'

const ImagePicker = (props) => {
  const { buttonText = 'Edit', onClick, value = '' } = props

  return (
    <Container>
      <ImageContainer>
        {value?.childImageSharp?.fluid && (
          <Img
            fluid={value.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={value.alt}
            style={{ width: '100%', height: '100%' }}
          />
        )}
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
