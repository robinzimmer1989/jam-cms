import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

// import app components
import { colors } from '../theme';

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
    background: ${({ variant }) => (variant === 'filled' ? colors.primary : 'transparent')};
    color: ${({ variant }) => (variant === 'filled' ? colors.primaryContrast : colors.primary)};
    border: 2px solid ${colors.primary};

    &:hover {
      background: rgb(2 14 53 / 0.8);
      color: ${colors.primaryContrast};
    }
  }
`;

const ExternalLink = styled.a`
  && {
    ${buttonStyles}
    background: ${({ variant }) => (variant === 'filled' ? colors.primary : 'transparent')};
    color: ${({ variant }) => (variant === 'filled' ? colors.primaryContrast : colors.primary)};
    border: 2px solid ${colors.primary};

    &:hover {
      background: rgb(2 14 53 / 0.5);
      color: ${colors.primaryContrast};
    }
  }
`;

export default Button;

export const fields = [
  {
    id: 'button',
    type: 'link',
    label: 'Button',
  },
  {
    id: 'variant',
    type: 'select',
    label: 'Variant',
    defaultValue: 'filled',
    options: [
      {
        name: 'Filled',
        value: 'filled',
      },
      {
        name: 'Outlined',
        value: 'outlined',
      },
    ],
  },
];
