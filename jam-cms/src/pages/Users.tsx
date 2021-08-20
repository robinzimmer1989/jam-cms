import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, PageHeader, Spin, Popconfirm, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

// import app components
import CmsLayout from '../components/CmsLayout';
import ListItem from '../components/ListItem';
import UserForm from '../components/forms/UserForm';
import { User } from '../types';
import { RootState, useAppSelector, useAppDispatch, userActions, uiActions } from '../redux';

const Users = (props: any) => {
  const { fields } = props;

  const {
    auth: { user: authUser, userLoaded },
    cms: {
      users: { items, page },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [loading, setLoading] = useState('');

  useEffect(() => {
    userLoaded && loadUsers(page);
  }, [userLoaded]);

  const loadUsers = async (page: any) =>
    page > -1 && dispatch(userActions.getUsers({ page, limit: 10 }));

  const handleLoadMore = () => page && loadUsers(page);

  const handleOpenDialog = (user: User | null) =>
    dispatch(
      uiActions.showDialog({
        open: true,
        title: 'User',
        component: <UserForm onUpdate={handleUpdate} onAdd={handleAdd} {...(user || {})} />,
      })
    );

  const handleAdd = async ({ email, role, sendEmail }: any) => {
    const { payload } = await dispatch(userActions.addUser({ email, role, sendEmail }));

    if (payload) {
      message.success(`Added successfully.`);
    }
  };

  const handleUpdate = async ({ id, role }: any) => {
    const { payload } = await dispatch(userActions.updateUser({ id, role }));

    if (payload) {
      message.success(`Saved successfully.`);
    }
  };

  const handleDelete = async (user: User) => {
    setLoading(user.id.toString());

    const { payload } = await dispatch(userActions.deleteUser({ id: user.id }));

    if (payload) {
      message.success(`Deleted successfully`);
    }

    setLoading('');
  };

  return (
    <CmsLayout fields={fields} pageTitle={`Users`}>
      <PageHeader>
        <Button children={`Add`} onClick={() => handleOpenDialog(null)} type="primary" />
      </PageHeader>

      {userLoaded && (
        <StyledListItem title={authUser?.email} subtitle={authUser?.roles?.join(', ')} />
      )}

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
          items.map((o: User) => {
            const actions = [
              <Popconfirm
                key="delete"
                title="Are you sure?"
                onConfirm={() => handleDelete(o)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  children={`Delete`}
                  danger
                  loading={o.id.toString() === loading}
                />
              </Popconfirm>,
              <Button key="edit" size="small" onClick={() => handleOpenDialog(o)}>
                Edit
              </Button>,
            ];
            return (
              <StyledListItem
                key={o.id}
                title={o.email}
                subtitle={o.roles?.join(', ')}
                actions={actions}
              />
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
