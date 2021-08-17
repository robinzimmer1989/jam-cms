import { createAsyncThunk } from '@reduxjs/toolkit';

import { Post } from '../../types';
import db from '../api/db';

export interface AddPostArgs {
  title: string;
  language?: string;
}

export const addPost = createAsyncThunk('cms/addPost', async (args: AddPostArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('createPost', args, source);

  return response;
});

export interface GetPostArgs {
  id: number;
}

export const getPost = createAsyncThunk('cms/getPost', async (args: GetPostArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('getPost', args, source);

  return response;
});

export interface UpdatePostArgs {
  id: number;
  archive?: boolean;
  archivePostType?: string;
  archivePostsPerPage?: number;
  postTypeID: string;
  title: string;
  slug: string;
  language: string;
  status: string;
  content: any;
  seo: any;
  parentID: number;
  taxonomies: number[];
  featuredImage: number;
  template: string;
  templateObject: any;
}

export const updatePost = createAsyncThunk(
  'cms/updatePost',
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
  'cms/deletePost',
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
  'cms/emptyTrash',
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
  'cms/duplicatePost',
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
  'cms/reorderPosts',
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
  'cms/refreshPostLock',
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
  'cms/removePostLock',
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
  'cms/takeOverPost',
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
  'cms/translatePost',
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
