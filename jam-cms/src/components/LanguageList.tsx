import React, { useState } from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { navigate } from '@reach/router';
import { Space, Tooltip, List, Button, Popconfirm, Select as AntSelect } from 'antd';
import { EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

// import app components
import Caption from './Caption';
import Select from './Select';
import { generateSlug } from '../utils';
import { RootState, useAppDispatch, useAppSelector } from '../redux';
import { postActions } from '../redux';

const LanguageList = (props: any) => {
  const { onChange } = props;

  const {
    cms: {
      site,
      editor: { post, postHasChanged, siteHasChanged },
    },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [loading, setLoading] = useState('');

  const handleTranslatePost = async ({ id, language }: any) => {
    setLoading(language);
    dispatch(postActions.translatePost({ id, language }));
    setLoading('');
  };

  return (
    <>
      <Space direction="vertical" size={20}>
        <Select label="Language" value={post?.language || 'none'} onChange={onChange}>
          {!post?.language && <AntSelect.Option value="none">Select...</AntSelect.Option>}

          {site?.languages?.languages?.map((o: any) => (
            <AntSelect.Option key={o.id} value={o.slug} children={o.name} />
          ))}
        </Select>

        {post?.language && (
          <Space direction="vertical" size={6}>
            <Caption children="Translations" />
            <List
              itemLayout="vertical"
              size="small"
              bordered
              dataSource={site?.languages?.languages?.filter((p: any) => p.slug !== post?.language)}
              renderItem={(language: any) => {
                let icon = null;
                let onClick = () => {};
                let tooltip = '';
                let title = '';

                if (post?.translations?.[language.slug]) {
                  tooltip = 'Edit translation';
                  icon = <EditTwoTone />;
                  onClick = () =>
                    navigate(
                      generateSlug({
                        site: site,
                        postTypeID: post.postTypeID,
                        postID: post.translations[language.slug],
                        leadingSlash: true,
                      })
                    );
                  title =
                    site?.postTypes?.[post?.postTypeID]?.posts?.[
                      post?.translations?.[language.slug]
                    ]?.title;
                } else {
                  const isLoading = loading === language.slug;

                  tooltip = 'Add translation';
                  icon = <PlusCircleTwoTone spin={isLoading} />;
                  onClick = () =>
                    !isLoading && handleTranslatePost({ id: post.id, language: language.slug });
                }

                return (
                  <Popconfirm
                    placement="bottomRight"
                    title="Discard unsaved changes?"
                    onConfirm={onClick}
                    disabled={!postHasChanged && !siteHasChanged}
                  >
                    <List.Item
                      key={language.id}
                      extra={
                        <IconContainer>
                          <Tooltip title={tooltip} placement="left">
                            <Button
                              type="text"
                              shape="circle"
                              icon={icon}
                              onClick={() => !postHasChanged && !siteHasChanged && onClick()}
                            />
                          </Tooltip>
                        </IconContainer>
                      }
                    >
                      <Space>
                        <IconContainer children={language.flag && Parser(language.flag)} />
                        {title}
                      </Space>
                    </List.Item>
                  </Popconfirm>
                );
              }}
            />
          </Space>
        )}
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
