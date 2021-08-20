import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { set, get, unionBy } from 'lodash';
import produce from 'immer';
import { navigate } from '@reach/router';

// import app components
import * as siteActions from '../actions/siteActions';
import * as postActions from '../actions/postActions';
import * as termActions from '../actions/termActions';
import * as previewActions from '../actions/previewActions';
import * as languageActions from '../actions/languageActions';
import * as userActions from '../actions/userActions';
import * as mediaActions from '../actions/mediaActions';

import {
  Site,
  Post,
  Term,
  Config,
  User,
  Language,
  UnpublishedChange,
  MediaItem,
} from '../../types';
import { generateSlug } from '../../utils';

export interface Editor {
  site: Site | null;
  siteHasChanged: boolean;
  post: Post | null;
  postHasChanged: boolean;
  changeIndex: number;
}

export interface CmsState {
  loading: string[];
  config: Config | null;
  site: Site | null;
  siteLoaded: boolean;
  siteLastFetch: number;
  unpublishedChanges: UnpublishedChange[] | null;
  activeLanguage: string;
  languages: Language[];
  deploymentImage: string;
  editor: Editor;
  users: {
    items: User[];
    page: number;
  };
  media: {
    items: MediaItem[];
    page: number;
    search: string;
  };
}

const initialState: CmsState = {
  loading: [],
  config: null,
  site: null,
  siteLoaded: false,
  siteLastFetch: 0,
  unpublishedChanges: null,
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
  users: {
    items: [],
    page: 0,
  },
  media: {
    items: [],
    page: 0,
    search: '',
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
      state.editor.siteHasChanged = true;
      state.editor.changeIndex += 1;
    },
    addEditorPost: (state: any, action: PayloadAction<Post>) => {
      state.editor.post = action.payload;
      state.editor.postHasChanged = false;
      state.editor.changeIndex = 0;
    },
    updateEditorPost: (state: any, action: PayloadAction<any>) => {
      state.editor.post = { ...state.editor.post, ...action.payload };
      state.editor.postHasChanged = true;
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
    builder.addCase(siteActions.getSite.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
        state.siteLoaded = true;
        state.siteLastFetch = Date.now();

        // Set active language if applicable
        if (!state.activeLanguage && action.payload?.languages?.defaultLanguage) {
          state.activeLanguage = action.payload?.languages?.defaultLanguage || 'all';
        }

        // Update editor site if nothing has changed
        if (!state.editor.siteHasChanged) {
          state.editor.site = action.payload;
        }
      }
    });

    builder.addCase(siteActions.updateSite.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
        state.editor.site = action.payload;
        state.editor.siteHasChanged = false;
      }
    });

    builder.addCase(siteActions.deploySite.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;

        if (state?.site?.deployment?.badgeImage) {
          state.deploymentImage = `${state.site.deployment.badgeImage}?v=${Math.floor(
            Math.random() * Math.floor(100)
          )}`;
        }
      }
    });

    builder.addCase(siteActions.syncFields.fulfilled, (state, action: PayloadAction<Site>) => {
      if (action.payload) {
        state.site = action.payload;
      }
    });

    builder.addCase(
      siteActions.getUnpublishedChanges.fulfilled,
      (state, action: PayloadAction<UnpublishedChange[]>) => {
        if (action.payload) {
          state.unpublishedChanges = action.payload;
        }
      }
    );

    /******************************
     * Posts
     ******************************/
    builder.addCase(postActions.getPost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        if (action.payload.revisionID) {
          set(state, `editor.post`, action.payload);
          set(state, `editor.postHasChanged`, true);
        } else {
          set(
            state,
            `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
            action.payload
          );

          set(state, `editor.post`, action.payload);
        }
      }
    });

    builder.addCase(postActions.addPost.fulfilled, (state, action: PayloadAction<Post>) => {
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

    builder.addCase(postActions.updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );

        state.editor.post = action.payload;

        state.editor.postHasChanged = false;

        // In case the user only updates the post, the new deployment status isn't available (only for site updates), so we need to manually update the status.
        set(state, `site.deployment.undeployedChanges`, true);
      }
    });

    builder.addCase(postActions.deletePost.fulfilled, (state, action: PayloadAction<any>) => {
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

    builder.addCase(postActions.duplicatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (action.payload) {
        set(
          state,
          `site.postTypes.${action.payload.postTypeID}.posts.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(postActions.emptyTrash.fulfilled, (state, action: PayloadAction<any>) => {
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

    builder.addCase(postActions.reorderPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      if (action.payload) {
        action.payload.map((o: Post) => {
          set(state, `site.postTypes.${o.postTypeID}.posts.${o.id}.order`, o.order);
        });
      }
    });

    builder.addCase(postActions.refreshPostLock.fulfilled, (state, action: PayloadAction<Post>) => {
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

    builder.addCase(postActions.takeOverPost.fulfilled, (state, action: PayloadAction<Post>) => {
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

    builder.addCase(postActions.translatePost.fulfilled, (state, action: PayloadAction<Post>) => {
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
    builder.addCase(termActions.addTerm.fulfilled, (state, action: PayloadAction<Term>) => {
      if (action.payload) {
        set(
          state,
          `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(termActions.updateTerm.fulfilled, (state, action: PayloadAction<Term>) => {
      if (action.payload) {
        set(
          state,
          `site.taxonomies.${action.payload.taxonomyID}.terms.${action.payload.id}`,
          action.payload
        );
      }
    });

    builder.addCase(termActions.deleteTerm.fulfilled, (state, action: PayloadAction<any>) => {
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

    builder.addCase(termActions.translateTerm.fulfilled, (state, action: PayloadAction<Term>) => {
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
     * Users
     ******************************/
    builder.addCase(userActions.addUser.fulfilled, (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.users.items = [action.payload, ...state.users.items];
      }
    });

    builder.addCase(userActions.updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.users.items = state.users.items.map((o: User) =>
          o.id === action.payload.id ? action.payload : o
        );
      }
    });

    builder.addCase(userActions.deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.users.items = state.users.items.filter((o: User) => o.id !== action.payload.id);
      }
    });

    builder.addCase(
      userActions.getUsers.fulfilled,
      (state, action: PayloadAction<{ items: User[]; page: number }>) => {
        if (action.payload) {
          state.users.items = state.users.items.concat(action.payload.items);
          state.users.page = action.payload.page;
        }
      }
    );

    /******************************
     * Media
     ******************************/
    builder.addCase(
      mediaActions.addMediaItem.fulfilled,
      (state, action: PayloadAction<MediaItem>) => {
        if (action.payload) {
          state.media.items = [action.payload, ...state.media.items];
        }
      }
    );

    builder.addCase(
      mediaActions.updateMediaItem.fulfilled,
      (state, action: PayloadAction<MediaItem>) => {
        if (action.payload) {
          state.media.items = state.media.items.map((o: MediaItem) =>
            o.id === action.payload.id ? action.payload : o
          );
        }
      }
    );

    builder.addCase(
      mediaActions.deleteMediaItem.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (action.payload) {
          state.media.items = state.media.items.filter((o: MediaItem) => o.id !== action.payload);
        }
      }
    );

    builder.addCase(
      mediaActions.getMediaItems.fulfilled,
      (state, action: PayloadAction<{ items: MediaItem[]; page: number; search: string }>) => {
        if (action.payload) {
          state.media.items =
            state.media.search === action.payload.search
              ? unionBy(state.media.items, action.payload.items, 'id')
              : action.payload.items;
          state.media.page = action.payload.page;
          state.media.search = action.payload.search;
        }
      }
    );

    /******************************
     * Previews
     ******************************/
    builder.addCase(
      previewActions.getSitePreview.fulfilled,
      (state, action: PayloadAction<Site>) => {
        if (action.payload) {
          state.site = action.payload;
          state.editor.site = action.payload;
          state.siteLoaded = true;
        }
      }
    );

    builder.addCase(
      previewActions.getPostPreview.fulfilled,
      (state, action: PayloadAction<Post>) => {
        if (action.payload) {
          state.editor.post = action.payload;
        }
      }
    );

    /******************************
     * Languages
     ******************************/
    builder.addCase(
      languageActions.getLanguages.fulfilled,
      (state, action: PayloadAction<Language[]>) => {
        if (action.payload) {
          state.languages = action.payload;
        }
      }
    );

    builder.addCase(
      languageActions.addLanguage.fulfilled,
      (state, action: PayloadAction<Language[]>) => {
        if (action.payload) {
          set(state, `site.languages`, action.payload);
        }
      }
    );

    builder.addCase(
      languageActions.updateLanguage.fulfilled,
      (state, action: PayloadAction<Language[]>) => {
        if (action.payload) {
          set(state, `site.languages`, action.payload);
        }
      }
    );

    builder.addCase(
      languageActions.deleteLanguage.fulfilled,
      (state, action: PayloadAction<number | boolean>) => {
        if (action.payload && state.site?.languages?.languages) {
          // Get language from state
          const language = state.site.languages.languages.find(
            (o: Language) => o.id !== action.payload
          );

          // Remove language
          state.site.languages.languages = state.site.languages.languages.filter(
            (o: Language) => o.id !== action.payload
          );

          // Reset language if active language gets deleted
          if (state.activeLanguage === language?.slug) {
            state.activeLanguage = 'all';
          }

          // Reset default language in case user deletes it
          if (
            state?.site?.languages?.defaultLanguage &&
            state.site.languages.defaultLanguage === language?.slug
          ) {
            state.site.languages.defaultLanguage = '';
          }
        }
      }
    );

    builder.addCase(
      languageActions.updateLanguageSettings.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (state.site && action.payload) {
          state.site.languages = { ...state.site.languages, ...action.payload };
        }
      }
    );

    builder.addCase(
      languageActions.translateMass.fulfilled,
      (state, action: PayloadAction<any>) => {
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
      }
    );
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
