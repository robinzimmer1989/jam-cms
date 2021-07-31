import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { set } from 'lodash';
import { Empty } from 'antd';

// import app components
import Loader from '../Loader';
import Seo from '../Seo';
import useForceUpdate from '../../hooks/useForceUpdate';
import {
  formatFieldsToProps,
  formatTaxonomiesForEditor,
  getTemplateByPost,
  generateSlug,
} from '../../utils';
import { useStore } from '../../store';

// We need to store the template ID in a global variable to detect template changes.
// Using useEffect doesn't work, because a template switch will immediately render the new component with wrong props.
let globalTemplateID: string = '';

const Editor = (props: any) => {
  const {
    postID,
    pageContext: { themeOptions, siteTitle },
    defaultComponent,
    sidebarOptions,
    ...rest
  } = props;

  const [
    {
      config,
      cmsState: { sites, siteID },
      editorState: { site, post },
    },
  ] = useStore();

  // GraphQL query result
  const [query, setQuery] = useState(null);

  const forceUpdate = useForceUpdate();

  const template = getTemplateByPost(post, config?.fields);
  const Component = template?.component;

  // The 'true' template id is a combination of id and post type.
  const templateID = `${template?.id}-${post?.archivePostType || post?.postTypeID}`;

  const postsPerPage = post?.archivePostsPerPage;

  // We need to check if post is front page to return the correct basePath for pagination
  const isFrontPage = postID === sites[siteID]?.frontPage;

  const pathname = window.location.pathname.replace(/\/$/, '');

  const isNumber = (n: any) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

  // The pagination object will be available once we have the post id and therefore template id
  const pagination = useMemo(() => {
    let pagination = {};

    // We can't generate the pagination object for protected pages because those don't have access to the site object and therefore not to the number of posts.
    if (template?.id === 'archive' && sites[siteID]?.postTypes?.[post?.archivePostType]?.posts) {
      // Get the page number if exists
      const page = isNumber(pathname.substring(pathname.lastIndexOf('/') + 1))
        ? parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))
        : 1;

      const numberOfPosts = Object.values(
        sites[siteID]?.postTypes?.[post?.archivePostType]?.posts
      ).filter((o: any) => o.status === 'publish').length;

      pagination = {
        basePath: isFrontPage ? '/' : `/${post.slug}/`,
        numberOfPosts,
        postsPerPage,
        numberOfPages: Math.ceil(numberOfPosts / postsPerPage),
        page,
      };
    }

    return pagination;
  }, [isFrontPage, templateID, postsPerPage, pathname]);

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

    // Update global template id
    globalTemplateID = templateID;

    if (template?.query) {
      loadQuery();
    } else {
      // If the user toggles between two templates without a query, then simply resetting the query with setQuery(null) doesn't trigger an re-render.
      // That's why we use a custom hook to mimic a state update.
      forceUpdate();
    }
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

  // If there is a query, we need to wait for it.
  // We also need to wait until global and local template ID are identical to prevent an error when a user switches between two template where both have queries.
  let loaded = true;

  if ((template?.query && !query) || globalTemplateID !== templateID) {
    loaded = false;
  }

  const renderComponent = () => {
    const pageContext: any = {
      siteTitle: sites[siteID]?.title || siteTitle,
      seo: post?.seo,
      pagination,
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
    };

    // Check if post type supports languages
    const postTypeSupportsLanguages = !!sites[siteID]?.languages?.postTypes?.find(
      (s: string) => s === post.postTypeID
    );

    if (postTypeSupportsLanguages) {
      pageContext.language = {};
      pageContext.translations = [];

      const getLanguageParameters = (post: any) => {
        const { slug, name, locale } =
          sites[siteID].languages?.languages?.find((o: any) => o.slug === post.language) || {};

        return slug ? { slug, name, locale } : {};
      };

      // Add language information to pageContext if applicable
      if (post?.language) {
        pageContext.language = getLanguageParameters(post);
      }

      if (post?.translations) {
        Object.values(post.translations).map((id: any) => {
          const translatedPost = sites[siteID].postTypes[post.postTypeID].posts[id];

          if (translatedPost) {
            pageContext.translations.push({
              title: translatedPost.title,
              uri: generateSlug({
                site: sites[siteID],
                postTypeID: post.postTypeID,
                postID: translatedPost.id,
                leadingSlash: true,
              }),
              language: getLanguageParameters(translatedPost),
            });
          }
        });
      }
    }

    return (
      <>
        <Seo {...props} pageContext={pageContext} />
        <Component {...rest} data={getPostData()} pageContext={pageContext} />
      </>
    );
  };

  return (
    <>
      {postID ? (
        <>
          {loaded ? (
            <>
              {!!Component && post?.content ? (
                renderComponent()
              ) : (
                <EmptyContainer style={{ background: 'transparent' }} className="jam-cms">
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
            <Loader text="Load Query" />
          )}
        </>
      ) : (
        <>
          <Seo {...props} />

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
