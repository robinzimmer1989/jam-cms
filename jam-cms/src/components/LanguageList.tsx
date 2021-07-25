import React, { useState } from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { Link } from '@reach/router';
import { Space, Tooltip, List, Button, Typography } from 'antd';
import { EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

// import app components
import Caption from './Caption';
import { generateSlug, translatePost } from '../utils';
import { useStore } from '../store';

const LanguageList = (props: any) => {
  const { post } = props;

  const [
    {
      config,
      cmsState: { siteID, sites },
      editorState: { postHasChanged },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState('');

  const handleTranslatePost = async ({ id, language }: any) => {
    setLoading(language);
    await translatePost({ sites, siteID, id, language }, dispatch, config);
    setLoading('');
  };

  return (
    <>
      <Space direction="vertical" size={20}>
        <Space direction="vertical" size={6}>
          <Caption children="Language" />
          <List
            itemLayout="vertical"
            size="small"
            bordered
            dataSource={[post]}
            renderItem={(item: any) => {
              const language = sites[siteID]?.languages?.languages?.find(
                (p: any) => p.slug === item.language
              );

              return (
                <List.Item key={item.id}>
                  <Space>
                    <IconContainer children={language.flag && Parser(language.flag)} />
                    {item.title}
                  </Space>
                </List.Item>
              );
            }}
          />
        </Space>
        <Space direction="vertical" size={6}>
          <Caption children="Translations" />
          {postHasChanged && (
            <Typography children="Links have been disabled. Pleaes save your post to continue." />
          )}
          <List
            itemLayout="vertical"
            size="small"
            bordered
            dataSource={sites[siteID]?.languages?.languages?.filter(
              (p: any) => p.slug !== post.language
            )}
            renderItem={(language: any) => {
              let icon = null;
              let title = '';

              if (post.translations?.[language.slug]) {
                icon = (
                  <Tooltip title="Edit translation" placement="left">
                    <Link
                      to={generateSlug({
                        site: sites[siteID],
                        postTypeID: post.postTypeID,
                        postID: post.translations[language.slug],
                        leadingSlash: true,
                      })}
                    >
                      <Button
                        type="text"
                        shape="circle"
                        icon={<EditTwoTone />}
                        disabled={postHasChanged}
                      />
                    </Link>
                  </Tooltip>
                );

                title =
                  sites[siteID].postTypes?.[post?.postTypeID]?.posts?.[
                    post.translations?.[language.slug]
                  ]?.title;
              } else {
                const isLoading = loading === language.slug;

                icon = (
                  <Tooltip title="Add translation" placement="left">
                    <Button
                      type="text"
                      shape="circle"
                      icon={<PlusCircleTwoTone spin={isLoading} />}
                      disabled={postHasChanged}
                      onClick={() =>
                        !isLoading && handleTranslatePost({ id: post.id, language: language.slug })
                      }
                    />
                  </Tooltip>
                );
              }

              return (
                <List.Item key={language.id} extra={<IconContainer children={icon} />}>
                  <Space>
                    <IconContainer children={language.flag && Parser(language.flag)} />
                    {title}
                  </Space>
                </List.Item>
              );
            }}
          />
        </Space>
      </Space>
    </>
  );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  width: 22px;
`;

export default LanguageList;
