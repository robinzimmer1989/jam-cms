import React from 'react';
import styled from 'styled-components';
import { Card, List, Typography } from 'antd';
import { Link } from '@reach/router';

// import app components
import Img from './GatsbyImage';
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
    info = '',
    ...rest
  } = props;

  const listItemTitle = (
    <Typography.Text strong>
      {title}
      {status}
    </Typography.Text>
  );

  let metaTitle = link ? <StyledLink to={link}>{listItemTitle}</StyledLink> : listItemTitle;

  if (info) {
    metaTitle = (
      <>
        {metaTitle} - {info}
      </>
    );
  }

  return (
    <Container level={level} {...rest}>
      <Card>
        <List.Item actions={actions}>
          <List.Item.Meta
            avatar={
              showImage && (
                <>
                  {image ? (
                    <Img
                      image={image}
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

const StyledLink = styled(Link)`
  && {
    flex: 1;

    &:hover {
      .ant-typography {
        color: ${colors.primary};
      }
    }
  }
`;

export default ListItem;
