import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, PageHeader, Spin, Popconfirm } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

// import app components
import CmsLayout from '../components/CmsLayout';
import ListItem from '../components/ListItem';
import UserForm from '../components/UserForm';

import { userActions } from '../actions';
import { useStore } from '../store';

const Users = () => {
  const [
    {
      config,
      cmsState: { siteID, sites },
      authState: { authUser },
    },
    dispatch,
  ] = useStore();

  const {
    users: { items, page },
  } = sites[siteID];

  useEffect(() => {
    loadUsers(page || 0);
  }, []);

  const loadUsers = async (page) => {
    if (page > -1) {
      await userActions.getUsers({ siteID, page, limit: 10 }, dispatch, config);
    }
  };

  const handleLoadMore = () => page && loadUsers(page);

  const handleOpenDialog = (user = {}) =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: `Add`,
        component: <UserForm onUpdate={handleUpdate} onAdd={handleAdd} {...user} />,
      },
    });

  const handleAdd = async ({ email, role }) => {
    await userActions.addUser({ siteID, email, role }, dispatch, config);
  };

  const handleUpdate = async ({ id, role }) => {
    await userActions.updateUser({ siteID, id, role }, dispatch, config);
  };

  const handleDelete = async ({ id }) => {
    await userActions.deleteUser({ siteID, id }, dispatch, config);
  };

  return (
    <CmsLayout pageTitle={`Users`}>
      <PageHeader>
        <Button children={`Add`} onClick={handleOpenDialog} type="primary" />
      </PageHeader>

      <StyledListItem title={authUser?.email} subtitle={authUser?.role} />

      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={page > -1}
        loader={
          <LoadingContainer key={0}>
            <Spin size="large" />
          </LoadingContainer>
        }
      >
        {items &&
          items.map((o) => {
            const actions = [
              <Popconfirm
                key="delete"
                title="Are you sure?"
                onConfirm={() => handleDelete(o)}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" children={`Delete`} danger />
              </Popconfirm>,
              <Button key="edit" size="small" onClick={() => handleOpenDialog(o)}>
                Edit
              </Button>,
            ];

            return (
              <StyledListItem key={o.id} title={o.email} subtitle={o.role} actions={actions} />
            );
          })}
      </InfiniteScroll>
    </CmsLayout>
  );
};

const LoadingContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const StyledListItem = styled(ListItem)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Users;
