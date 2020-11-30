import React from 'react';
import styled from 'styled-components';
import { Card, List, Typography } from 'antd';
import { Link } from '@reach/router';
import Img from 'gatsby-image';

const ListItem = (props) => {
  const { level = 0, link, actions, title, subtitle, status, image, hideImage } = props;

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
    <Container level={level}>
      <Card>
        <List.Item actions={actions}>
          <List.Item.Meta
            avatar={
              !hideImage &&
              image?.childImageSharp?.fluid && (
                <Img
                  fluid={image.childImageSharp.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt={image.alt}
                  style={{ width: '50px', height: '50px' }}
                />
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
  margin-bottom: 20px;

  .ant-card-body {
    padding: 0 20px;
  }
`;

export default ListItem;
