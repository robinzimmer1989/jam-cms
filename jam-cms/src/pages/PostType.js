import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Button, PageHeader, Tabs, Space, Select, Input, Menu, Dropdown } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import CmsLayout from '../components/CmsLayout';
import PostForm from '../components/PostForm';
import ListItem from '../components/ListItem';
import Tag from '../components/Tag';

import { postActions } from '../actions';
import { useStore } from '../store';
import { createDataTree, sortBy, generateSlug } from '../utils';

const PostType = (props) => {
  const { siteID, postTypeID } = props;

  const [
    {
      config,
      cmsState: { sites },
    },
    dispatch,
  ] = useStore();

  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const postType = sites[siteID]?.postTypes?.[postTypeID];
  const posts = postType?.posts ? Object.values(postType.posts) : [];

  let visiblePosts = [];

  // Filter by category
  visiblePosts = !!category
    ? posts.filter((o) => o?.taxonomies?.[category?.taxonomy]?.includes(category.term))
    : posts;

  // Filter by post status
  visiblePosts =
    filter === 'all'
      ? visiblePosts.filter((o) => o.status !== 'trash')
      : visiblePosts.filter((o) => o.status === filter);

  // Filter by search query
  visiblePosts = search
    ? visiblePosts.filter((o) => o.title.toLowerCase().includes(search))
    : visiblePosts;

  // Sort posts by date
  sortBy(visiblePosts, 'createdAt');

  // Create data tree
  visiblePosts = createDataTree(visiblePosts);

  const taxonomies = Object.values(sites?.[siteID]?.taxonomies).filter((o) =>
    o?.postTypes.includes(postTypeID)
  );

  const handleAddPost = async ({ title, parentID }) => {
    const result = await postActions.addPost(
      { siteID, postTypeID, status: 'draft', title, parentID },
      dispatch,
      config
    );

    if (result?.id) {
      dispatch({ type: 'SET_EDITOR_SIDEBAR', payload: 'content' });

      // Add post to post type so we can then generate the slug and the route the newly created post
      const nextPostType = produce(postType, (draft) => {
        return set(draft, `posts.${result.id}`, result);
      });

      const slug = generateSlug(nextPostType, result.id, sites?.[siteID]?.frontPage);

      navigate(`/${slug}`);
    }
  };

  const handleDuplicatePost = async ({ postID }) => {
    await postActions.duplicatePost({ siteID, id: postID }, dispatch, config);
  };

  const handleDeletePost = async ({ postID }) => {
    await postActions.deletePost({ siteID, id: postID }, dispatch, config);
  };

  const handleTrashPost = async ({ postID }) => {
    await postActions.updatePost({ siteID, id: postID, status: 'trash' }, dispatch, config);
  };

  const filterItems = (
    <Tabs defaultActiveKey="all" onChange={(v) => setFilter(v)}>
      {['all', 'publish', 'draft', 'trash'].map((name) => {
        const count =
          name === 'all'
            ? posts.filter((o) => o.status !== 'trash').length
            : posts.filter((o) => o.status === name).length;

        return <Tabs.TabPane key={name} tab={`${name.toUpperCase()} (${count})`} />;
      })}
    </Tabs>
  );

  const extra = [];

  if (taxonomies && taxonomies.length > 0) {
    extra.push(
      <Select
        key="taxonomies"
        style={{ width: 160 }}
        onChange={(v, o) => setCategory(o?.taxonomy ? { taxonomy: o.taxonomy, term: v } : '')}
        allowClear
        placeholder="Select category"
      >
        {taxonomies.map((o) => {
          return (
            <Select.OptGroup key={o.id} label={o.title}>
              {o.terms &&
                o.terms.map((p) => {
                  return (
                    <Select.Option key={p.id} value={p.id} taxonomy={o.id}>
                      {p.title}
                    </Select.Option>
                  );
                })}
            </Select.OptGroup>
          );
        })}
      </Select>
    );
  }

  extra.push(
    <Input.Search
      key="search"
      allowClear
      defaultValue={search}
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
    />
  );

  extra.push(
    <Button
      key="add"
      children={`Add`}
      onClick={() =>
        dispatch({
          type: 'SET_DIALOG',
          payload: {
            open: true,
            title: `Add`,
            component: <PostForm onSubmit={handleAddPost} postTypeID={postTypeID} />,
          },
        })
      }
      type="primary"
    />
  );

  const renderPost = (o, level) => {
    const slug = `/${generateSlug(postType, o.id, sites?.[siteID]?.frontPage)}`;

    const actions = [];

    const menu = (
      <Menu>
        <Menu.Item key="duplicate" onClick={() => handleDuplicatePost({ postID: o.id })}>
          Duplicate
        </Menu.Item>

        {o.status === 'trash' ? (
          <Menu.Item key="delete" danger onClick={() => handleDeletePost({ postID: o.id })}>
            Delete
          </Menu.Item>
        ) : (
          <Menu.Item key="trash" danger onClick={() => handleTrashPost({ postID: o.id })}>
            Trash
          </Menu.Item>
        )}
      </Menu>
    );

    actions.unshift(
      <Dropdown.Button overlay={menu} trigger={['click']}>
        <Link to={slug}>Edit</Link>
      </Dropdown.Button>
    );

    let badges = [];

    if (sites?.[siteID]?.frontPage === o.id) {
      badges.push(<Tag key="front" children={'front'} />);
    }

    if (o.status === 'draft' || o.status === 'trash') {
      badges.push(<Tag key="status" children={o.status} />);
    }

    return (
      <React.Fragment key={o.id}>
        <ListItem
          level={level}
          actions={actions}
          title={o.title}
          subtitle={slug}
          status={badges}
          image={o.featuredImage}
          showImage={postTypeID !== 'page'}
        />

        {o.childNodes.map((p) => renderPost(p, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <CmsLayout pageTitle={postType?.title}>
      <PageHeader title={filterItems} extra={extra} />

      <Space direction="vertical" size={20}>
        {visiblePosts && visiblePosts.map((item) => renderPost(item, 0))}
      </Space>
    </CmsLayout>
  );
};

export default PostType;
