import React from 'react';
import { Router } from '@reach/router';

// import components
import PrivateEditor from '../editor/PrivateEditor';
import { RootState, useAppSelector } from '../../redux';

const PrivateRouter = (props: any) => {
  const {
    cms: { config },
  } = useAppSelector((state: RootState) => state);

  // We don't need to load the PrivateEditor if page is published
  if (props?.pageContext?.status === 'publish') {
    return React.cloneElement(props?.defaultComponent, { source: config?.source });
  }

  return (
    <Router>
      <PrivateEditor path={'*'} {...props} />
    </Router>
  );
};

export default PrivateRouter;
