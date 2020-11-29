import React from 'react';
import { Button, PageHeader, Popconfirm } from 'antd';
import { Link } from '@reach/router';
// import app components
import CmsLayout from '../CmsLayout';
import FormForm from '../FormForm';
import ListItem from '../ListItem';

import { formActions } from '../../actions';
import { useStore } from '../../store';
import getRoute from '../../routes';

const Forms = () => {
  const [
    {
      cmsState: { siteID, sites },
    },
    dispatch,
  ] = useStore();

  const forms = sites[siteID]?.forms;

  const handleAddForm = async ({ title }) => {
    await formActions.addForm({ siteID, title }, dispatch);
  };

  const handleDeleteForm = async ({ id }) => {
    await formActions.deleteForm({ id }, dispatch);
  };

  const handleOpenDialog = () => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Form`,
        component: <FormForm onSubmit={handleAddForm} siteID={siteID} />,
      },
    });
  };

  return (
    <CmsLayout pageTitle={`Forms`}>
      <PageHeader>{/* <Button children={`Add`} onClick={handleOpenDialog} type="primary" /> */}</PageHeader>

      {forms &&
        Object.values(forms).map((o) => {
          const editLink = getRoute(`form`, { siteID, formID: o.id });

          const actions = [
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDeleteForm({ id: o.id })}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" children={`Delete`} danger />
            </Popconfirm>,
            <Button size="small">
              <Link to={editLink}>Edit</Link>
            </Button>,
          ];

          return <ListItem key={o.id} link={editLink} actions={actions} title={o.title} hideImage />;
        })}
    </CmsLayout>
  );
};

export default Forms;
