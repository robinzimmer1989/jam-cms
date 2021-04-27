import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Images = (props) => {
  const { columns, gallery } = props;

  return (
    <Container>
      {gallery &&
        gallery.map((o, i) => {
          return (
            <Item key={i} columns={columns}>
              {getImage(o?.localFile) && (
                <GatsbyImage
                  image={getImage(o.localFile)}
                  alt={o.altText}
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </Item>
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;
`;

const Item = styled.div`
  position: relative;
  width: ${({ columns }) => (columns ? `calc(100% / ${columns})` : '100%')};
  min-width: 200px;
  height: 200px;
`;

export default Images;
