import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, PageHeader, Spin, Popconfirm, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

// import app components
import CmsLayout from '../components/CmsLayout';
import ListItem from '../components/ListItem';
import UserForm from '../components/forms/UserForm';
import { RootState, useAppSelector, useAppDispatch, userReducer, showDialog } from '../redux';

const Users = (props: any) => {
  const { fields } = props;

  const {
    auth: { user: authUser },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [page, setPage] = useState(0);
  const [items, setItems] = useState([] as any);

  useEffect(() => {
    loadUsers(page || 0);
  }, []);

  const loadUsers = async (page: any) => {
    if (page > -1) {
      const result: any = await userReducer.getUsers({ page, limit: 10 });

      if (result) {
        setItems((items: any) => items.concat(result.items));
        setPage(result.page);
      }
    }
  };

  const handleLoadMore = () => page && loadUsers(page);

  const handleOpenDialog = (user = {}) =>
    dispatch(
      showDialog({
        open: true,
        title: 'User',
        component: <UserForm onUpdate={handleUpdate} onAdd={handleAdd} {...user} />,
      })
    );

  const handleAdd = async ({ email, role, sendEmail }: any) => {
    const result: any = await userReducer.addUser({ email, role, sendEmail });

    if (result) {
      setItems((items: any) => [result, ...items]);
      message.success(`Added successfully.`);
    }
  };

  const handleUpdate = async ({ id, role }: any) => {
    const result: any = await userReducer.updateUser({ id, role });

    if (result) {
      setItems((items: any) => items.map((o: any) => (o.id === result.id ? result : o)));
      message.success(`Saved successfully.`);
    }
  };

  const handleDelete = async ({ id }: any) => {
    const result: any = await userReducer.deleteUser({ id });

    if (result) {
      setItems((items: any) => items.filter((o: any) => o.id !== result.id));
      message.success(`Deleted successfully.`);
    }
  };

  return (
    <CmsLayout fields={fields} pageTitle={`Users`}>
      <PageHeader>
        <Button children={`Add`} onClick={handleOpenDialog} type="primary" />
      </PageHeader>

      <StyledListItem title={authUser?.email} subtitle={authUser?.roles?.join(', ')} />

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
          items.map((o: any) => {
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
