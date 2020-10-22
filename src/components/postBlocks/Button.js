import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const Button = props => {
  const { url = '', title, target, variant, color } = props

  return url.includes('http') ? (
    <ExternalLink
      href={url}
      className="gcmsButton"
      color={color}
      variant={variant}
      children={title}
      target={target || '_self'}
    />
  ) : (
    <InternalLink
      to={url}
      className="gcmsButton"
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
`

const InternalLink = styled(Link)`
  && {
    ${buttonStyles}
    background: ${({ theme, variant, color }) => (variant === 'filled' ? theme.colors[color] : 'transparent')};
    color: ${({ theme, variant, color }) =>
      variant === 'filled' ? theme.colors[`${color}Text`] : theme.colors[`backgroundText`]};
    border: 2px solid ${({ theme, color }) => theme.colors[color]};
  }
`

const ExternalLink = styled.a`
  && {
    ${buttonStyles}
    background: ${({ theme, variant, color }) => (variant === 'filled' ? theme.colors[color] : 'transparent')};
    color: ${({ theme, variant, color }) =>
      variant === 'filled' ? theme.colors[`${color}Text`] : theme.colors[`backgroundText`]};
    border: 2px solid ${({ theme, color }) => theme.colors[color]};
  }
`

export default Button
