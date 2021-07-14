import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import produce from 'immer';
import {
  Space,
  Select as AntSelect,
  Checkbox,
  Tabs,
  Button,
  Typography,
  message,
  Row,
  Dropdown,
  Empty,
  Menu,
  Popconfirm,
} from 'antd';
import { set } from 'lodash';
import { HomeOutlined, EllipsisOutlined } from '@ant-design/icons';

// import app components
import Fields from './Fields';
import Input from '../Input';
import Select from '../Select';
import Caption from '../Caption';
import PostTreeSelect from '../PostTreeSelect';
import MediaLibrary from '../MediaLibrary';
import FilePicker from '../editorFields/FilePicker';
import { postActions, siteActions, previewActions } from '../../actions';
import { useStore } from '../../store';
import { colors } from '../../theme';
import { generateSlug, getTemplateByPost, formatFieldForEditor } from '../../utils';
import getRoute from '../../routes';

const EditorSidebar = (props: any) => {
  const { editable, onToggleSidebar, ...rest } = props;
  const [
    {
      config,
      authState: { authUser },
      cmsState: { sites, siteID },
      editorState: { site, post, siteHasChanged, postHasChanged },
    },
    dispatch,
  ] = useStore();

  const { fields } = config;
  const [loading, setLoading] = useState('');
  const [sidebar, setSidebar] = useState(editable ? 'content' : 'settings');
  const [expiryDate, setExpiryDate] = useState(48);
  const [previewLink, setPreviewLink] = useState('');

  const handleChangePost = (name: string, value: any) => {
    const nextPost = produce(post, (draft: any) => {
      set(draft, `${name}`, value);
      if (name === 'template') {
        set(draft, 'content', {});
      }
      return draft;
    });
    dispatch({
      type: 'UPDATE_EDITOR_POST',
      payload: nextPost,
    });
  };

  const handleSelectRevision = async (postID: any) => {
    setLoading(postID);
    const result = await postActions.getPost({ siteID, postID }, dispatch, config);
    if (result) {
      // Update existing post with title, content, post date and revisionID.
      const { content, title, revisionID } = result;
      dispatch({
        type: 'UPDATE_EDITOR_POST',
        payload: { ...post, content, title, revisionID, siteID },
      });
    }
    setLoading('');
  };

  const handleChangeSite = (name: any, value: any) => {
    const nextSite = produce(site, (draft: any) => set(draft, `${name}`, value));
    dispatch({
      type: 'UPDATE_EDITOR_SITE',
      payload: nextSite,
    });
  };

  const handleSelectImage = (name: any, image: any) => {
    handleChangePost(name, image);
    dispatch({ type: 'CLOSE_DIALOG' });
  };

  const handleChangeContent = (field: any) => {
    if (field.global) {
      const nextSite = produce(site, (draft: any) => {
        return set(draft, `themeOptions.${field.id}`, field);
      });
      dispatch({
        type: 'UPDATE_EDITOR_SITE',
        payload: nextSite,
      });
    } else {
      const nextPost = produce(post, (draft: any) => {
        return set(draft, `content.${field.id}`, field);
      });
      dispatch({
        type: 'UPDATE_EDITOR_POST',
        payload: nextPost,
      });
    }
  };

  const handleSaveDraft = () => handleSave('draft', 'draft');

  const handlePublish = () => handleSave('publish', 'publish');

  const handleUpdate = (status: string) => handleSave('update', status);

  const handleSave = async (action: string, status: string) => {
    const { id, themeOptions, frontPage } = site;
    // Trigger dummy message to give user feedback
    if (!siteHasChanged && !postHasChanged && post.status === status) {
      return message.success('Updated successfully');
    }

    let templateObject = getTemplateByPost(post, fields);

    // Nullify template object if syncing is disabled or not in development mode
    if (config?.settings?.sync === false || process.env.NODE_ENV !== 'development') {
      templateObject = null;
    }

    setLoading(action);

    // Reset preview link so it can be regenerated.
    setPreviewLink('');

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
      // We need to generate the slug and navigate to it in case the user has changed the post name or set a new front page
      const nextPostType = produce(sites[siteID].postTypes[post.postTypeID], (draft: any) => {
        return set(draft, `posts.${post.id}`, post);
      });
      const slug = generateSlug(nextPostType, post.id, sites[siteID].frontPage, true);
      navigate(slug);
    }
  };

  const handleGeneratePreviewLink = async () => {
    const result = await previewActions.generatePreviewLink(
      { siteID, postID: post.id, expiryDate },
      dispatch,
      config
    );
    if (result) {
      setPreviewLink(result);
    }
  };

  const renderContent = () => {
    const template = getTemplateByPost(post, fields);
    // TODO: Very similar setup to utils function 'formatFieldsToProps'.
    // There might be a chance to unify the function.
    const formattedFields = template?.fields
      ? template.fields.map((o: any) => {
          let field;
          if (o.global) {
            // Use field from themeOptions (single source of truth) and add value from site state
            field = {
              ...fields?.themeOptions.find((p: any) => p.id === o.id),
              value: site?.themeOptions?.[o.id]?.value,
            };
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
    return (
      <EditorFieldsContainer>
        <Fields fields={formattedFields} onChangeElement={handleChangeContent} />
      </EditorFieldsContainer>
    );
  };

  const renderThemeSettings = () => {
    // Loop over global options (only source of truth)
    const formattedFields = fields?.themeOptions
      .filter((o: any) => !o.hide)
      .map((o: any) => {
        const formattedField = formatFieldForEditor({
          // Pass in fields from editor site state or global option itself
          field: site?.themeOptions?.[o.id] || o,
          site,
        });
        return { global: true, ...o, value: formattedField?.value };
      });
    return (
      <EditorFieldsContainer>
        <Fields fields={formattedFields} onChangeElement={handleChangeContent} />
      </EditorFieldsContainer>
    );
  };

  const renderSettings = () => {
    const postType = sites[siteID]?.postTypes?.[post?.postTypeID];
    const postTypeTemplates = fields?.postTypes?.[post?.postTypeID]?.templates;
    const postTypeTemplatesArray = postTypeTemplates
      ? Object.values(postTypeTemplates).filter((o) => (o as any).id !== 'archive')
      : [];

    // Get all templates with id 'archive'
    const archiveTemplatesArray: any = [];
    if (post?.postTypeID === 'page' && fields?.postTypes) {
      Object.values(fields?.postTypes).map(
        (o) =>
          (o as any)?.templates &&
          Object.values((o as any).templates).map(
            (p) => (p as any).id === 'archive' && archiveTemplatesArray.push(p)
          )
      );
    }

    return (
      <Content>
        <Space direction="vertical" size={20}>
          <Input
            value={post?.title || ''}
            onChange={(e: any) => handleChangePost('title', e.target.value)}
            label={'Title'}
          />

          <Input
            value={post?.id === site?.frontPage ? '/' : post?.slug || ''}
            onChange={(e: any) => handleChangePost('slug', e.target.value)}
            label={'Slug'}
            disabled={post?.id === site?.frontPage}
          />

          {(postTypeTemplatesArray.length > 1 || archiveTemplatesArray.length > 0) && (
            <Select
              value={post?.template}
              onChange={(value: any) => handleChangePost('template', value)}
              label={'Template'}
            >
              {(postTypeTemplatesArray.length > 1 || archiveTemplatesArray.length > 0) && (
                <AntSelect.OptGroup label={'Single'}>
                  {postTypeTemplatesArray.map((o) => (
                    <AntSelect.Option
                      key={(o as any).id}
                      value={(o as any).id}
                      children={(o as any).label || (o as any).id}
                    />
                  ))}
                </AntSelect.OptGroup>
              )}

              {archiveTemplatesArray.length > 0 && (
                <AntSelect.OptGroup label={'Archive'}>
                  {archiveTemplatesArray.map((o: any) => {
                    const id = `archive-${o.postTypeID}`;
                    return <AntSelect.Option key={id} value={id} children={o.label} />;
                  })}
                </AntSelect.OptGroup>
              )}
            </Select>
          )}

          <Select
            value={post?.status || ''}
            onChange={(value: any) => handleChangePost('status', value)}
            label={'Status'}
          >
            <AntSelect.Option value={'publish'} children={'Publish'} />
            <AntSelect.Option value={'draft'} children={'Draft'} />
            <AntSelect.Option value={'trash'} children={'Trash'} />
            <AntSelect.Option
              value={'private'}
              children={'Private'}
              disabled={post?.template.startsWith('archive-')}
            />
          </Select>

          {post?.postTypeID === 'page' && post.id !== site?.frontPage && (
            <PostTreeSelect
              label="Parent"
              items={Object.values(postType.posts).filter((o) => (o as any).id !== post.id)}
              value={post?.parentID}
              onChange={(value: any) => handleChangePost('parentID', value)}
            />
          )}

          {post?.taxonomies &&
            Object.keys(post.taxonomies)
              .filter((k) => !!config?.fields?.taxonomies?.find((o: any) => o.id === k))
              .map((k) => {
                const o = sites[siteID].taxonomies[k];
                return (
                  o && (
                    <Select
                      key={k}
                      onChange={(v: any) => handleChangePost(`taxonomies.${k}`, v)}
                      allowClear
                      placeholder="Select category"
                      mode="multiple"
                      label={o.title}
                      defaultValue={post.taxonomies[k]}
                    >
                      {o.terms &&
                        o.terms.map((p: any) => {
                          return <AntSelect.Option key={p.id} value={p.id} children={p.title} />;
                        })}
                    </Select>
                  )
                );
              })}

          {post?.postTypeID !== 'page' && (
            <Space direction="vertical" size={6}>
              <Caption children="Featured Image" />
              <FilePicker
                value={post?.featuredImage}
                onRemove={() => handleSelectImage('featuredImage', null)}
                onClick={() =>
                  dispatch({
                    type: `SET_DIALOG`,
                    payload: {
                      open: true,
                      title: 'Media',
                      component: (
                        <MediaLibrary
                          onSelect={(v: any) => handleSelectImage('featuredImage', v)}
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
    );
  };
  const renderSeo = () => {
    return (
      <Content>
        <Space direction="vertical" size={25}>
          <Input
            value={post?.seo?.title || ''}
            onChange={(e: any) => handleChangePost('seo.title', e.target.value)}
            label={'SEO Title'}
          />

          <Input
            value={post?.seo?.metaDesc || ''}
            onChange={(e: any) => handleChangePost('seo.metaDesc', e.target.value)}
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
                    title: 'Media',
                    component: (
                      <MediaLibrary
                        onSelect={(v: any) => handleSelectImage('seo.opengraphImage', v)}
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
    );
  };

  const renderRevisions = () => {
    return (
      <Content>
        <Space direction="vertical">
          {post?.revisions?.length > 0 ? (
            <>
              <Button
                type={!post.revisionID ? 'primary' : 'default'}
                onClick={() => !!post.revisionID && handleSelectRevision(post.id)}
                children={'Current version'}
                loading={loading === post.id}
                block
              />

              {post.revisions.map((o: any) => (
                <Button
                  key={o.id}
                  type={o.id === post.revisionID ? 'primary' : 'default'}
                  onClick={() => o.id !== post.revisionID && handleSelectRevision(o.id)}
                  children={o.title}
                  loading={loading === o.id}
                  block
                />
              ))}
            </>
          ) : (
            <Empty
              style={{ padding: 20 }}
              imageStyle={{
                height: 120,
              }}
              description={'No Revisions'}
            />
          )}
        </Space>
      </Content>
    );
  };

  const renderPreview = () => {
    return (
      <Content>
        <Space direction="vertical">
          {(siteHasChanged || postHasChanged) && (
            <Typography.Text type="secondary">
              Save the latest changes to include them in the preview.
            </Typography.Text>
          )}
          <Select
            value={expiryDate}
            onChange={(value: any) => setExpiryDate(value)}
            label={'Expiry date'}
          >
            <AntSelect.Option value={24} children={'1 Day'} />
            <AntSelect.Option value={48} children={'2 Days'} />
            <AntSelect.Option value={168} children={'1 Week'} />
            <AntSelect.Option value={720} children={'1 Month'} />
          </Select>

          {previewLink ? (
            <>
              <Button
                children="Copy to Clipboard"
                type="primary"
                onClick={() => {
                  navigator.clipboard.writeText(previewLink);
                  message.success('Copied to Clipboard');
                }}
                block
              />
              <Button
                children="Open in new tab"
                onClick={() => window.open(previewLink, '_blank')}
                type="primary"
                block
              />
            </>
          ) : (
            <Button
              children="Generate Link"
              onClick={handleGeneratePreviewLink}
              type="primary"
              block
            />
          )}
        </Space>
      </Content>
    );
  };

  return (
    <Container id="jam-cms-sidebar" sidebar={sites?.[siteID]?.editorOptions?.sidebar} {...rest}>
      <Header>
        <Row justify="space-between">
          <Space size={15}>
            <Popconfirm
              placement="rightTop"
              title="Are you sure to discard unsaved changes?"
              onConfirm={() =>
                navigate(getRoute(`collection`, { siteID, postTypeID: post?.postTypeID || 'page' }))
              }
              disabled={!postHasChanged && !siteHasChanged}
            >
              <Button
                icon={<HomeOutlined />}
                type="ghost"
                size="small"
                ghost
                onClick={() => {
                  if (!postHasChanged && !siteHasChanged) {
                    navigate(
                      getRoute(`collection`, { siteID, postTypeID: post?.postTypeID || 'page' })
                    );
                  }
                }}
              />
            </Popconfirm>
          </Space>

          <Space size={15}>
            {post?.status === 'draft' && (
              <>
                <Button
                  children="Save Draft"
                  onClick={handleSaveDraft}
                  loading={loading === 'draft'}
                  size="small"
                  ghost
                />
                <Button
                  children="Publish"
                  onClick={handlePublish}
                  loading={loading === 'publish'}
                  size="small"
                  ghost
                />
              </>
            )}

            {(post?.status === 'publish' ||
              post?.status === 'trash' ||
              post?.status === 'private') && (
              <Button
                children="Update"
                onClick={() => handleUpdate(post.status)}
                loading={loading === 'update'}
                size="small"
                ghost
              />
            )}
          </Space>
        </Row>
      </Header>

      <TabsContainer>
        <Tabs activeKey={sidebar} tabBarGutter={0} onChange={(value) => setSidebar(value)}>
          <Tabs.TabPane key={'content'} tab={'Content'} disabled={!editable} />
          <Tabs.TabPane key={'settings'} tab={'Settings'} />
          <Tabs.TabPane key={'seo'} tab={'SEO'} disabled={!editable} />
        </Tabs>

        <Dropdown
          disabled={!editable}
          overlay={
            <Menu>
              {post?.revisionsEnabled && (
                <Menu.Item key="preview" onClick={() => setSidebar('preview')}>
                  Share Preview
                </Menu.Item>
              )}
              {authUser?.capabilities?.edit_theme_options &&
                fields?.themeOptions?.filter((o: any) => !o.hide)?.length > 0 && (
                  <Menu.Item key={'theme'} onClick={() => setSidebar('theme')}>
                    Theme
                  </Menu.Item>
                )}
              {post?.revisionsEnabled && (
                <Menu.Item key="revisions" onClick={() => setSidebar('revisions')}>
                  Revisions
                </Menu.Item>
              )}
              <Menu.Item key="sidebar" onClick={onToggleSidebar}>
                Toggle Sidebar <Typography.Text keyboard>ESC</Typography.Text>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" size="middle" icon={<EllipsisOutlined />} />
        </Dropdown>
      </TabsContainer>

      <TabContainer>
        {sidebar === 'content' && renderContent()}
        {sidebar === 'settings' && renderSettings()}
        {sidebar === 'seo' && renderSeo()}
        {sidebar === 'revisions' && post?.revisionsEnabled && renderRevisions()}
        {sidebar === 'theme' && renderThemeSettings()}
        {sidebar === 'preview' && renderPreview()}
      </TabContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  left: ${({ sidebar: { position } }: any) => (position === 'left' ? 0 : 'unset')};
  right: ${({ sidebar: { position } }: any) => (position === 'left' ? 'unset' : 0)};
  top: 0;
  width: ${({ sidebar: { width } }: any) => `${width}px`};
  height: 100vh;
  background: ${colors.secondaryContrast};
  border-right: 1px solid ${colors.tertiary};
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);

  .ant-tabs > .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

const Header = styled.div`
  padding: 15px;
  background: ${colors.primary};

  button {
    &:hover {
      border-color: #fff;
      background-color: #fff !important;
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  background: #fff;

  .ant-tabs-nav-wrap {
    padding: 0 15px;
  }
`;

const TabContainer = styled.div`
  overflow: auto;
  white-space: pre-wrap;
  height: calc(100vh - 95px);
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
  padding: 15px;
  min-height: calc(100% - 46px);
`;

const EditorFieldsContainer = styled.div`
  min-height: calc(100% - 46px);
`;

export default EditorSidebar;
