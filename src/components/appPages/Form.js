import React, { useEffect } from 'react';
import { Button, Empty } from 'antd';

// import app components
import CmsLayout from '../CmsLayout';
import PageWrapper from '../PageWrapper';

import { convertToPropsSchema } from '../../utils';
import { useStore } from '../../store';
import { formActions } from '../../actions';

const Form = (props) => {
  const { formID, theme } = props;

  const [
    {
      cmsState: { sites, siteID },
      editorState: { form },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    const loadForm = async () => {
      await formActions.getForm({ site: sites[siteID], id: formID }, dispatch);
    };

    loadForm();

    return function cleanup() {
      dispatch({ type: `CLEAR_EDITOR` });
    };
  }, [formID]);

  return <CmsLayout pageTitle="Form" actionBar="editor"></CmsLayout>;
};

export default Form;
