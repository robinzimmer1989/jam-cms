import React, { useEffect, useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Button, PageHeader, Spin, Popconfirm, message } from 'antd';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import InfiniteScroll from 'react-infinite-scroller';
// import app components
import CmsLayout from '../components/CmsLayout';
import ListItem from '../components/ListItem';
import UserForm from '../components/UserForm';
import { userActions } from '../actions';
import { useStore } from '../store';
const Users = () => {
    // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
    const [{ config, cmsState: { siteID, sites }, authState: { authUser }, }, dispatch,] = useStore();
    const [page, setPage] = useState(null);
    const [items, setItems] = useState([]);
    useEffect(() => {
        loadUsers(page || 0);
    }, []);
    const loadUsers = async (page: any) => {
        if (page > -1) {
            const result = await userActions.getUsers({ siteID, page, limit: 10 }, dispatch, config);
            if (result) {
                setItems((items) => items.concat(result.items));
                setPage(result.page);
            }
        }
    };
    const handleLoadMore = () => page && loadUsers(page);
    const handleOpenDialog = (user = {}) => dispatch({
        type: 'SET_DIALOG',
        payload: {
            open: true,
            title: 'User',
            component: <UserForm onUpdate={handleUpdate} onAdd={handleAdd} {...user}/>,
        },
    });
    const handleAdd = async ({ email, role, sendEmail }: any) => {
        const result = await userActions.addUser({ siteID, email, role, sendEmail }, dispatch, config);
        if (result) {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(items: never[]) => any[]' is no... Remove this comment to see the full error message
            setItems((items) => [result, ...items]);
            message.success(`Added successfully.`);
        }
    };
    const handleUpdate = async ({ id, role }: any) => {
        const result = await userActions.updateUser({ siteID, id, role }, dispatch, config);
        if (result) {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(items: never[]) => any[]' is no... Remove this comment to see the full error message
            setItems((items) => items.map((o) => ((o as any).id === result.id ? result : o)));
            message.success(`Saved successfully.`);
        }
    };
    const handleDelete = async ({ id }: any) => {
        const result = await userActions.deleteUser({ siteID, id }, dispatch, config);
        if (result) {
            setItems((items) => items.filter((o) => (o as any).id !== result.id));
            message.success(`Deleted successfully.`);
        }
    };
    return (<CmsLayout pageTitle={`Users`}>
      <PageHeader>
        <Button children={`Add`} onClick={handleOpenDialog} type="primary"/>
      </PageHeader>

      <StyledListItem title={authUser?.email} subtitle={authUser?.role}/>

      {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={page > -1} loader={<LoadingContainer key={0}>
            <Spin size="large"/>
          </LoadingContainer>}>
        {items &&
            items.map((o) => {
                const actions = [
                    <Popconfirm key="delete" title="Are you sure?" onConfirm={() => handleDelete(o)} okText="Yes" cancelText="No">
                <Button size="small" children={`Delete`} danger/>
              </Popconfirm>,
                    <Button key="edit" size="small" onClick={() => handleOpenDialog(o)}>
                Edit
              </Button>,
                ];
                return (<StyledListItem key={(o as any).id} title={(o as any).email} subtitle={(o as any).role} actions={actions}/>);
            })}
      </InfiniteScroll>
    </CmsLayout>);
};
const LoadingContainer = styled.div `
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;
const StyledListItem = styled(ListItem) `
  margin-top: 20px;
  margin-bottom: 20px;
`;
export default Users;
