import { useEffect } from 'react';

// import components
import useInterval from './useInterval';
import { getPreviewID } from '../utils/auth';
import { RootState, useAppSelector, useAppDispatch, siteActions, previewActions } from '../redux';

const useSite = () => {
  const {
    auth: { userLoaded },
    cms: { siteLastFetch },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const previewID = getPreviewID();

  useInterval(() => {
    userLoaded && Date.now() - siteLastFetch > 60000 && dispatch(siteActions.getSite());
  }, 10000);

  useEffect(() => {
    !previewID && dispatch(siteActions.getSite());
  }, []);

  useEffect(() => {
    previewID && dispatch(previewActions.getSitePreview({ previewID }));
  }, [previewID]);
};

export default useSite;
