import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import produce from 'immer';
import {
  Space,
  Select as AntSelect,
  Checkbox,
  Tabs,
  Button,
  Typography,
  Tooltip,
  message,
} from 'antd';
import {
  CloseOutlined as CloseIcon,
  EditOutlined as EditIcon,
  PlusOutlined as AddIcon,
  DashboardOutlined as DashboardIcon,
} from '@ant-design/icons';
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
import { generateSlug, getTemplateByPost } from '../utils';
import getRoute from '../routes';

const EditorSidebar = (props) => {
  const { templates, hasTemplate, editable, ...rest } = props;

  const [
    {
      config,
      globalOptions,
      cmsState: { sites, siteID },
      editorState: { site, post, sidebar, siteHasChanged, postHasChanged },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState('');

  const postType = sites[siteID]?.postTypes?.[post?.postTypeID];
  const postTypeTemplates = templates?.postTypes?.[post?.postTypeID];
  const postTypeTemplatesArray = postTypeTemplates
    ? Object.values(postTypeTemplates).filter((o) => o.id !== 'archive')
    : [];

  // Get all templates with id 'archive'
  const archiveTemplatesArray = [];
  if (post?.postTypeID === 'page' && templates?.postTypes) {
    Object.values(templates?.postTypes).map((o) =>
      Object.values(o).map((p) => p.id === 'archive' && archiveTemplatesArray.push(p))
    );
  }

  const handleChangePost = (name, value) => {
    const nextPost = produce(post, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: 'UPDATE_EDITOR_POST',
      payload: nextPost,
    });
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
        return set(draft, `globalOptions.${field.id}`, field);
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
    const { id, globalOptions, frontPage } = site;

    // Add template object to request, but only in development mode
    const templateObject =
      process.env.NODE_ENV === 'development' &&
      templates?.postTypes?.[post?.postTypeID]?.[post?.template];

    setLoading(action);

    let postResult, siteResult;

    if (siteHasChanged) {
      siteResult = await siteActions.updateSite({ id, globalOptions, frontPage }, dispatch, config);
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

  const prepareContentFields = () => {
    const template = getTemplateByPost(post, templates);

    const fields = template?.fields
      ? template.fields.map((o) => {
          if (o.global) {
            const globalField = globalOptions && globalOptions.find((p) => p.id === o.id);

            if (globalField) {
              return {
                global: true,
                ...globalField,
                value: site?.globalOptions?.[o.id]?.value || null,
              };
            }
          } else {
            return { ...o, value: post?.content?.[o.id]?.value || null };
          }
        })
      : [];

    return fields;
  };

  const prepareThemeFields = () => {
    return globalOptions
      .filter((o) => !o.hide)
      .map((o) => {
        return { ...o, value: site?.globalOptions?.[o.id]?.value || null, global: true };
      });
  };

  const handleAddPost = async ({ postTypeID, title, parentID }) => {
    const result = await postActions.addPost(
      { siteID, postTypeID, status: 'draft', title, parentID },
      dispatch,
      config
    );

    if (result?.id) {
      dispatch({ type: 'SET_EDITOR_SIDEBAR', payload: 'content' });

      // Add post to post type so we can then generate the slug and the route the newly created post
      const nextPostType = produce(site.postTypes[postTypeID], (draft) => {
        return set(draft, `posts.${result.id}`, result);
      });
      const slug = generateSlug(nextPostType, result.id, sites?.[siteID]?.frontPage);
      navigate(`/${slug}`);
    }
  };

  return (
    <>
      {sidebar && (
        <Container {...rest}>
          <TabsContainer>
            <Tabs
              activeKey={sidebar}
              onChange={(value) =>
                dispatch({
                  type: 'SET_EDITOR_SIDEBAR',
                  payload: value,
                })
              }
            >
              <Tabs.TabPane key={'content'} tab={'Content'} />
              <Tabs.TabPane key={'settings'} tab={'Settings'} />
              <Tabs.TabPane key={'seo'} tab={'SEO'} />
              {globalOptions && globalOptions.filter((o) => !o.hide).length > 0 && (
                <Tabs.TabPane key={'theme'} tab={'Theme'} />
              )}
            </Tabs>
          </TabsContainer>

          <CloseButton
            icon={<CloseIcon style={{ fontSize: '11px' }} />}
            shape="circle"
            size="small"
            onClick={() =>
              dispatch({
                type: 'SET_EDITOR_SIDEBAR',
                payload: null,
              })
            }
          />

          <TabContainer>
            {sidebar === 'content' && (
              <EditorFields fields={prepareContentFields()} onChangeElement={handleChangeContent} />
            )}

            {sidebar === 'settings' && (
              <TabContent>
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
                      {postTypeTemplatesArray.length > 1 && (
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
                                return (
                                  <AntSelect.Option key={p.id} value={p.id} children={p.title} />
                                );
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
              </TabContent>
            )}

            {sidebar === 'seo' && (
              <TabContent>
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
              </TabContent>
            )}

            {sidebar === 'theme' && (
              <EditorFields fields={prepareThemeFields()} onChangeElement={handleChangeContent} />
            )}
          </TabContainer>

          <Actions>
            <Space>
              <Button
                disabled={!postHasChanged && !siteHasChanged}
                children="Reset"
                onClick={handleDiscardRequest}
                block
              />

              {post?.status === 'draft' && (
                <>
                  <Button
                    children="Save Draft"
                    onClick={handleSaveDraft}
                    loading={loading === 'draft'}
                    disabled={!postHasChanged && !siteHasChanged}
                    block
                  />
                  <Button
                    children="Publish"
                    type="primary"
                    onClick={handlePublish}
                    loading={loading === 'publish'}
                    disabled={post.status === 'publish' && !postHasChanged && !siteHasChanged}
                    block
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
                  block
                />
              )}
            </Space>
          </Actions>
        </Container>
      )}

      <Buttons>
        <Tooltip title="Dashboard" placement="right">
          <Button
            icon={<DashboardIcon />}
            type="primary"
            disabled={postHasChanged || siteHasChanged}
            onClick={() =>
              navigate(getRoute(`collection`, { siteID, postTypeID: post?.postTypeID || 'page' }))
            }
          />
        </Tooltip>

        <Tooltip title="Add" placement="right">
          <Button
            icon={<AddIcon />}
            type="primary"
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
        </Tooltip>

        <Tooltip title="Edit" placement="right">
          <Button
            icon={<EditIcon />}
            type={'primary'}
            disabled={!editable}
            onClick={() =>
              dispatch({ type: 'SET_EDITOR_SIDEBAR', payload: !!sidebar ? null : 'content' })
            }
          />
        </Tooltip>
      </Buttons>
    </>
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
    border-bottom: 1px solid ${colors.tertiary};
  }
`;

const TabsContainer = styled.div`
  background: #fff;

  .ant-tabs-nav-wrap {
    padding: 0 20px;
    height: 50px;
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

const TabContent = styled.div`
  padding: 20px 15px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 14px;
  right: 10px;
`;

const Actions = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  width: 320px;
  height: 62px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-right: 1px solid ${colors.tertiary};
  border-top: 1px solid ${colors.tertiary};

  .ant-space,
  .ant-space-item {
    flex: 1;
  }
`;

const Buttons = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  button {
    width: 40px;
    height: 40px;
    margin: 4px 0;
    border-radius: 0 2px 2px 0;
  }
`;

export default EditorSidebar;
