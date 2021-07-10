import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Button, PageHeader, Tabs, Space, Select, Input, Menu, Dropdown, message, Alert, Popconfirm, } from 'antd';
import produce from 'immer';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/CmsLayout' was resolved to '... Remove this comment to see the full error message
import CmsLayout from '../components/CmsLayout';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/PostForm' was resolved to '/... Remove this comment to see the full error message
import PostForm from '../components/PostForm';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/ListItem' was resolved to '/... Remove this comment to see the full error message
import ListItem from '../components/ListItem';
import Tag from '../components/Tag';
import { postActions, siteActions } from '../actions';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
import { createDataTree, generateSlug, addPost } from '../utils';
import { colors } from '../theme';
import getRoute from '../routes';
const PostType = (props: any) => {
    const { postTypeID } = props;
    const [{ config, cmsState: { sites, siteID }, }, dispatch,] = useStore();
    const [filter, setFilter] = useState('all');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);
    const postType = sites[siteID]?.postTypes?.[postTypeID];
    const posts = postType?.posts ? Object.values(postType.posts) : [];
    let visiblePosts: any = [];
    // Filter by category
    visiblePosts = !!category
        ? posts.filter((o) => (o as any)?.taxonomies?.[(category as any)?.taxonomy]?.includes((category as any).term))
        : posts;
    // Filter by post status
    visiblePosts =
        filter === 'all'
            ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
              visiblePosts.filter((o) => o.status !== 'trash')
            : // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
              visiblePosts.filter((o) => o.status === filter);
    // Filter by search query
    visiblePosts = search
        ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
          visiblePosts.filter((o) => o.title.toLowerCase().includes(search))
        : visiblePosts;
    // Sort posts by menu order
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    visiblePosts = visiblePosts.sort((a, b) => (a.order > b.order ? 1 : -1));
    // Create data tree
    visiblePosts = createDataTree(visiblePosts);
    const taxonomies = Object.values(sites?.[siteID]?.taxonomies).filter((o) => (o as any)?.postTypes.includes(postTypeID));
    useEffect(() => {
        // Navigate to dashboard if template not found in fields object
        if (!config?.fields?.postTypes?.[postTypeID]) {
            navigate(getRoute('dashboard', { siteID }));
        }
    }, []);
    const handleSync = async () => {
        setIsSyncing(true);
        await siteActions.syncFields({ fields: config.fields, apiKey: sites[siteID]?.apiKey }, dispatch, config);
        setIsSyncing(false);
    };
    const handleDuplicatePost = async ({ postID }: any) => {
        await postActions.duplicatePost({ siteID, id: postID }, dispatch, config);
    };
    const handleDeletePost = async ({ postID }: any) => {
        await postActions.deletePost({ siteID, id: postID }, dispatch, config);
    };
    const handleAddPost = async ({ postTypeID, title, parentID }: any) => {
        await addPost({ site: sites[siteID], postTypeID, title, parentID }, dispatch, config);
    };
    const handleTrashPost = async ({ postID }: any) => {
        const result = await postActions.updatePost({ siteID, postTypeID, id: postID, status: 'trash' }, dispatch, config);
        if (result) {
            message.info('Post has been trashed');
        }
    };
    const handleEmptyTrash = async () => {
        const result = await postActions.emptyTrash({ siteID, postTypeID }, dispatch, config);
        if (result) {
            message.info({ content: 'Trashed emptied successfully' });
        }
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const filterItems = (<Tabs defaultActiveKey="all" onChange={(v) => setFilter(v)}>
      {['all', 'publish', 'draft', 'private', 'trash'].map((name) => {
            const count = name === 'all'
                ? posts.filter((o) => (o as any).status !== 'trash').length
                : posts.filter((o) => (o as any).status === name).length;
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <Tabs.TabPane key={name} tab={`${name.toUpperCase()} (${count})`}/>;
        })}
    </Tabs>);
    const extra = [];
    if (taxonomies && taxonomies.length > 0) {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        extra.push(<Select key="taxonomies" style={{ width: 160 }} onChange={(v, o) => setCategory((o as any)?.taxonomy ? { taxonomy: (o as any).taxonomy, term: v } : '')} allowClear placeholder="Select category">
        {taxonomies.map((o) => {
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                return (<Select.OptGroup key={(o as any).id} label={(o as any).title}>
              {(o as any).terms &&
                        (o as any).terms.map((p: any) => {
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            return (<Select.Option key={p.id} value={p.id} taxonomy={(o as any).id}>
                      {p.title}
                    </Select.Option>);
                        })}
            </Select.OptGroup>);
            })}
      </Select>);
    }
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    extra.push(<Input.Search key="search" allowClear defaultValue={search} onChange={(e) => setSearch(e.target.value.toLowerCase())}/>);
    if (filter === 'trash') {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        extra.push(<Popconfirm key="empty-trash" title="Are you sure you want to empty the trash?" onConfirm={handleEmptyTrash} okText="Yes" cancelText="No" placement="bottomRight" disabled={visiblePosts.length === 0}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button children={'Empty trash'} disabled={visiblePosts.length === 0} type="danger"/>
      </Popconfirm>);
    }
    else {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        extra.push(<Button key="add" children={`Add`} disabled={!postType} onClick={() => dispatch({
                type: 'SET_DIALOG',
                payload: {
                    open: true,
                    title: `Add ${postType.title}`,
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    component: <PostForm onSubmit={handleAddPost} postTypeID={postTypeID}/>,
                },
            })} type="primary"/>);
    }
    const renderPost = (o: any, level: any) => {
        const slug = `/${generateSlug(postType, o.id, sites?.[siteID]?.frontPage)}`;
        const actions = [];
        const isLocked = !!o.locked;
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const menu = (<Menu>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Menu.Item key="duplicate" onClick={() => handleDuplicatePost({ postID: o.id })}>
          Duplicate
        </Menu.Item>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {o.status === 'trash' ? (<Menu.Item key="delete" danger onClick={() => handleDeletePost({ postID: o.id })} disabled={isLocked}>
            Delete
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          </Menu.Item>) : (<Menu.Item key="trash" danger onClick={() => handleTrashPost({ postID: o.id })} disabled={isLocked}>
            Trash
          </Menu.Item>)}
      </Menu>);
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        actions.unshift(<Dropdown.Button overlay={menu} trigger={['click']}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to={slug}>{isLocked ? 'View' : 'Edit'}</Link>
      </Dropdown.Button>);
        let badges = [];
        if (sites?.[siteID]?.frontPage === o.id) {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            badges.push(<Tag key="front" children={'front'}/>);
        }
        if (o.status === 'draft' || o.status === 'trash' || o.status === 'private') {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            badges.push(<Tag key="status" children={o.status}/>);
        }
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<React.Fragment key={o.id}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ListItem level={level} actions={actions} title={o.title} subtitle={slug} status={badges} image={o.featuredImage} showImage={postTypeID !== 'page'} link={slug} info={isLocked && `${o.locked?.email} is currently editing`}/>

        {o.childNodes.map((p: any) => renderPost(p, level + 1))}
      </React.Fragment>);
    };
    const getListStyle = (isDraggingOver: any) => ({
        background: isDraggingOver ? colors.tertiary : 'transparent'
    });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isDragging' implicitly has an 'any' typ... Remove this comment to see the full error message
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        marginBottom: '8px',
        ...draggableStyle
    });
    const handleDragEnd = async (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const index = result.source.index;
        const newIndex = result.destination.index;
        if (index === newIndex) {
            return;
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'draft' implicitly has an 'any' type.
        const nextPosts = produce(visiblePosts, (draft) => {
            if (newIndex > -1 && newIndex < draft.length) {
                const temp = draft[index];
                draft[index] = draft[newIndex];
                draft[newIndex] = temp;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
                draft.map((o, i) => {
                    return (draft[i] = { ...o, order: i });
                });
            }
            return draft;
        });
        await postActions.reorderPosts({ siteID, postType, posts: nextPosts }, dispatch, config);
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<CmsLayout pageTitle={config?.fields?.postTypes?.[postTypeID]?.title || postType?.title}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <PageHeader title={filterItems} extra={extra}/>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {!postType && (<Alert message="Unknown post type" description="Restart the development process or sync new data now" type="info" showIcon action={<Button size="small" type="ghost" onClick={handleSync} loading={isSyncing}>
              Sync to WordPress
            </Button>}/>)}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {visiblePosts && (<Space direction="vertical" size={8}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {filter === 'all' && postTypeID !== 'page' ? (<DragDropContext onDragEnd={handleDragEnd}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Droppable droppableId="droppable">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {(provided: any, snapshot: any) => (<div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type. */}
                    {visiblePosts.map((o, i) => {
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        return (<Draggable key={o.id} draggableId={`item-${o.id}`} index={i}>
                          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                          {(provided: any, snapshot: any) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                              {renderPost(o, 0)}
                            </div>)}
                        </Draggable>);
                    })}

                    {provided.placeholder}
                  </div>)}
              </Droppable>
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type. */}
            </DragDropContext>) : (visiblePosts.map((o) => renderPost(o, 0)))}
        </Space>)}
    </CmsLayout>);
};
export default PostType;
