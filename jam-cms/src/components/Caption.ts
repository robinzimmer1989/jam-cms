// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Typography } from 'antd';

const Caption = styled(Typography)`
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export default Caption;
