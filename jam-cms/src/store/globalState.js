import produce from 'immer';

export const globalReducer = (state, action) => {
  const { payload } = action;

  return produce(state, (draft) => {
    switch (action.type) {
      default:
    }
  });
};
