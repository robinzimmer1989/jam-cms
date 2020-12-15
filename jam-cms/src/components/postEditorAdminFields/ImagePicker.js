import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import Img from 'gatsby-image';

// import app components
import { colors } from '../../theme';

const ImagePicker = (props) => {
  const { buttonText = 'Edit', onClick, onRemove, value = '' } = props;

  return (
    <Container>
      <ImageContainer>
        {value?.childImageSharp?.fluid && (
          <Img
            fluid={value.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={value.alt}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </ImageContainer>
      <Buttons>
        <Space direction="vertical">
          {value && <Button children="Remove" onClick={onRemove} danger size="small" />}
          <Button children={buttonText} onClick={onClick} size="small" />
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
  background: ${colors.background.dark};
`;

const Buttons = styled.div`
  flex: 1;
`;

export default ImagePicker;
