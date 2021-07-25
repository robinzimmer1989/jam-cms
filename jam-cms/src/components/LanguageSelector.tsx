import React, { useState } from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { Link } from '@reach/router';
import { Tooltip } from 'antd';
import { EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

// import app components
import { generateSlug, translatePost } from '../utils';
import { useStore } from '../store';

const LanguageSelector = (props: any) => {
  const { post } = props;

  const [
    {
      config,
      cmsState: { siteID, sites },
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
    <Container>
      {sites[siteID]?.languages?.languages?.map((p: any) => {
        const flag = p.flag && Parser(p.flag);

        if (post.language === p.slug || post.translations?.[p.slug]) {
          return (
            <Tooltip key={p.id} title="Edit translation" mouseEnterDelay={0.5}>
              <Link
                to={generateSlug({
                  site: sites[siteID],
                  postTypeID: post.postTypeID,
                  postID: post.language === p.slug ? post.id : post.translations[p.slug],
                  leadingSlash: true,
                })}
              >
                <Item>
                  {flag}
                  <IconContainer>
                    <EditTwoTone />
                  </IconContainer>
                </Item>
              </Link>
            </Tooltip>
          );
        } else {
          const isLoading = loading === p.slug;

          return (
            <Tooltip key={p.id} title="Add translation" mouseEnterDelay={0.5}>
              <Item
                onClick={() => !isLoading && handleTranslatePost({ id: post.id, language: p.slug })}
              >
                {flag}
                <IconContainer>
                  <PlusCircleTwoTone spin={isLoading} />
                </IconContainer>
              </Item>
            </Tooltip>
          );
        }
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0 10px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

export default LanguageSelector;
