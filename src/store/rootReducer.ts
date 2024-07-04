import { combineReducers } from "@reduxjs/toolkit";
import { RootReduxState } from "../types/store.types";
import global from "../store/global/global.slice";
import settings from "../store/settings/settings.slice";
import authentication from "../store/authentication/authentication.slice";
import userProfile from "../store/userprofile/userprofile.slice";

const rootReducer = combineReducers<RootReduxState>({
  global,
  settings,
  authentication,
  userProfile,
});

export default rootReducer;
