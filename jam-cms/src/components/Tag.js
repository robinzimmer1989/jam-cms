import styled, { css } from 'styled-components';

import { colors } from '../theme';

const Tag = styled.span`
  display: inline-block;
  padding: 2px 4px;
  margin-left: 10px;
  transform: translateY(-2px);
  font-size: 9px;
  text-transform: uppercase;
  border-radius: 4px;

  ${({ children }) =>
    children === 'front' &&
    css`
      background: ${colors.success};
      color: #fff;
    `}

  ${({ children }) =>
    children === 'draft' &&
    css`
      background: ${colors.primary.dark};
      color: #fff;
    `}

  ${({ children }) =>
    children === 'trash' &&
    css`
      background: ${colors.warning};
      color: #fff;
    `}
`;

export default Tag;
