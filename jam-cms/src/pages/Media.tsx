import React from 'react';

// import app components
import CmsLayout from '../components/CmsLayout';
import MediaLibrary from '../components/MediaLibrary';

const Media = (props: any) => {
  const { fields } = props;

  return (
    <CmsLayout fields={fields} pageTitle={`Media`}>
      <MediaLibrary />
    </CmsLayout>
  );
};

export default Media;
