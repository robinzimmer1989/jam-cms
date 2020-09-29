import React, { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'
import styled from 'styled-components'

const Image = props => {
  const { storageKey, ...rest } = props

  const [src, setSrc] = useState(null)

  useEffect(() => {
    const loadImage = async () => {
      const uri = await Storage.get(storageKey)
      uri && setSrc(uri)
    }

    storageKey && loadImage()
  }, [storageKey])

  return (
    <Container {...rest}>
      <Img src={src} />
    </Container>
  )
}

const Container = styled.div``

const Img = styled.img``

export default Image
