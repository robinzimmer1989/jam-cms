import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Space, Tabs, Empty } from 'antd';
import { isEmpty } from 'lodash';

// import app components
import Input from './Input';
import ListItem from './ListItem';
import Tag from './Tag';
import { createDataTree, generateRandomString, generateSlug } from '../utils';
import { useStore } from '../store';

const Menu = (props: any) => {
  const { onAdd } = props;
  const [
    {
      cmsState: { sites, siteID },
    },
  ] = useStore();

  const [filter, setFilter] = useState('page');
  const [link, setLink] = useState({ title: '', url: '' });

  // Get posts by filter
  const postType = sites[siteID]?.postTypes?.[filter];
  let posts = postType?.posts ? Object.values(postType.posts) : [];

  // Sort posts by menu order
  posts = posts.sort((a, b) => ((a as any).order > (b as any).order ? 1 : -1));

  // Create data tree
  posts = createDataTree(posts);

  const handleAddLink = () => {
    if (!link.title || !link.url) {
      return;
    }
    onAdd({
      key: generateRandomString(),
      ...link,
      postTypeID: null,
      postID: null,
      children: [],
    });
    setLink({ title: '', url: '' });
  };

  const renderPost = (o: any, level: any) => {
    const slug = generateSlug({
      site: sites[siteID],
      postTypeID: postType.id,
      postID: o.id,
      leadingSlash: true,
    });

    let badges = [];
    if (
      sites[siteID]?.frontPage === o.id ||
      o?.translations?.[sites[siteID]?.languages?.defaultLanguage] === sites[siteID]?.frontPage
    ) {
      badges.push(<Tag key="front" children={'front'} />);
    }
    if (o.status === 'draft' || o.status === 'trash') {
      badges.push(<Tag key="status" children={o.status} />);
    }
    const actions = [];
    o.status === 'publish' &&
      actions.push(
        <Button
          key="add"
          onClick={() =>
            onAdd({
              key: generateRandomString(),
              title: o.title,
              postTypeID: o.postTypeID,
              postID: o.id,
              children: [],
              url: generateSlug({
                site: sites[siteID],
                postTypeID: postType.id,
                postID: o.id,
                leadingSlash: true,
              }),
            })
          }
        >
          Add
        </Button>
      );
    return (
      <React.Fragment key={o.id}>
        <ListItem
          level={level}
          title={o.title}
          subtitle={slug}
          status={badges}
          showImage={false}
          disabled={o.status === 'draft'}
          actions={actions}
        />

        {o.childNodes.map((p: any) => renderPost(p, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <>
      <Tabs defaultActiveKey={filter} onChange={(v) => setFilter(v)}>
        <Tabs.TabPane key={'page'} tab={'PAGE'} />

        {Object.values(sites[siteID]?.postTypes)
          .filter((o) => (o as any).id !== 'page')
          .map((o) => {
            return <Tabs.TabPane key={(o as any).id} tab={(o as any).id.toUpperCase()} />;
          })}

        <Tabs.TabPane key={'link'} tab={'LINK'} />
      </Tabs>

      <div>
        {filter === 'link' ? (
          <Space direction="vertical" size={20}>
            <Input
              label="Title"
              value={link.title}
              onChange={(e: any) => setLink({ ...link, title: e.target.value })}
            />
            <Input
              label="Url"
              value={link.url}
              onChange={(e: any) => setLink({ ...link, url: e.target.value })}
              placeholder="https://"
            />
            <Button
              style={{ marginBottom: 20 }}
              children={`Add`}
              type="primary"
              onClick={handleAddLink}
            />
          </Space>
        ) : (
          <>
            {isEmpty(posts) ? (
              <EmptyContainer>
                <Empty
                  imageStyle={{
                    height: 120,
                  }}
                />
              </EmptyContainer>
            ) : (
              <Space direction="vertical" size={4}>
                {posts.filter((o: any) => o.status !== 'trash').map((p: any) => renderPost(p, 0))}
              </Space>
            )}
          </>
        )}
      </div>
    </>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export default Menu;
