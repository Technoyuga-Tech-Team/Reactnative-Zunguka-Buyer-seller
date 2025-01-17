import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {GlobalState} from './global.types';
import {SettingsStateProps} from './settings.types';

export interface RootReduxState {
  global: GlobalState;
  settings: SettingsStateProps;
}

export type AppDispatch = ThunkDispatch<
  RootReduxState,
  unknown,
  Action<string>
>;

export type AppThunk<T = Promise<void> | void> = ThunkAction<
  T,
  RootReduxState,
  unknown,
  Action<string>
>;
