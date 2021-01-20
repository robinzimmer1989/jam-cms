import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import { colors } from '../../theme';

const FilePicker = (props) => {
  const { buttonText = 'Edit', onClick, onRemove, value = '' } = props;

  return (
    <Container>
      <ImageContainer type={value?.icon}>
        {value?.type === 'image' && value?.childImageSharp?.fluid && (
          <Img
            fluid={value.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={value.alt}
            style={{ width: '100%', height: '100%' }}
          />
        )}

        {value?.type === 'application' && (
          <File>
            <img src={value?.icon} />
          </File>
        )}
      </ImageContainer>
      <Buttons>
        <Space direction="vertical">
          {value?.filename && <FileName>{value.filename}</FileName>}
          <Space>
            {value && <Button children="Remove" onClick={onRemove} danger size="small" />}
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
