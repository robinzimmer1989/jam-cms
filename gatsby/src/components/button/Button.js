import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const Button = (props) => {
  const { url, title, variant, color } = props;

  if (!url || !title) {
    return null;
  }

  return url.includes('http') ? (
    <ExternalLink href={url} color={color} variant={variant} children={title} target={'_blank'} />
  ) : (
    <InternalLink to={url} color={color} variant={variant} children={title} />
  );
};

const buttonStyles = css`
  display: inline-block;
  padding: 8px 20px;
  text-decoration: none;
  border-radius: 5px;
  min-width: 160px;
  text-align: center;
  transition: ease-in-out 0.2s all;
`;

const InternalLink = styled(Link)`
  && {
    ${buttonStyles}
    background: ${({ theme, variant }) =>
      variant === 'filled' ? theme.colors.primary : 'transparent'};
    color: ${({ theme, variant }) =>
      variant === 'filled' ? theme.colors.primarycontrast : theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background: rgb(2 14 53 / 0.8);
      color: ${({ theme }) => theme.colors.primarycontrast};
    }
  }
`;

const ExternalLink = styled.a`
  && {
    ${buttonStyles}
    background: ${({ theme, variant }) =>
      variant === 'filled' ? theme.colors.primary : 'transparent'};
    color: ${({ theme, variant }) =>
      variant === 'filled' ? theme.colors.primarycontrast : theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background: rgb(2 14 53 / 0.5);
      color: ${({ theme }) => theme.colors.primarycontrast};
    }
  }
`;

export default Button;
