import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, PageHeader, Spin, Popconfirm, message } from 'antd';
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

  const [page, setPage] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadUsers(page || 0);
  }, []);

  const loadUsers = async (page) => {
    if (page > -1) {
      const result = await userActions.getUsers({ siteID, page, limit: 10 }, dispatch, config);

      if (result) {
        setItems((items) => items.concat(result.items));
        setPage(result.page);
      }
    }
  };

  const handleLoadMore = () => page && loadUsers(page);

  const handleOpenDialog = (user = {}) =>
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'User',
        component: <UserForm onUpdate={handleUpdate} onAdd={handleAdd} {...user} />,
      },
    });

  const handleAdd = async ({ email, role, sendEmail }) => {
    const result = await userActions.addUser({ siteID, email, role, sendEmail }, dispatch, config);

    if (result) {
      setItems((items) => [result, ...items]);
      message.success(`Added successfully.`);
    }
  };

  const handleUpdate = async ({ id, role }) => {
    const result = await userActions.updateUser({ siteID, id, role }, dispatch, config);

    if (result) {
      setItems((items) => items.map((o) => (o.id === result.id ? result : o)));
      message.success(`Saved successfully.`);
    }
  };

  const handleDelete = async ({ id }) => {
    const result = await userActions.deleteUser({ siteID, id }, dispatch, config);

    if (result) {
      setItems((items) => items.filter((o) => o.id !== result.id));
      message.success(`Deleted successfully.`);
    }
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
