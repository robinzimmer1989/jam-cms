import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { set, get } from 'lodash';
import produce from 'immer';
import { navigate } from '@reach/router';

// import app components
import {
  getSite,
  updateSite,
  deploySite,
  syncFields,
  getUnpublishedChanges,
} from '../reducer/siteReducer';
import {
  getPost,
  addPost,
  updatePost,
  deletePost,
  duplicatePost,
  emptyTrash,
  reorderPosts,
  refreshPostLock,
  takeOverPost,
  translatePost,
} from '../reducer/postReducer';
import { addTerm, updateTerm, deleteTerm, translateTerm } from '../reducer/termReducer';
import { getSitePreview, getPostPreview } from '../reducer/previewReducer';
import {
  getLanguages,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  updateLanguageSettings,
  translateMass,
} from '../reducer/languageReducer';

import { Site, Post, Term, Config, Language, UnpublishedChange } from '../../types';
import { generateSlug } from '../../utils';

export interface Editor {
  site: Site | null;
  siteHasChanged: boolean;
  post: Post | null;
  postHasChanged: boolean;
  changeIndex: number;
}

export interface CmsState {
  config: Config | null;
  site: Site | null;
  unpublishedChanges: UnpublishedChange[];
  activeLanguage: string;
  languages: Language[];
  deploymentImage: string;
  editor: Editor;
}

const initialState: CmsState = {
  config: null,
  site: null,
  unpublishedChanges: [],
  activeLanguage: '',
  languages: [],
  deploymentImage: '',
  editor: {
    site: null,
    siteHasChanged: false,
    post: null,
    postHasChanged: false,
    changeIndex: 0,
  },
};

