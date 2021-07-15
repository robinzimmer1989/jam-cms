import { useState, useEffect } from 'react';

// import components
import { useStore } from '../store';
import { previewActions, siteActions } from '../actions';
import { getPreviewID } from '../utils/auth';

const useSite = () => {
  const [
    {
      config,
      authState: { authUser },
      editorState: { siteHasChanged },
    },
    dispatch,
  ] = useStore();

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
    const loadSite = async () => {
      await siteActions.getSite({ siteID: config.siteID, siteHasChanged }, dispatch, config);
    };

    authUser?.capabilities?.edit_posts && loadSite();
  }, [timer, authUser]);

  useEffect(() => {
    const loadPreview = async () => {
      await previewActions.getSitePreview({ siteID: config.siteID, previewID }, dispatch, config);
    };

    if (previewID) {
      loadPreview();
    }
  }, [previewID]);
};

export default useSite;
