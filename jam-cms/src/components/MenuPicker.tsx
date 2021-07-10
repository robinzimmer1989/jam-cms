import React, { useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Button, Space, Tabs, Empty } from 'antd';
import { isEmpty } from 'lodash';
// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './Input' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import Input from './Input';
// @ts-expect-error ts-migrate(6142) FIXME: Module './ListItem' was resolved to '/Users/robinz... Remove this comment to see the full error message
import ListItem from './ListItem';
import Tag from './Tag';
import { createDataTree, generateRandomString, generateSlug } from '../utils';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
const Menu = (props: any) => {
    const { onAdd } = props;
    const [{ cmsState: { sites, siteID }, },] = useStore();
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
        const slug = `/${generateSlug(postType, o.id, sites?.[siteID]?.frontPage)}`;
        let badges = [];
        if (sites?.[siteID]?.frontPage === o.id) {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            badges.push(<Tag key="front" children={'front'}/>);
        }
        if (o.status === 'draft' || o.status === 'trash') {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            badges.push(<Tag key="status" children={o.status}/>);
        }
        const actions = [];
        o.status === 'publish' &&
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            actions.push(<Button key="add" onClick={() => onAdd({
                    key: generateRandomString(),
                    title: o.title,
                    postTypeID: o.postTypeID,
                    postID: o.id,
                    children: [],
                    url: generateSlug(postType, o.id, sites?.[siteID]?.frontPage, true),
                })}>
          Add
        </Button>);
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return (<React.Fragment key={o.id}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ListItem level={level} title={o.title} subtitle={slug} status={badges} showImage={false} disabled={o.status === 'draft'} actions={actions}/>

        {o.childNodes.map((p: any) => renderPost(p, level + 1))}
      </React.Fragment>);
    };
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Tabs defaultActiveKey={filter} onChange={(v) => setFilter(v)}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tabs.TabPane key={'page'} tab={'PAGE'}/>

      {Object.values(sites[siteID]?.postTypes)
            .filter((o) => (o as any).id !== 'page')
            .map((o) => {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <Tabs.TabPane key={(o as any).id} tab={(o as any).id.toUpperCase()}/>;
        })}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Tabs.TabPane key={'link'} tab={'LINK'}/>
    </Tabs>

    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {filter === 'link' ? (<Space direction="vertical" size={20}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Input label="Title" value={link.title} onChange={(e: any) => setLink({ ...link, title: e.target.value })}/>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Input label="Url" value={link.url} onChange={(e: any) => setLink({ ...link, url: e.target.value })} placeholder="https://"/>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button style={{ marginBottom: 20 }} children={`Add`} type="primary" onClick={handleAddLink}/>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        </Space>) : (<>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {isEmpty(posts) ? (<EmptyContainer>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Empty imageStyle={{
                    height: 120,
                }}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            </EmptyContainer>) : (<Space direction="vertical" size={4}>
              {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
              {posts.filter(({ status }) => status !== 'trash').map((o) => renderPost(o, 0))}
            </Space>)}
        </>)}
    </div>
  </>;
};
const EmptyContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;
export default Menu;
