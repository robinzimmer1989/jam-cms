import { useState, useEffect } from 'react';

// import components
import { getPreviewID } from '../utils/auth';
import { siteReducer } from '../redux';
import { RootState, useAppSelector, useAppDispatch, previewReducer } from '../redux';

const useSite = () => {
  const {
    auth: { user: authUser },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  // timer for refresh token and site updates
  const [timer, setTimer] = useState(0);

  const previewID = getPreviewID();

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimer((time) => time + 1);
    }, 60000); // 60 seconds

    // Clear timer
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    dispatch(siteReducer.getSite());
  }, [timer, authUser]);

  useEffect(() => {
    const loadPreview = async () => {
      await previewReducer.getSitePreview({ previewID });
    };

    if (previewID) {
      loadPreview();
    }
  }, [previewID]);
};

export default useSite;
