// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
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

  ${({
  children
}: any) =>
    children === 'front' &&
    css`
      background: ${colors.success};
      color: #fff;
    `}

  ${({
  children
}: any) =>
    children === 'draft' &&
    css`
      background: ${colors.primary};
      color: #fff;
    `}

  ${({
  children
}: any) =>
    children === 'trash' &&
    css`
      background: ${colors.danger};
      color: #fff;
    `}

    ${({
  children
}: any) =>
    children === 'private' &&
    css`
      background: ${colors.warning};
      color: #000;
    `}
`;

export default Tag;
