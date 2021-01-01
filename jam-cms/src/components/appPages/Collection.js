import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Button, Popconfirm, PageHeader, Tabs } from 'antd';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import CmsLayout from '../CmsLayout';
import PostForm from '../PostForm';
import ListItem from '../ListItem';
import Tag from '../Tag';

import { postActions } from '../../actions';
import { useStore } from '../../store';
import { createDataTree, sortBy, generateSlug } from '../../utils';

const Collection = (props) => {
  const { siteID, postTypeID } = props;

  const [
    {
      config,
      cmsState: { sites },
    },
    dispatch,
  ] = useStore();

  const [filter, setFilter] = useState(`all`);

  const postType = sites[siteID]?.postTypes?.[postTypeID];
  const posts = postType?.posts ? Object.values(postType.posts) : [];

  const treePosts = createDataTree(posts);

  const filteredPosts = filter !== `all` ? treePosts.filter((o) => o.status === filter) : treePosts;
  sortBy(filteredPosts, 'createdAt');

  const handleAddPost = async ({ title, slug, parentID }) => {
    const result = await postActions.addPost(
      { siteID, postTypeID, status: 'draft', title, slug, parentID },
      dispatch,
      config
    );

    if (result?.id) {
      // Add post to post type so we can then generate the slug and the route the newly created post
      const nextPostType = produce(postType, (draft) => {
        return set(draft, `posts.${result.id}`, result);
      });

      const slug = generateSlug(nextPostType, result.id, sites?.[siteID]?.frontPage);

      navigate(`/${slug}`);
    }
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
        return <Tabs.TabPane key={name} tab={name.toUpperCase()} />;
      })}
    </Tabs>
  );

  const renderPost = (o, level) => {
    const slug = `/${generateSlug(postType, o.id, sites?.[siteID]?.frontPage)}`;

    const actions = [
      <Link to={slug}>
        <Button size="small">Edit</Button>
      </Link>,
    ];

    if (o.status === 'trash') {
      actions.unshift(
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDeletePost({ postID: o.id })}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" children={`Delete`} danger />
        </Popconfirm>
      );
    } else {
      actions.unshift(
        <Button
          size="small"
          onClick={() => handleTrashPost({ postID: o.id })}
          children={`Trash`}
          danger
        />
      );
    }

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
          hideImage={postTypeID === 'page'}
        />

        {o.childNodes.map((p) => renderPost(p, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <CmsLayout pageTitle={postType?.title}>
      <PageHeader
        title={filterItems}
        extra={
          <Button
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
        }
      />

      {filteredPosts && filteredPosts.map((item) => renderPost(item, 0))}
    </CmsLayout>
  );
};

export default Collection;
