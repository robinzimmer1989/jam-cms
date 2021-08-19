import { createAsyncThunk } from '@reduxjs/toolkit';

import { Post } from '../../types';
import db from '../api/rest';

export interface AddPostArgs {
  title: string;
  language?: string;
}

export const addPost = createAsyncThunk('post/add', async (args: AddPostArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('createPost', args, source);

  return response;
});

export interface GetPostArgs {
  id: number | null;
}

export const getPost = createAsyncThunk('post/get', async (args: GetPostArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  if (args.id) {
    const response = await db('getPost', args, source);
    return response;
  }
});

export interface UpdatePostArgs {
  id: number;
  archive?: boolean;
  archivePostType?: string;
  archivePostsPerPage?: number;
  postTypeID: string;
  title?: string;
  slug?: string;
  language?: string;
  status?: string;
  content?: any;
  seo?: any;
  parentID?: number;
  taxonomies?: number[];
  featuredImage?: number;
  template?: string;
  templateObject?: any;
}

export const updatePost = createAsyncThunk(
  'post/update',
  async (args: UpdatePostArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('updatePost', args, source);

    return response;
  }
);

export interface DeletePostArgs {
  id: number;
  postTypeID: string;
}

export const deletePost = createAsyncThunk(
  'post/delete',
  async (args: DeletePostArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('deletePost', args, source);

    // The response will be true on success, so we wanna pass down the args instead
    if (response) {
      return args;
    }

    return response;
  }
);

export interface EmptyTrashArgs {
  postTypeID: string;
  language?: string;
}

export const emptyTrash = createAsyncThunk(
  'post/emptyTrash',
  async (args: EmptyTrashArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('emptyTrash', args, source);

    return { postIDs: response, ...args };
  }
);

export interface DuplicatePostArgs {
  id: number;
}

export const duplicatePost = createAsyncThunk(
  'post/duplicate',
  async (args: DuplicatePostArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('duplicatePost', args, source);

    return response;
  }
);

export interface ReorderPostsArgs {
  posts: Post[];
}

export const reorderPosts = createAsyncThunk(
  'post/reorderPosts',
  async (args: ReorderPostsArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const postIDs = args.posts.reduce(
      (ac: any, a: any) => ({
        ...ac,
        [a.id]: a.order,
      }),
      {}
    );

    // We're not gonna wait until the function is completed to give the user an instant feedback
    db('reorderPosts', { postIDs }, source);

    return args.posts;
  }
);

export interface RefreshPostLockArgs {
  id: number;
}

export const refreshPostLock = createAsyncThunk(
  'post/refreshLock',
  async (args: RefreshPostLockArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('refreshPostLock', args, source);

    return response;
  }
);

export interface RemovePostLockArgs {
  id: number;
}

export const removePostLock = createAsyncThunk(
  'post/removeLock',
  async (args: RemovePostLockArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('removePostLock', args, source);

    return response;
  }
);

export interface TakeOverPostArgs {
  id: number;
}

export const takeOverPost = createAsyncThunk(
  'post/takeOverPost',
  async (args: TakeOverPostArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('takeOverPost', args, source);

    return response;
  }
);

export interface TranslatePostArgs {
  id: number;
  language: string;
}

export const translatePost = createAsyncThunk(
  'post/translate',
  async (args: TranslatePostArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('translatePost', args, source);

    return response;
  }
);
