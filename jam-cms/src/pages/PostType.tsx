import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import produce from 'immer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button,
  PageHeader,
  Tabs,
  Space,
  Select,
  Input,
  Menu,
  Dropdown,
  message,
  Alert,
  Popconfirm,
} from 'antd';

// import app components
import CmsLayout from '../components/CmsLayout';
import PostForm from '../components/forms/PostForm';
import ListItem from '../components/ListItem';
import Tag from '../components/Tag';
import LanguageSelector from '../components/LanguageSelector';
import { postActions, siteActions, languageActions } from '../actions';
import { useStore } from '../store';
import { createDataTree, generateSlug, addPost, translatePost } from '../utils';
import { colors } from '../theme';
import getRoute from '../routes';

const PostType = (props: any) => {
  const { postTypeID } = props;

  const [
    {
      config,
      cmsState: { sites, siteID, activeLanguage },
    },
    dispatch,
  ] = useStore();

  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState(null as any);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState('');

  // Check if post type supports languages
  const postTypeSupportsLanguages = !!sites[siteID]?.languages?.postTypes?.find(
    (s: string) => s === postTypeID
  );

  const postType = sites[siteID]?.postTypes?.[postTypeID];
  const posts = postType?.posts ? Object.values(postType.posts) : [];

  // Check if there are untranslated posts
  const postsWithoutLanguage = postTypeSupportsLanguages && posts.find((o: any) => !o.language);

  // Filter by language
  const postsPerLanguage = postTypeSupportsLanguages
    ? posts.filter((o: any) => (activeLanguage === 'all' ? o : o.language === activeLanguage))
    : posts;

  let visiblePosts: any = [];

  // Filter by category
  visiblePosts = !!category
    ? postsPerLanguage.filter((o: any) =>
        o?.taxonomies?.[category?.taxonomy]?.includes(category.term)
      )
    : postsPerLanguage;

  // Filter by post status
  visiblePosts =
    filter === 'all'
      ? visiblePosts.filter((o: any) => o.status !== 'trash')
      : visiblePosts.filter((o: any) => o.status === filter);

  // Filter by search query
  visiblePosts = search
    ? visiblePosts.filter((o: any) => o.title.toLowerCase().includes(search))
    : visiblePosts;

  // Sort posts by menu order
  visiblePosts = visiblePosts.sort((a: any, b: any) => (a.order > b.order ? 1 : -1));

  // Create data tree
  visiblePosts = createDataTree(visiblePosts);

  const taxonomies = Object.values(sites[siteID]?.taxonomies).filter((o) =>
    (o as any)?.postTypes.includes(postTypeID)
  );

  useEffect(() => {
    // Navigate to dashboard if template not found in fields object
    if (!config?.fields?.postTypes?.[postTypeID]) {
      navigate(getRoute('dashboard', { siteID }));
    }
  }, []);

  const handleSync = async () => {
    setLoading('sync');
    await siteActions.syncFields(
      { fields: config.fields, apiKey: sites[siteID]?.apiKey },
      dispatch,
      config
    );
    setLoading('');
  };

  const handleTranslateMass = async () => {
    setLoading('translate');

    const language =
      activeLanguage !== 'all' ? activeLanguage : sites[siteID]?.languages?.defaultLanguage;

    await languageActions.translateMass(
      {
        siteID,
        postTypeID,
        type: 'post',
        ids: posts.filter((o: any) => !o.language).map((o: any) => o.id),
        language,
      },
      dispatch,
      config
    );
    setLoading('');
  };

  const handleDuplicatePost = async ({ postID }: any) => {
    await postActions.duplicatePost({ siteID, id: postID }, dispatch, config);
  };

  const handleDeletePost = async ({ postID }: any) => {
    await postActions.deletePost({ siteID, postTypeID, id: postID }, dispatch, config);
  };

  const handleAddPost = async (args: any) => {
    await addPost({ site: sites[siteID], ...args }, dispatch, config);
  };

  const handleTrashPost = async ({ postID }: any) => {
    const result = await postActions.updatePost(
      { siteID, postTypeID, id: postID, status: 'trash' },
      dispatch,
      config
    );
    if (result) {
      message.info('Post has been trashed');
    }
  };

  const handleEmptyTrash = async () => {
    const result = await postActions.emptyTrash(
      { siteID, postTypeID, language: activeLanguage },
      dispatch,
      config
    );
    if (result) {
      message.info({ content: 'Trashed emptied successfully' });
    }
  };

  const handleTranslatePost = async ({ id, language }: any) => {
    await translatePost({ sites, siteID, id, language }, dispatch, config);
  };

  const renderUntranslatedPostsWarning = () => {
    const languageSlug =
      activeLanguage !== 'all' ? activeLanguage : sites[siteID]?.languages?.defaultLanguage;

    const languageName = sites[siteID]?.languages?.languages.find(
      (o: any) => o.slug === languageSlug
    )?.name;

    return (
      <Alert
        message="There are posts without a language"
        type="info"
        showIcon
        action={
          <Button
            size="small"
            type="ghost"
            onClick={handleTranslateMass}
            loading={loading === 'translate'}
          >
            Translate to {languageName}
          </Button>
        }
      />
    );
  };

  const filterItems = (
    <Tabs defaultActiveKey="all" onChange={(v) => setFilter(v)}>
      {['all', 'publish', 'draft', 'private', 'trash'].map((name) => {
        const count =
          name === 'all'
            ? postsPerLanguage.filter((o) => (o as any).status !== 'trash').length
            : postsPerLanguage.filter((o) => (o as any).status === name).length;
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
        onChange={(v, o: any) => setCategory(o?.taxonomy ? { taxonomy: o.taxonomy, term: v } : '')}
        allowClear
        placeholder="Select category"
      >
        {taxonomies.map((o: any) => {
          return (
            <Select.OptGroup key={o.id} label={o.title}>
              {o.terms &&
                Object.values(o.terms).map((p: any) => {
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

  if (filter === 'trash') {
    extra.push(
      <Popconfirm
        key="empty-trash"
        title="Are you sure you want to empty the trash?"
        onConfirm={handleEmptyTrash}
        okText="Yes"
        cancelText="No"
        placement="bottomRight"
        disabled={visiblePosts.length === 0}
      >
        <Button
          children={'Empty trash'}
          disabled={visiblePosts.length === 0}
          type="primary"
          danger
        />
      </Popconfirm>
    );
  } else {
    extra.push(
      <Button
        key="add"
        id="create-post"
        children="Add"
        disabled={!postType}
        onClick={() =>
          dispatch({
            type: 'SET_DIALOG',
            payload: {
              open: true,
              title: `Add ${postType.title}`,
              component: <PostForm onSubmit={handleAddPost} postTypeID={postTypeID} />,
            },
          })
        }
        type="primary"
      />
    );
  }

  const renderPost = (o: any, level: any) => {
    const slug = generateSlug({
      site: sites[siteID],
      postTypeID,
      postID: o.id,
      leadingSlash: true,
    });

    const actions = [];
    const isLocked = !!o.locked;

    const menu = (
      <Menu>
        <Menu.Item key="edit" onClick={() => navigate(slug)}>
          Edit
        </Menu.Item>

        <Menu.Item key="duplicate" onClick={() => handleDuplicatePost({ postID: o.id })}>
          Duplicate
        </Menu.Item>

        {o.status === 'trash' ? (
          <Menu.Item
            key="delete"
            danger
            onClick={() => handleDeletePost({ postID: o.id })}
            disabled={isLocked}
          >
            Delete
          </Menu.Item>
        ) : (
          <Menu.Item
            key="trash"
            danger
            onClick={() => handleTrashPost({ postID: o.id })}
            disabled={isLocked}
          >
            Trash
          </Menu.Item>
        )}
      </Menu>
    );

    actions.unshift(
      <Dropdown.Button key="menu" overlay={menu} trigger={['click']}></Dropdown.Button>
    );

    if (postTypeSupportsLanguages && o.language) {
      actions.unshift(
        <LanguageSelector
          post={o}
          onTranslate={handleTranslatePost}
          onEdit={(language: string) =>
            navigate(
              generateSlug({
                site: sites[siteID],
                postTypeID: o.postTypeID,
                postID: o.language === language ? o.id : o.translations[language],
                leadingSlash: true,
              })
            )
          }
        />
      );
    }

    let badges = [];

    if (
      sites[siteID]?.frontPage === o.id ||
      o?.translations?.[sites[siteID]?.languages?.defaultLanguage] === sites[siteID]?.frontPage
    ) {
      badges.push(<Tag key="front" children={'front'} />);
    }

    if (o.status === 'draft' || o.status === 'trash' || o.status === 'private') {
      badges.push(<Tag key="status" children={o.status} />);
    }

    if (o.seo?.metaRobotsNoindex === 'noindex') {
      badges.push(<Tag key="noindex" children="blocked" />);
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
          link={slug}
          info={isLocked && `${o.locked?.email} is currently editing`}
        />

        {o.childNodes.map((p: any) => renderPost(p, level + 1))}
      </React.Fragment>
    );
  };

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? colors.tertiary : 'transparent',
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    marginBottom: '8px',
    ...draggableStyle,
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

    const nextPosts = produce(visiblePosts, (draft: any) => {
      if (newIndex > -1 && newIndex < draft.length) {
        const temp = draft[index];
        draft[index] = draft[newIndex];
        draft[newIndex] = temp;
        draft.map((o: any, i: any) => {
          return (draft[i] = { ...o, order: i });
        });
      }
      return draft;
    });

    await postActions.reorderPosts({ siteID, postType, posts: nextPosts }, dispatch, config);
  };

  return (
    <CmsLayout pageTitle={config?.fields?.postTypes?.[postTypeID]?.title || postType?.title}>
      {!postType && (
        <Alert
          message="Unknown post type"
          description="Restart the development process or sync new data now"
          type="info"
          showIcon
          action={
            <Button size="small" type="ghost" onClick={handleSync} loading={loading === 'sync'}>
              Sync to WordPress
            </Button>
          }
        />
      )}

      {postsWithoutLanguage && renderUntranslatedPostsWarning()}

      <PageHeader title={filterItems} extra={extra} />

      {visiblePosts && (
        <Space direction="vertical" size={8}>
          {filter === 'all' && postTypeID !== 'page' ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided: any, snapshot: any) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {visiblePosts.map((o: any, i: any) => {
                      return (
                        <Draggable key={o.id} draggableId={`item-${o.id}`} index={i}>
                          {(provided: any, snapshot: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {renderPost(o, 0)}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            visiblePosts.map((o: any) => renderPost(o, 0))
          )}
        </Space>
      )}
    </CmsLayout>
  );
};

export default PostType;
