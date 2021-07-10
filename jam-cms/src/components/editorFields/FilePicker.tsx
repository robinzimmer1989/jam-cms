import React from 'react';
import { Button, Space } from 'antd';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../GatsbyImage' was resolved to '/Users/ro... Remove this comment to see the full error message
import Img from '../GatsbyImage';
import { colors } from '../../theme';

const FilePicker = (props: any) => {
  const { buttonText = 'Edit', onClick, onRemove, value = '' } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ImageContainer type={value?.icon}>
        {value?.type === 'image' && (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Img
            image={value}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={value.alt}
            style={{ width: '100%', height: '100%' }}
          />
        )}

        {value?.type === 'application' && (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <File>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <img src={value?.icon} />
          </File>
        )}
      </ImageContainer>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Buttons>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Space direction="vertical">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {value?.filename && <FileName>{value.filename}</FileName>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {value && <Button children="Remove" onClick={onRemove} danger size="small" />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button children={buttonText} onClick={onClick} size="small" />
          </Space>
        </Space>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  height: 80px;
  width: 80px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tertiary};
`;

const File = styled.div`
  img {
    height: 30px;
  }
`;

const FileName = styled.article`
  font-size: 12px;
  line-height: 16px;
  word-break: break-word;
`;

const Buttons = styled.div`
  flex: 1;
`;

export default FilePicker;
