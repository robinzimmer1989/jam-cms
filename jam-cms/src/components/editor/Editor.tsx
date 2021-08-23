import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { set } from 'lodash';
import { Empty, Alert } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

// import app components
import Seo from '../Seo';
import ErrorFallback from '../ErrorFallback';
import useForceUpdate from '../../hooks/useForceUpdate';
import {
  formatFieldsToProps,
  formatTaxonomiesForEditor,
  getTemplateByPost,
  generateSlug,
} from '../../utils';
import { RootState, useAppSelector } from '../../redux';

// We need to store the template ID in a global variable to detect template changes.
// Using useEffect doesn't work, because a template switch will immediately render the new component with wrong props which most likely leads to an JS error.
let globalTemplateID: string = '';

const Editor = (props: any) => {
  const {
    fields,
    postID,
    pageContext: { themeOptions, siteTitle },
    defaultComponent,
    sidebarOptions,
    ...rest
  } = props;

  const {
    cms: {
      config,
      site,
      siteLoaded,
      editor: { site: editorSite, post },
    },
  } = useAppSelector((state: RootState) => state);

  // GraphQL query result
  const [query, setQuery] = useState(null);
  const [queryError, setQueryError] = useState(false as any);

  const forceUpdate = useForceUpdate();

  const template = getTemplateByPost(post, fields);
  const Component = template?.component;

  // The 'true' template id is a combination of id and post type.
  const templateID = `${template?.id}-${post?.archivePostType || post?.postTypeID}`;

  const postsPerPage = post?.archivePostsPerPage || 10;

  // We need to check if post is front page to return the correct basePath for pagination
  const isFrontPage =
    postID === site?.frontPage ||
    (editorSite?.languages?.defaultLanguage &&
      post?.translations?.[editorSite.languages.defaultLanguage] === editorSite?.frontPage);

  const pathname = window.location.pathname.replace(/\/$/, '');

  const isNumber = (n: any) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

  // The pagination object will be available once we have the post id and therefore template id
  const pagination = useMemo(() => {
    let pagination = {};

    const archivePostType = post?.archivePostType || '';

    // We can't generate the pagination object for protected pages because those don't have access to the site object and therefore not to the number of posts.
    if (template?.id === 'archive' && site?.postTypes?.[archivePostType]?.posts) {
      // Get the page number if exists
      const page = isNumber(pathname.substring(pathname.lastIndexOf('/') + 1))
        ? parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))
        : 1;

      // We only wanna query for published posts
      // And in case the post has a language assigned we wanna filter the posts accordingly
      const filteredPosts = Object.values(site?.postTypes?.[archivePostType]?.posts)
        .filter((o: any) => o.status === 'publish')
        .filter((o: any) => (post?.language ? o.language === post?.language : o));

      const numberOfPosts = filteredPosts.length;

      pagination = {
        basePath: generateSlug({
          site: editorSite,
          postTypeID: post?.postTypeID,
          postID: post?.id,
          leadingSlash: true,
          trailingSlash: true,
        }),
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

      let query = template.query;

      // We need to replace any static variables with the correct values here
      query = query.replaceAll('$language', post?.language?.toUpperCase());

      try {
        const result = await axios.post(`${cleanedUrl}/graphql`, { query });

        if (result?.data?.errors?.length) {
          setQueryError(result.data.errors);
        } else if (result?.data) {
          setQuery(result.data);
        }
      } catch (err) {
        console.log(err);
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
    const nodeType = post
      ? `wp${post.postTypeID.charAt(0).toUpperCase() + post.postTypeID.slice(1)}`
      : '';

    // Destructure query data in case user requested more information about post (i.e. wpPost comments)
    const { [nodeType]: nodeTypeQueryData, ...otherQueryData } = (query as any)?.data || {};

    // Generate default page data
    const data = { ...otherQueryData };

    const nodeTypeData = {
      id: post?.id,
      title: post?.title,
      date: post?.createdAt,
      featuredImage: post?.featuredImage,
      postTypeID: post?.postTypeID,
      ...formatTaxonomiesForEditor(post, editorSite),
    };

    data[nodeType] = { ...nodeTypeQueryData, ...nodeTypeData };

    const acfData = formatFieldsToProps({
      global: false,
      content: post?.content,
      site: editorSite,
      template,
    });

    if (post?.postTypeID === 'page') {
      set(data, `${nodeType}.template.acf`, acfData);
    } else {
      set(data, `${nodeType}.acf`, acfData);
    }

    return data;
  };

  // If there is a query, we need to wait for it.
  // We also need to wait until global and local template ID are identical to prevent an error when a user switches between two template where both have queries.
  let loaded = true;

  if (!siteLoaded || !post?.id || (template?.query && !query) || globalTemplateID !== templateID) {
    loaded = false;
  }

  const renderComponent = () => {
    const seo = { ...post?.seo };

    // Add page title if no seo title is provided
    if (!seo?.title) {
      set(seo, `title`, post?.title);
    }

    // Add site title to seo title
    // TODO: This should be based on the Yoast SEO setting in WordPress
    set(seo, `title`, `${seo.title} - ${site?.title || siteTitle}`);

    const pageContext: any = {
      siteTitle: site?.title || siteTitle,
      seo,
      pagination,
      jamCMS: {
        sidebar: {
          ...sidebarOptions,
        },
      },
      themeOptions: site?.themeOptions
        ? formatFieldsToProps({
            global: true,
            themeOptions: fields?.themeOptions,
            content: editorSite?.themeOptions,
            site: editorSite,
            template,
          })
        : themeOptions,
    };

    // Check if post type supports languages
    const postTypeSupportsLanguages = !!site?.languages?.postTypes?.find(
      (s: string) => s === post?.postTypeID
    );

    if (postTypeSupportsLanguages) {
      pageContext.language = {};
      pageContext.translations = [];

      const getLanguageParameters = (post: any) => {
        const { slug, name, locale } =
          site?.languages?.languages?.find((o: any) => o.slug === post.language) || {};

        return slug ? { slug, name, locale } : {};
      };

      // Add language information to pageContext if applicable
      if (post?.language) {
        pageContext.language = getLanguageParameters(post);
      }

      if (post?.translations) {
        Object.values(post.translations).map((id: any) => {
          const translatedPost = site?.postTypes[post.postTypeID]?.posts?.[id];

          if (translatedPost) {
            pageContext.translations.push({
              title: translatedPost.title,
              uri: generateSlug({
                site,
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
      {loaded ? (
        <>
          {queryError ? (
            <EmptyContainer className="jam-cms" alignItems={'flex-start'} textAlign={'left'}>
              <Alert
                style={{ width: '100%' }}
                message="Query failed"
                type="error"
                showIcon
                description={queryError.map((o: any) => o.message).join(', ')}
              ></Alert>
            </EmptyContainer>
          ) : (
            <>
              {!!Component && post?.content ? (
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                  {renderComponent()}
                </ErrorBoundary>
              ) : (
                <EmptyContainer className="jam-cms" alignItems={'center'} textAlign={'center'}>
                  <Empty
                    imageStyle={{
                      height: 120,
                    }}
                    description={'No Template'}
                  />
                </EmptyContainer>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Seo {...props} />

          {React.cloneElement(defaultComponent, {
            pageContext: loaded
              ? {
                  pagination,
                  themeOptions: formatFieldsToProps({
                    themeOptions: fields?.themeOptions,
                    content: editorSite?.themeOptions,
                    site: editorSite,
                  }),
                }
              : props.pageContext,
          })}
        </>
      )}
    </>
  );
};

const EmptyContainer = styled('div' as any)`
  display: flex;
  justify-content: center;
  align-items: ${({ alignItems }) => alignItems};
  height: 100vh;
  text-align: ${({ textAlign }) => textAlign};
  background: transparent;
  padding: 20px;
`;

export default Editor;
