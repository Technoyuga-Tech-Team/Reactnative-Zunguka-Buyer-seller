import {combineReducers} from '@reduxjs/toolkit';
import {RootReduxState} from '../types/store.types';
import global from '../store/global/global.slice';
import settings from '../store/settings/settings.slice';

const rootReducer = combineReducers<RootReduxState>({
  global,
  settings,
});

export default rootReducer;
