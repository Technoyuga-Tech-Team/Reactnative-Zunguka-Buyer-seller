import {createSelector} from '@reduxjs/toolkit';
import {RootReduxState} from '../../types/store.types';

const selectSettings = (state: RootReduxState) => state.settings;

export const isDark = createSelector(
  [selectSettings],
  settings => settings.isDark,
);

export const selectUserData = createSelector(
  [selectSettings],
  settings => settings.userData,
);
