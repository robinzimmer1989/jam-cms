import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import produce from 'immer';
import { Space, Select as AntSelect, Checkbox, Tabs, Button, Typography, message, Row } from 'antd';
import { PlusOutlined as AddIcon, ArrowLeftOutlined as BackIcon } from '@ant-design/icons';
import { set } from 'lodash';

// import app components
import EditorFields from './EditorFields';
import Input from './Input';
import Select from './Select';
import Caption from './Caption';
import PostTreeSelect from './PostTreeSelect';
import PostForm from './PostForm';
import MediaLibrary from './MediaLibrary';
import FilePicker from './editorFields/FilePicker';
import { postActions, siteActions } from '../actions';
import { useStore } from '../store';
import { colors } from '../theme';
import { generateSlug, getTemplateByPost, formatFieldForEditor } from '../utils';
import getRoute from '../routes';

const EditorSidebar = (props) => {
  const { fields, hasTemplate, editable, ...rest } = props;

  const [
    {
      config,
      authState: { authUser },
      cmsState: { sites, siteID },
      editorState: { site, post, siteHasChanged, postHasChanged },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState('');
  const [sidebar, setSidebar] = useState('content');

  const postType = sites[siteID]?.postTypes?.[post?.postTypeID];
  const postTypeTemplates = fields?.postTypes?.[post?.postTypeID];
  const postTypeTemplatesArray = postTypeTemplates
    ? Object.values(postTypeTemplates).filter((o) => o.id !== 'archive')
    : [];

  // Get all templates with id 'archive'
  const archiveTemplatesArray = useMemo(() => {
    const array = [];

    if (post?.postTypeID === 'page' && fields?.postTypes) {
      Object.values(fields?.postTypes).map((o) =>
        Object.values(o).map((p) => p.id === 'archive' && array.push(p))
      );
    }

    return array;
  }, [post?.postTypeID]);

  const handleChangePost = (name, value) => {
    const nextPost = produce(post, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: 'UPDATE_EDITOR_POST',
      payload: nextPost,
    });
  };

  const handleSelectRevision = async (postID) => {
    const result = await postActions.getPost({ siteID, postID }, dispatch, config);

    if (result) {
      // Update existing post with title, content, post date and revisionID.
      const { content, title, revisionID } = result;

      dispatch({
        type: 'UPDATE_EDITOR_POST',
        payload: { ...post, content, title, revisionID, siteID },
      });
    }
  };

  const handleChangeSite = (name, value) => {
    const nextSite = produce(site, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: 'UPDATE_EDITOR_SITE',
      payload: nextSite,
    });
  };

  const handleSelectImage = (name, image) => {
    handleChangePost(name, image);

    dispatch({ type: 'CLOSE_DIALOG' });
  };

  const handleChangeContent = (field) => {
    if (field.global) {
      const nextSite = produce(site, (draft) => {
        return set(draft, `themeOptions.${field.id}`, field);
      });

      dispatch({
        type: 'UPDATE_EDITOR_SITE',
        payload: nextSite,
      });
    } else {
      const nextPost = produce(post, (draft) => {
        return set(draft, `content.${field.id}`, field);
      });

      dispatch({
        type: 'UPDATE_EDITOR_POST',
        payload: nextPost,
      });
    }
  };

  const handleSaveDraft = () => {
    handleSave('draft', 'draft');
  };

  const handlePublish = () => {
    handleSave('publish', 'publish');
  };

  const handleUpdate = (status) => {
    handleSave('update', status);
  };

  const handleSave = async (action, status) => {
    const { id, themeOptions, frontPage } = site;

    // Add template object to request, but only in development mode
    const templateObject =
      process.env.NODE_ENV === 'development' && getTemplateByPost(post, fields);

    setLoading(action);

    let postResult, siteResult;

    if (siteHasChanged) {
      siteResult = await siteActions.updateSite({ id, themeOptions, frontPage }, dispatch, config);
    }

    if (postHasChanged || action === 'publish') {
      postResult = await postActions.updatePost(
        { siteID: id, ...post, status, templateObject },
        dispatch,
        config
      );

      // In case the user only updates the post, the new deployment status isn't available (only for site updates), so we need to manually update the site.
      if (!siteHasChanged) {
        dispatch({
          type: 'ADD_SITE_SETTING',
          payload: {
            id: siteID,
            key: 'deployment.undeployedChanges',
            value: true,
          },
        });
      }
    }

    setLoading('');

    if (postResult || siteResult) {
      message.success('Updated successfully');

      // We need to generate the slug and navigate to it in case the user has changed the post name
      const nextPostType = produce(site.postTypes[post.postTypeID], (draft) => {
        return set(draft, `posts.${post.id}`, post);
      });

      const slug = generateSlug(nextPostType, post.id, site.frontPage, true);
      navigate(slug);
    }
  };

  const handleDiscard = () => {
    siteHasChanged && dispatch({ type: 'ADD_EDITOR_SITE', payload: sites[siteID] });
    postHasChanged &&
      dispatch({
        type: 'ADD_EDITOR_POST',
        payload: sites[siteID]?.postTypes?.[post?.postTypeID]?.posts?.[post.id],
      });
  };

  const handleDiscardRequest = () => {
    dispatch({
      type: 'SET_DIALOG',
      payload: {
        open: true,
        title: 'Unsaved changes',
        component: (
          <Space direction="vertical" size={20}>
            <Typography children={'There are unsaved changes. Are you sure?'} />
            <Space>
              <Button
                children="Discard changes"
                onClick={() => {
                  handleDiscard();
                  dispatch({ type: 'CLOSE_DIALOG' });
                }}
              />

              <Button
                children="Back to Editor"
                type="primary"
                onClick={() => dispatch({ type: 'CLOSE_DIALOG' })}
              />
            </Space>
          </Space>
        ),
        width: 400,
      },
    });
  };

  // TODO: Test if useMemo is too expensive here
  const contentFields = useMemo(() => {
    const template = getTemplateByPost(post, fields);

    // TODO: Very similar setup to utils function 'formatFieldsToProps'.
    // There might be a chance to unify the function.
    const formattedFields = template?.fields
      ? template.fields.map((o) => {
          let field;

          if (o.global) {
            field = site?.themeOptions?.[o.id] || fields.themeOptions.find((p) => p.id === o.id);
          } else {
            field = post?.content?.[o.id] || o;
          }

          const formattedField = formatFieldForEditor({ field, site });

          return {
            global: o.global,
            ...field,
            ...o,
            value: formattedField?.value,
          };
        })
      : [];

    return formattedFields;
  }, [site?.themeOptions, post?.content]);

  // TODO: Test if useMemo is too expensive here
  const themeFields = useMemo(() => {
    // Loop over global options (only source of truth)
    const formattedFields = fields.themeOptions
      .filter((o) => !o.hide)
      .map((o) => {
        const formattedField = formatFieldForEditor({
          // Pass in fields from editor site state or global option itself
          field: site?.themeOptions?.[o.id] || o,
          site,
        });
        return { global: true, ...o, value: formattedField?.value };
      });

    return formattedFields;
  }, [site?.themeOptions]);

  const handleAddPost = async ({ postTypeID, title, parentID }) => {
    const result = await postActions.addPost(
      { siteID, postTypeID, status: 'draft', title, parentID },
      dispatch,
      config
    );

    if (result?.id) {
      // Add post to post type so we can then generate the slug and the route the newly created post
      const nextPostType = produce(site.postTypes[postTypeID], (draft) => {
        return set(draft, `posts.${result.id}`, result);
      });
      const slug = generateSlug(nextPostType, result.id, sites?.[siteID]?.frontPage);
      navigate(`/${slug}`);
    }
  };

  return (
    <Container {...rest}>
      <Content>
        <Row justify="space-between">
          <Space>
            <Button
              icon={<BackIcon />}
              size="small"
              disabled={postHasChanged || siteHasChanged}
              onClick={() =>
                navigate(getRoute(`collection`, { siteID, postTypeID: post?.postTypeID || 'page' }))
              }
            />

            <Button
              icon={<AddIcon />}
              size="small"
              disabled={postHasChanged || siteHasChanged}
              onClick={() =>
                dispatch({
                  type: 'SET_DIALOG',
                  payload: {
                    open: true,
                    title: `Add`,
                    component: <PostForm onSubmit={handleAddPost} />,
                  },
                })
              }
            />
          </Space>

          <Space>
            {post?.status === 'draft' && (
              <>
                <Button
                  children="Save Draft"
                  onClick={handleSaveDraft}
                  loading={loading === 'draft'}
                  disabled={!postHasChanged && !siteHasChanged}
                  size="small"
                />
                <Button
                  children="Publish"
                  type="primary"
                  onClick={handlePublish}
                  loading={loading === 'publish'}
                  disabled={post.status === 'publish' && !postHasChanged && !siteHasChanged}
                  size="small"
                />
              </>
            )}

            {(post?.status === 'publish' || post?.status === 'trash') && (
              <Button
                children="Update"
                type="primary"
                onClick={() => handleUpdate(post.status)}
                loading={loading === 'update'}
                disabled={!postHasChanged && !siteHasChanged}
                size="small"
              />
            )}
          </Space>
        </Row>
      </Content>

      <TabsContainer>
        <Tabs activeKey={sidebar} tabBarGutter={0} onChange={(value) => setSidebar(value)}>
          <Tabs.TabPane key={'content'} tab={'Content'} />
          <Tabs.TabPane key={'settings'} tab={'Settings'} />
          <Tabs.TabPane key={'seo'} tab={'SEO'} />
          <Tabs.TabPane key={'revisions'} tab={'Revisions'} />
          {authUser?.capabilities?.edit_theme_options &&
            fields?.themeOptions?.filter((o) => !o.hide)?.length > 0 && (
              <Tabs.TabPane key={'theme'} tab={'Theme'} />
            )}
        </Tabs>
      </TabsContainer>

      <TabContainer>
        {sidebar === 'content' && (
          <EditorFields fields={contentFields} onChangeElement={handleChangeContent} />
        )}

        {sidebar === 'settings' && (
          <Content>
            <Space direction="vertical" size={20}>
              <Input
                value={post?.title || ''}
                onChange={(e) => handleChangePost('title', e.target.value)}
                label={'Title'}
              />

              <Input
                value={post?.id === site?.frontPage ? '/' : post?.slug || ''}
                onChange={(e) => handleChangePost('slug', e.target.value)}
                label={'Slug'}
                disabled={post?.id === site?.frontPage}
              />

              {(postTypeTemplatesArray.length > 1 || archiveTemplatesArray.length > 0) && (
                <Select
                  value={post?.template}
                  onChange={(value) => handleChangePost('template', value)}
                  label={'Template'}
                >
                  {(postTypeTemplatesArray.length > 1 || archiveTemplatesArray.length > 0) && (
                    <AntSelect.OptGroup label={'Single'}>
                      {postTypeTemplatesArray.map((o) => (
                        <AntSelect.Option key={o.id} value={o.id} children={o.label || o.id} />
                      ))}
                    </AntSelect.OptGroup>
                  )}

                  {archiveTemplatesArray.length > 0 && (
                    <AntSelect.OptGroup label={'Archive'}>
                      {archiveTemplatesArray.map((o) => {
                        const id = `archive-${o.postTypeID}`;

                        return <AntSelect.Option key={id} value={id} children={o.label} />;
                      })}
                    </AntSelect.OptGroup>
                  )}
                </Select>
              )}

              <Select
                value={post?.status || ''}
                onChange={(value) => handleChangePost('status', value)}
                label={'Status'}
              >
                <AntSelect.Option value={'publish'} children={'Publish'} />
                <AntSelect.Option value={'draft'} children={'Draft'} />
                <AntSelect.Option value={'trash'} children={'Trash'} />
              </Select>

              {post?.postTypeID === 'page' && (
                <PostTreeSelect
                  label="Parent"
                  items={Object.values(postType.posts).filter((o) => o.id !== post.id)}
                  value={post?.parentID}
                  onChange={(value) => handleChangePost('parentID', value)}
                />
              )}

              {post?.taxonomies &&
                Object.keys(post.taxonomies).map((k) => {
                  const o = sites[siteID].taxonomies[k];

                  return (
                    o && (
                      <Select
                        key={k}
                        onChange={(v) => handleChangePost(`taxonomies.${k}`, v)}
                        allowClear
                        placeholder="Select category"
                        mode="multiple"
                        label={o.title}
                        defaultValue={post.taxonomies[k]}
                      >
                        {o.terms &&
                          o.terms.map((p) => {
                            return <AntSelect.Option key={p.id} value={p.id} children={p.title} />;
                          })}
                      </Select>
                    )
                  );
                })}

              {post?.postTypeID !== 'page' && (
                <Space direction="vertical" size={2}>
                  <Caption children="Featured Image" />
                  <FilePicker
                    value={post?.featuredImage}
                    onRemove={() => handleSelectImage('featuredImage', null)}
                    onClick={() =>
                      dispatch({
                        type: `SET_DIALOG`,
                        payload: {
                          open: true,
                          component: (
                            <MediaLibrary
                              onSelect={(v) => handleSelectImage('featuredImage', v)}
                              allow={['image']}
                            />
                          ),
                          width: 1024,
                        },
                      })
                    }
                  />
                </Space>
              )}

              {post?.postTypeID === 'page' && (
                <Checkbox
                  value={post?.id}
                  checked={post?.id === site?.frontPage}
                  onChange={(e) =>
                    handleChangeSite('frontPage', e.target.checked ? e.target.value : '')
                  }
                  children="Set as Homepage"
                />
              )}
            </Space>
          </Content>
        )}

        {sidebar === 'seo' && (
          <Content>
            <Space direction="vertical" size={25}>
              <Input
                value={post?.seo?.title || ''}
                onChange={(e) => handleChangePost('seo.title', e.target.value)}
                label={'SEO Title'}
                placeholder={post?.title}
              />

              <Input
                value={post?.seo?.metaDesc || ''}
                onChange={(e) => handleChangePost('seo.metaDesc', e.target.value)}
                label={'SEO Description'}
                rows={4}
              />

              <Space direction="vertical" size={6}>
                <Caption children="Open Graph Image" />
                <FilePicker
                  value={post?.seo?.opengraphImage}
                  onRemove={() => handleSelectImage('seo.opengraphImage', null)}
                  onClick={() =>
                    dispatch({
                      type: `SET_DIALOG`,
                      payload: {
                        open: true,
                        component: (
                          <MediaLibrary
                            onSelect={(v) => handleSelectImage('seo.opengraphImage', v)}
                            allow={['image']}
                          />
                        ),
                        width: 1024,
                      },
                    })
                  }
                />
              </Space>
            </Space>
          </Content>
        )}

        {sidebar === 'revisions' && (
          <Content>
            <Space direction="vertical">
              {post?.revisions?.length > 0 && (
                <>
                  <Button
                    type={!post.revisionID ? 'primary' : 'default'}
                    onClick={() => !!post.revisionID && handleSelectRevision(post.id)}
                    children={'Current version'}
                    block
                  />

                  {post.revisions.map((o) => (
                    <Button
                      key={o.id}
                      type={o.id === post.revisionID ? 'primary' : 'default'}
                      onClick={() => o.id !== post.revisionID && handleSelectRevision(o.id)}
                      children={o.title}
                      block
                    />
                  ))}
                </>
              )}
            </Space>
          </Content>
        )}

        {sidebar === 'theme' && (
          <EditorFields fields={themeFields} onChangeElement={handleChangeContent} />
        )}

        {(postHasChanged || siteHasChanged) && (
          <InfoMessage>
            <Typography.Text type="secondary">
              All links have been deactivated to make sure nothing gets lost. Save the post or{' '}
              <span onClick={handleDiscardRequest}>reset</span> your changes.
            </Typography.Text>
          </InfoMessage>
        )}
      </TabContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 320px;
  height: 100vh;
  padding-bottom: 62px;
  background: ${colors.secondaryContrast};
  border-right: 1px solid ${colors.tertiary};
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);

  .ant-tabs > .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

const TabsContainer = styled.div`
  background: #fff;

  .ant-tabs-nav-wrap {
    padding: 0 15px;
  }
`;

const TabContainer = styled.div`
  overflow: auto;
  white-space: pre-wrap;
  height: calc(100vh - 50px - 62px);
  scrollbar-width: thin;

  &&::-webkit-scrollbar {
    width: 8px;
  }

  &&::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  &&::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${colors.tertiary};
  }
`;

const Content = styled.div`
  padding: 10px 15px;
`;

const InfoMessage = styled.div`
  width: 100%;
  padding: 15px;
  font-style: italic;

  span > span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default EditorSidebar;
