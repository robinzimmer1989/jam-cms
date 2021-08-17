import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUser } from '../../utils/auth';
import { AuthUser } from '../../types';
import { getAuthUser } from '../reducer/authReducer';

// Get 'capabilities' information from local storage to avoid unnecessary waiting to fetch user.
// Technically, someone could manipulate those values manually, but the API call for site or post afterwards would fail anyway.
const storageUser = getUser();

export interface AuthState {
  user: AuthUser;
}

const initialState: AuthState = {
  user: {
    id: null,
    email: '',
    capabilities: storageUser.capabilities || [],
    roles: [],
    jwtAuthExpiration: '',
  },
};

export const authSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthUser.fulfilled, (state, action: PayloadAction<AuthUser | null>) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
  },
});

export default authSlice.reducer;
