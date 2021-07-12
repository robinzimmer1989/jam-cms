import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
import axios from 'axios';
import { set } from 'lodash';

// import app components
import Loader from '../Loader';
import { formatFieldsToProps, formatTaxonomiesForEditor, getTemplateByPost } from '../../utils';
import { useStore } from '../../store';

const Editor = (props: any) => {
  const {
    pageContext: { databaseId: postID, themeOptions, siteTitle },
    defaultComponent,
    sidebarOptions,
  } = props;

  const [
    {
      config,
      authState: { authUser },
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
  ] = useStore();

  // GraphQL query result
  const [query, setQuery] = useState(null);
  const template = getTemplateByPost(post, config?.fields);
  const Component = template?.component;
  const pathname = window.location.pathname.replace(/\/$/, '');

  const isNumber = (n: any) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

  // We need to check if post is front page to return the correct basePath for pagination
  const isFrontPage = postID === sites?.[siteID]?.frontPage;

  // The pagination object will be available once we have the post id and therefore template id
  const pagination = useMemo(() => {
    let pagination = {};
    if (authUser?.capabilities?.edit_posts && template?.id === 'archive') {
      // Get the page number if exists
      const page = isNumber(pathname.substring(pathname.lastIndexOf('/') + 1))
        ? parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))
        : 1;
      const postsPerPage = config?.settings?.postsPerPage || 10;
      const numberOfPosts = Object.values(
        sites?.[siteID]?.postTypes?.[template?.postTypeID]?.posts || {}
      ).filter((o) => (o as any).status === 'publish').length;
      pagination = {
        basePath: isFrontPage ? '/' : `/${post.slug}/`,
        numberOfPosts,
        postsPerPage,
        numberOfPages: Math.ceil(numberOfPosts / postsPerPage),
        page,
      };
    }
    return pagination;
  }, [isFrontPage, template?.id, pathname]);

  // The 'true' template id is a combination of id and post type
  const templateID = `${template?.id}-${template?.postTypeID}`;

  // If there is a query, we need to wait for it
  const loaded = template?.query && !query ? false : true;
  // Load query in case post has one assigned

  useEffect(() => {
    const loadQuery = async () => {
      // TODO: Move to utils function
      const cleanedUrl = config?.source.replace(/\/+$/, '');
      const result = await axios.post(`${cleanedUrl}/graphql`, { query: template.query });
      if (result?.data) {
        setQuery(result.data);
      }
    };
    template?.query && loadQuery();
  }, [templateID]);

  const getPostData = () => {
    // Generate query variable i.e. 'wpPage'
    const nodeType = `wp${post.postTypeID.charAt(0).toUpperCase() + post.postTypeID.slice(1)}`;
    // Destructure query data in case user requested more information about post (i.e. wpPost comments)
    const { [nodeType]: nodeTypeQueryData, ...otherQueryData } = (query as any)?.data || {};
    // Generate default page data
    const data = { ...otherQueryData };
    const nodeTypeData = {
      id: post.id,
      seo: post.seo,
      title: post.title,
      date: post.createdAt,
      featuredImage: post.featuredImage,
      postTypeID: post.postTypeID,
      ...formatTaxonomiesForEditor(post, site),
    };
    data[nodeType] = { ...nodeTypeQueryData, ...nodeTypeData };
    const acfData = formatFieldsToProps({
      global: false,
      content: post.content,
      site,
      template,
    });
    if (post.postTypeID === 'page') {
      set(data, `${nodeType}.template.acf`, acfData);
    } else {
      set(data, `${nodeType}.acf`, acfData);
    }
    return data;
  };

  return (
    <>
      {postID ? (
        <>
          {loaded ? (
            <>
              {!!Component && post?.content ? (
                <Component
                  data={getPostData()}
                  pageContext={{
                    siteTitle: sites?.[siteID]?.title || siteTitle,
                    jamCMS: {
                      sidebar: {
                        ...sidebarOptions,
                      },
                    },
                    themeOptions: site?.themeOptions
                      ? formatFieldsToProps({
                          global: true,
                          themeOptions: config?.fields?.themeOptions,
                          content: site?.themeOptions,
                          site,
                          template,
                        })
                      : themeOptions,
                    pagination,
                  }}
                />
              ) : (
                <EmptyContainer className="jam-cms">
                  <Empty
                    imageStyle={{
                      height: 120,
                    }}
                    description={'No Template'}
                  />
                </EmptyContainer>
              )}
            </>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <>
          {React.cloneElement(defaultComponent, {
            pageContext: {
              pagination,
              themeOptions: formatFieldsToProps({
                themeOptions: config?.fields?.themeOptions,
                content: site?.themeOptions,
                site,
              }),
            },
          })}
        </>
      )}
    </>
  );
};
const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;
export default Editor;
