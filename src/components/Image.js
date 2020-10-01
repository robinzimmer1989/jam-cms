import React, { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import styled from 'styled-components'

// import app components
import { colors } from '../theme'

const Image = props => {
  const { storageKey, bg, ...rest } = props

  const [src, setSrc] = useState(null)

  useEffect(() => {
    const loadImage = async () => {
      const uri = await Storage.get(storageKey)
      uri && setSrc(uri)
    }

    storageKey && loadImage()
  }, [storageKey])

  return <>{bg ? <Container src={src} {...rest} /> : <Img src={src} />}</>
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  background-color: ${colors.background.light};
`

const Img = styled.img`
  margin: 0;
`

export default Image
