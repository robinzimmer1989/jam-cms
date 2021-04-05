import React from 'react';
import styled from 'styled-components';
import { Card, List, Typography } from 'antd';
import { Link } from '@reach/router';
import Img from 'gatsby-image';

import { colors } from '../theme';

const ListItem = (props) => {
  const {
    level = 0,
    link,
    actions,
    title,
    subtitle,
    status,
    image,
    showImage = false,
    ...rest
  } = props;

  const metaTitle = link ? (
    <Link to={link} style={{ flex: 1 }}>
      <Typography.Text strong>
        {title}
        {status}
      </Typography.Text>
    </Link>
  ) : (
    <Typography.Text strong>
      {title}
      {status}
    </Typography.Text>
  );

  return (
    <Container level={level} {...rest}>
      <Card>
        <List.Item actions={actions}>
          <List.Item.Meta
            avatar={
              showImage && (
                <>
                  {image?.localFile?.childImageSharp?.fluid ? (
                    <Img
                      fluid={image.localFile.childImageSharp.fluid}
                      objectFit="cover"
                      objectPosition="50% 50%"
                      alt={image.alt}
                      style={{ width: '50px', height: '50px' }}
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </>
              )
            }
            title={metaTitle}
            description={subtitle}
          />
        </List.Item>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  margin-left: ${({ level }) => `${level * 30}px`};

  .ant-card-body {
    padding: 0 20px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background: ${colors.tertiary};
`;

export default ListItem;
