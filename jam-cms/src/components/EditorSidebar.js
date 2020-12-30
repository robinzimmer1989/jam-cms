import React from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { Space, Select as AntSelect, Checkbox, Tabs } from 'antd';
import { set } from 'lodash';

// import app components
import EditorFields from './EditorFields';
import Input from './Input';
import Select from './Select';
import Caption from './Caption';
import PostTreeSelect from './PostTreeSelect';
import MediaLibrary from './MediaLibrary';
import FilePicker from './editorFields/FilePicker';

import { useStore } from '../store';
import { generateSlug } from '../utils';
import { colors } from '../theme';

const EditorSidebar = (props) => {
  const { templates } = props;

  const [
    {
      globalOptions,
      cmsState: { sites, siteID },
      editorState: { site, post, sidebar },
    },
    dispatch,
  ] = useStore();

  const postType = sites[siteID]?.postTypes?.[post?.postTypeID];
  const posts = postType?.posts;
  const postTypeTemplates = templates?.[postType?.id];
  const template = postTypeTemplates && postTypeTemplates.find((o) => o.id === post?.template);

  // Remove own post for display in the page parent drop down
  const otherPosts = { ...posts };
  post && delete otherPosts[post.id];

  const handleChangePost = (name, value) => {
    const nextPost = produce(post, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: `UPDATE_EDITOR_POST`,
      payload: nextPost,
    });
  };

  const handleChangeSite = (name, value) => {
    const nextSite = produce(site, (draft) => set(draft, `${name}`, value));

    dispatch({
      type: `UPDATE_EDITOR_SITE`,
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
        return set(draft, `settings.${field.id}`, field);
      });

      dispatch({
        type: `UPDATE_EDITOR_SITE`,
        payload: nextSite,
      });
    } else {
      const nextPost = produce(post, (draft) => {
        return set(draft, `content.${field.id}`, field);
      });

      dispatch({
        type: `UPDATE_EDITOR_POST`,
        payload: nextPost,
      });
    }
  };

  const prepareContentFields = () => {
    const fields = template?.fields.map((o) => {
      if (o.global) {
        const globalField = globalOptions && globalOptions.find((p) => p.id === o.id);

        if (globalField) {
          return {
            global: true,
            ...globalField,
            value: site?.settings?.[o.id]?.value || null,
          };
        }
      } else {
        return { ...o, value: post?.content?.[o.id]?.value || null };
      }
    });

    return fields;
  };

  return (
    <Container>
      <TabsContainer>
        <Tabs
          activeKey={sidebar}
          onChange={(value) =>
            dispatch({
              type: `SET_EDITOR_SIDEBAR`,
              payload: value,
            })
          }
        >
          <Tabs.TabPane key={'settings'} tab={'General'} />
          <Tabs.TabPane key={'seo'} tab={'SEO'} />
          <Tabs.TabPane key={'content'} tab={'Content'} />
        </Tabs>
      </TabsContainer>

      {sidebar === 'settings' && (
        <TabContainer>
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

            {post?.id !== site?.frontPage && (
              <Input
                value={generateSlug(postType, post?.id, site?.frontPage)}
                label={'Permalink'}
                disabled
              />
            )}

            {postTypeTemplates && postTypeTemplates.length > 1 && (
              <Select
                value={post?.template}
                onChange={(value) => handleChangePost('template', value)}
                label={'Template'}
              >
                {postTypeTemplates.map((o) => (
                  <AntSelect.Option key={o.id} value={o.id} children={o.label || o.id} />
                ))}
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
                items={Object.values(otherPosts)}
                value={post?.parentID}
                onChange={(value) => handleChangePost('parentID', value)}
              />
            )}

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
                        width: 1000,
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
                children="Front Page"
              />
            )}
          </Space>
        </TabContainer>
      )}

      {sidebar === 'seo' && (
        <TabContainer>
          <Space direction="vertical" size={25}>
            <Input
              value={post?.seo?.title || ''}
              onChange={(e) => handleChangePost('seo.title', e.target.value)}
              label={'SEO Title'}
              placeholder={post?.title}
            />

            <Input
              value={post?.seo?.description || ''}
              onChange={(e) => handleChangePost('seo.description', e.target.value)}
              label={'SEO Description'}
              rows={4}
            />

            <Space direction="vertical" size={2}>
              <Caption children="Open Graph Image" />
              <FilePicker
                value={post?.seo?.ogImage}
                onRemove={() => handleSelectImage('seo.ogImage', null)}
                onClick={() =>
                  dispatch({
                    type: `SET_DIALOG`,
                    payload: {
                      open: true,
                      component: (
                        <MediaLibrary
                          onSelect={(v) => handleSelectImage('seo.ogImage', v)}
                          allow={['image']}
                        />
                      ),
                      width: 1000,
                    },
                  })
                }
              />
            </Space>
          </Space>
        </TabContainer>
      )}

      {sidebar === 'content' && (
        <EditorFields fields={prepareContentFields()} onChangeElement={handleChangeContent} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${colors.background.light};
`;

const TabsContainer = styled.div`
  .ant-tabs-nav-wrap {
    padding: 0 20px;
    height: 50px;
  }
`;

const TabContainer = styled.div`
  padding: 0 15px 30px;
`;

export default EditorSidebar;