export const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    setConfig: (state: any, action: PayloadAction<Config>) => {
      state.config = action.payload;
    },
    setDeploymentImage: (state: any, action: PayloadAction<string>) => {
      state.deploymentImage = action.payload;
    },
    setActiveLanguage: (state: any, action: PayloadAction<string>) => {
      state.activeLanguage = action.payload;
    },
    addEditorSite: (state: any, action: PayloadAction<Site | null>) => {
      state.editor.site = action.payload;
      state.editor.siteHasChanged = false;
      state.editor.changeIndex = 0;
    },
    updateEditorSite: (state: any, action: PayloadAction<any>) => {
      state.editor.site = { ...state.editor.site, ...action.payload };
      state.editor.siteHasChanged = false;
      state.editor.changeIndex += 1;
    },
    addEditorPost: (state: any, action: PayloadAction<Post>) => {
      state.editor.post = action.payload;
      state.editor.postHasChanged = false;
      state.editor.changeIndex = 0;
    },
    updateEditorPost: (state: any, action: PayloadAction<any>) => {
      state.editor.post = { ...state.editor.post, ...action.payload };
      state.editor.postHasChanged = false;
      state.editor.changeIndex += 1;
    },
    clearEditor: (state: any) => {
      state.editor = { ...initialState.editor };
    },
  },
  extraReducers: (builder) => {
    /******************************
     * Sites
     ******************************/
    builder.addCase(getSite.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
      }
    });

    builder.addCase(updateSite.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
        state.editor.site = action.payload;
      }
    });

    builder.addCase(deploySite.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;

        if (state?.site?.deployment?.badgeImage) {
          state.deploymentImage = `${state.site.deployment.badgeImage}?v=${Math.floor(
            Math.random() * Math.floor(100)
          )}`;
        }
      }
    });

    builder.addCase(syncFields.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
      }
    });

    builder.addCase(
      getUnpublishedChanges.fulfilled,
      (state, action: PayloadAction<UnpublishedChange[]>) => {
        if (action.payload) {
          state.unpublishedChanges = action.payload;
        }
      }
    );

    /******************************
     * Posts
     ******************************/
    builder.addCase(getPost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        // Add post to post type so we can then generate the slug and the route the newly created post
        const nextSite = produce(state.site, (draft: any) => {
          return set(
            draft,
            `postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
            action.payload
          );
        });

        const slug = generateSlug({
          site: nextSite,
          postTypeID: action.payload.postTypeID,
          postID: action.payload.id,
          leadingSlash: true,
        });

        navigate(slug);
      }
    });

    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        set(
          state,
          `editor.site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        // In case the user only updates the post, the new deployment status isn't available (only for site updates), so we need to manually update the site.
        set(state, `site.deployment.undeployedChanges`, true);
      }
    });

    builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Get the term that needs to be deleted
        const post = get(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`
        );

        // In case the post has translations, we wanna loop trough them and remove the reference to the post that has been deleted
        if (post?.translations) {
          Object.keys(post.translations).map((language: string) => {
            // This is the post id of the translated post
            const postID = post.translations[language];

            delete state?.site?.postTypes[action.payload.postTypeID].posts[postID].translations[
              post.language
            ];
          });
        }

        // Finally we can remove the actual post
        delete state?.site?.postTypes[action.payload.postTypeID].posts[action.payload.id];
      }
    });

    builder.addCase(duplicatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(emptyTrash.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        action.payload.postIDs.map((id: number) => {
          // Get the post that needs to be deleted
          const post = state?.site?.postTypes[action.payload.postTypeID].posts[id];

          // In case the post has translations, we wanna loop trough them and remove the reference to the post that has been deleted
          if (post?.translations) {
            Object.keys(post.translations).map((language: string) => {
              // This is the post id of the translated post
              const postID = post.translations[language];

              delete state?.site?.postTypes[action.payload.postTypeID].posts[postID].translations[
                post.language
              ];
            });
          }

          // Finally we can remove the actual post
          delete state?.site?.postTypes[action.payload.postTypeID].posts[id];
        });
      }
    });

    builder.addCase(reorderPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      if (action.payload) {
        action.payload.map((o: Post) => {
          set(state, `site.postTypes.${o.postTypeID}.posts.${o.id}.order`, o.order);
        });
      }
    });

    builder.addCase(refreshPostLock.fulfilled, (state, action: PayloadAction<Post>) => {
      // If the property locked is set in the result, it means someone took over the post and we need to disable editing for the current user
      if (action.payload?.locked?.id) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        set(
          state,
          `editor.site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(takeOverPost.fulfilled, (state, action: PayloadAction<Post>) => {
      // If the property locked is set in the result, it means someone took over the post and we need to disable editing for the current user
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        set(
          state,
          `editor.site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(translatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        // Update translations of post
        Object.keys(action.payload.translations).map((k) => {
          set(
            state,
            `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.translations[k]}.translations.${action.payload.language}`,
            action.payload.id
          );
        });

        // Add post to post type so we can then generate the slug and the route the newly created post
        const nextSite = produce(state.site, (draft: any) => {
          return set(
            draft,
            `postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
            action.payload
          );
        });

        const slug = generateSlug({
          site: nextSite,
          postTypeID: action.payload.postTypeID,
          postID: action.payload.id,
          leadingSlash: true,
        });

        navigate(slug);
      }
    });

    /******************************
     * Terms
     ******************************/
    builder.addCase(addTerm.fulfilled, (state, action: PayloadAction<Term>) => {
      if (action.payload) {
        set(
          state,
          `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(updateTerm.fulfilled, (state, action: PayloadAction<Term>) => {
      if (action.payload) {
        set(
          state,
          `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(deleteTerm.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Get the term that needs to be deleted
        const term = get(
          state,
          `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.id}`
        );

        // In case the term has translations, we wanna loop trough them and remove the reference to the term that has been deleted
        if (term?.translations) {
          Object.keys(term.translations).map((language: string) => {
            // This is the term id of the translated term
            const termID = term.translations[language];

            delete state?.site?.taxonomies[action.payload.taxonomyID].terms[termID].translations[
              term.language
            ];
          });
        }

        // Finally we can remove the actual term
        delete state?.site?.taxonomies[action.payload.taxonomyID].terms[action.payload.id];
      }
    });

    builder.addCase(translateTerm.fulfilled, (state, action: PayloadAction<Term>) => {
      if (action.payload) {
        set(
          state,
          `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.id}`,
          action.payload
        );

        // Update translations of term
        Object.keys(action.payload.translations).map((k) => {
          set(
            state,
            `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.translations[k]}.translations.${action.payload.language}`,
            action.payload.id
          );
        });
      }
    });

    /******************************
     * Previews
     ******************************/
    builder.addCase(getSitePreview.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
      }
    });

    builder.addCase(getPostPreview.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        state.editor.post = action.payload;
      }
    });

    /******************************
     * Languages
     ******************************/
    builder.addCase(getLanguages.fulfilled, (state, action: PayloadAction<Language[]>) => {
      if (action.payload) {
        state.languages = action.payload;
      }
    });

    builder.addCase(addLanguage.fulfilled, (state, action: PayloadAction<Language[]>) => {
      if (action.payload) {
        set(state, `site.languages`, action.payload);
      }
    });

    builder.addCase(updateLanguage.fulfilled, (state, action: PayloadAction<Language[]>) => {
      if (action.payload) {
        set(state, `site.languages`, action.payload);
      }
    });

    builder.addCase(deleteLanguage.fulfilled, (state, action: PayloadAction<Language>) => {
      if (action.payload) {
        state.site?.languages?.languages?.filter((o: Language) => o.id !== action.payload.id);

        // Reset language if active language gets deleted
        if (state.activeLanguage === action.payload.slug) {
          state.activeLanguage = 'all';
        }

        // Reset default language in case user deletes it
        if (state?.site?.languages?.defaultLanguage === action.payload.slug) {
          state.site.languages.defaultLanguage = '';
        }
      }
    });

    builder.addCase(updateLanguageSettings.fulfilled, (state, action: PayloadAction<any>) => {
      if (state.site && action.payload) {
        state.site.languages = { ...state.site.languages, ...action.payload };
      }
    });

    builder.addCase(translateMass.fulfilled, (state, action: PayloadAction<any>) => {
      if (state.site && action.payload) {
        action.payload.ids.map((id: number) => {
          if (action.payload.type === 'post') {
            set(
              state,
              `site.postTypes.${action.payload.postTypeID}.posts.${id}.language`,
              action.payload.language
            );
          } else {
            set(
              state,
              `site.taxonomies.${action.payload.taxonomyID}.terms.${id}.language`,
              action.payload.language
            );
          }
        });
      }
    });
  },
});

export const {
  setConfig,
  setDeploymentImage,
  setActiveLanguage,
  addEditorSite,
  updateEditorSite,
  addEditorPost,
  updateEditorPost,
  clearEditor,
} = cmsSlice.actions;

export default cmsSlice.reducer;
