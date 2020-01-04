import { createSelector } from 'reselect';

export const getPersistState = (state) => state._persist || {};

export const isRehydrated = createSelector(
    getPersistState,
    (state) => state.rehydrated,
);
