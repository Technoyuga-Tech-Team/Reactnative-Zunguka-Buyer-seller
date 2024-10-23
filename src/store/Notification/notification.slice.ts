import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../types/global.types";

import { NotificationStatusState } from "../../types/notification.types";
import {
  markAllAsRead,
  readUnreadAlert,
  readUnreadNotification,
} from "./notification.thunk";

const initialState: NotificationStatusState = {
  loading: LoadingState.REMOVE,
};

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          readUnreadNotification.pending,
          readUnreadAlert.pending,
          markAllAsRead.pending
        ),
        (state) => {
          state.loading = LoadingState.CREATE;
        }
      )
      .addMatcher(
        isAnyOf(
          readUnreadNotification.fulfilled,
          readUnreadAlert.fulfilled,
          markAllAsRead.fulfilled,
          readUnreadNotification.rejected,
          readUnreadAlert.rejected,
          markAllAsRead.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export default notification.reducer;
