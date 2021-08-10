import React from 'react';
import styled from 'styled-components';

// import app components
import Img from '../components/GatsbyImage';

export default function renderMediaItem(mediaItem: any, thumbnail = true) {
  let el = null;

  if (mediaItem.type === 'image' && mediaItem.subtype === 'svg+xml') {
    el = <img className="jam-cms-svg" src={mediaItem.sourceUrl} />;
  } else if (mediaItem.type === 'image') {
    el = <Img image={mediaItem} objectFit="contain" alt={mediaItem.alt} />;
  } else if (mediaItem.type === 'application') {
    el = (
      <div>
        <img className="jam-cms-placeholder-icon" src={mediaItem.icon} />
        <span>{mediaItem.title}</span>
      </div>
    );
  } else if (mediaItem.type === 'video') {
    if (thumbnail) {
      el = (
        <div>
          <img className="jam-cms-placeholder-icon" src={mediaItem.icon} />
          <span>{mediaItem.title}</span>
        </div>
      );
    } else {
      el = (
        <video controls>
          <source src={mediaItem.url} type={mediaItem.mime_type} />
        </video>
      );
    }
  }

  return <Container>{el}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .jam-cms-svg {
    max-height: 100%;
    max-width: 100%;
  }

  .jam-cms-placeholder-icon {
    width: 30px;
    margin: 0 auto 10px;
  }

  .gatsby-image-wrapper {
    max-height: 100%;
    max-width: 100%;
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
`;
