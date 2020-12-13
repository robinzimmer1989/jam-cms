import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

// import app components
import { colors } from '../theme';

const Button = (props) => {
  const { url = '', title, target, variant, color } = props;

  return url.includes('http') ? (
    <ExternalLink
      href={url}
      color={color}
      variant={variant}
      children={title}
      target={target || '_self'}
    />
  ) : (
    <InternalLink
      to={url}
      color={color}
      variant={variant}
      children={title}
      target={target || '_self'}
    />
  );
};

const buttonStyles = css`
  display: inline-block;
  padding: 8px 20px;
  text-decoration: none;
`;

const InternalLink = styled(Link)`
  && {
    ${buttonStyles}
    background: ${({ variant }) => (variant === 'filled' ? colors.secondary : 'transparent')};
    color: ${({ variant }) => (variant === 'filled' ? colors.secondaryContrast : colors.secondary)};
    border: 2px solid ${colors.secondary};
  }
`;

const ExternalLink = styled.a`
  && {
    ${buttonStyles}
    background: ${({ variant }) => (variant === 'filled' ? colors.secondary : 'transparent')};
    color: ${({ variant }) => (variant === 'filled' ? colors.secondaryContrast : colors.secondary)};
    border: 2px solid ${colors.secondary};
  }
`;

export default Button;
