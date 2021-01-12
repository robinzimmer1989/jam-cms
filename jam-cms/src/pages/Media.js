import React from 'react';

// import app components
import CmsLayout from '../components/CmsLayout';
import MediaLibrary from '../components/MediaLibrary';

const Media = () => {
  return (
    <CmsLayout pageTitle={`Media`}>
      <MediaLibrary />
    </CmsLayout>
  );
};

export default Media;
