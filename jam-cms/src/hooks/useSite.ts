import { useEffect } from 'react';

// import components
import { getPreviewID } from '../utils/auth';
import { siteActions } from '../redux';
import { RootState, useAppSelector, useAppDispatch, previewActions } from '../redux';

const useSite = () => {
  const {
    auth: { user: authUser, userLoaded },
    cms: { siteLoaded },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const previewID = getPreviewID();

  useEffect(() => {
    userLoaded && !siteLoaded && dispatch(siteActions.getSite());
  }, [authUser?.id]);

  useEffect(() => {
    previewID && !siteLoaded && dispatch(previewActions.getSitePreview({ previewID }));
  }, [previewID]);
};

export default useSite;
