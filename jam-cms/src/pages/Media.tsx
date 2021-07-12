import React from 'react';
import { RouteComponentProps } from '@reach/router';

// import app components
import CmsLayout from '../components/CmsLayout';
import MediaLibrary from '../components/MediaLibrary';

const Media = (props: RouteComponentProps) => {
  return (
    <CmsLayout pageTitle={`Media`}>
      <MediaLibrary />
    </CmsLayout>
  );
};

export default Media;
