import React, { useState } from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { Tooltip } from 'antd';
import { EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

// import app components
import { useStore } from '../store';

const LanguageSelector = (props: any) => {
  const { post, onEdit, onTranslate } = props;

  const [
    {
      cmsState: { siteID, sites },
    },
  ] = useStore();

  const [loading, setLoading] = useState('');

  const handleTranslate = async ({ id, language }: any) => {
    setLoading(language);
    await onTranslate({ id, language });
    setLoading('');
  };

  return (
    <Container>
      {sites[siteID]?.languages?.languages?.map((p: any) => {
        const flag = p.flag && Parser(p.flag);

        if (post.language === p.slug) {
          return (
            <Item key={p.id} onClick={() => onEdit(p.slug)}>
              {flag}
            </Item>
          );
        } else if (post.translations?.[p.slug]) {
          return (
            <Tooltip key={p.id} title="Edit translation" mouseEnterDelay={0.5}>
              <Item onClick={() => onEdit(p.slug)}>
                {flag}

                <IconContainer>
                  <EditTwoTone />
                </IconContainer>
              </Item>
            </Tooltip>
          );
        } else {
          const isLoading = loading === p.slug;

          return (
            <Tooltip key={p.id} title="Add translation" mouseEnterDelay={0.5}>
              <Item
                onClick={() => !isLoading && handleTranslate({ id: post.id, language: p.slug })}
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
