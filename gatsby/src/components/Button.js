import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const Button = (props) => {
  const { url = '', title, target, variant, color } = props

  return url.includes('http') ? (
    <ExternalLink
      href={url}
      className="jamcmsButton"
      color={color}
      variant={variant}
      children={title}
      target={target || '_self'}
    />
  ) : (
    <InternalLink
      to={url}
      className="jamcmsButton"
      color={color}
      variant={variant}
      children={title}
      target={target || '_self'}
    />
  )
}

const buttonStyles = css`
  display: inline-block;
  padding: 8px 20px;
  text-decoration: none;
`

const InternalLink = styled(Link)`
  && {
    ${buttonStyles}
    background: ${({ variant }) => (variant === 'filled' ? '#000' : 'transparent')};
    color: ${({ variant }) => (variant === 'filled' ? '#fff' : '#000')};
    border: 2px solid #000;
  }
`

const ExternalLink = styled.a`
  && {
    ${buttonStyles}
    background: ${({ variant }) => (variant === 'filled' ? '#000' : 'transparent')};
    color: ${({ variant }) => (variant === 'filled' ? '#fff' : '#000')};
    border: 2px solid #000;
  }
`

export default Button
