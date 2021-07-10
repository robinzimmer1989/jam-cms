import React from 'react';
import { Router } from '@reach/router';

// import components
import PostEditor from '../../pages/PostEditor';
import { useStore } from '../../store';

const Private = (props) => {
  const [{ config }] = useStore();

  // We don't need to load the PostEditor if page is published
  if (props?.pageContext?.status === 'publish') {
    return React.cloneElement(props?.defaultComponent, { source: config.source });
  }

  return (
    <Router>
      <PostEditor path={'*'} {...props} />
    </Router>
  );
};

export default Private;
