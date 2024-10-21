import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationState } from "../../types/authentication.types";
import {
  updateUserAddress,
  userAddress,
  userAddUserName,
  userAsGuestLogin,
  userChangePassword,
  userForgotPassword,
  userLogin,
  userOTPCode,
  userRegistration,
  userResetPassword,
  userSelfieVerification,
  userVerifyId,
} from "./authentication.thunks";
import { AuthLoadingState, LoadingState } from "../../types/global.types";

const initialState: AuthenticationState = {
  loading: LoadingState.REMOVE,
  oAuthLoading: AuthLoadingState.NULL,
};

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setOAuthLoading: (
      state: AuthenticationState,
      { payload }: PayloadAction<AuthLoadingState>
    ) => {
      state.oAuthLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          userRegistration.pending,
          userAddUserName.pending,
          userLogin.pending,
          userForgotPassword.pending,
          userChangePassword.pending,
          userOTPCode.pending,
          userResetPassword.pending,
          userAddress.pending,
          userVerifyId.pending,
          userSelfieVerification.pending,
          userAsGuestLogin.pending,
          updateUserAddress.pending
        ),
        (state) => {
          state.loading = LoadingState.CREATE;
        }
      )
      .addMatcher(
        isAnyOf(
          userLogin.fulfilled,
          userRegistration.fulfilled,
          userAddUserName.fulfilled,
          userForgotPassword.fulfilled,
          userChangePassword.fulfilled,
          userOTPCode.fulfilled,
          userResetPassword.fulfilled,
          userAddress.fulfilled,
          userVerifyId.fulfilled,
          userSelfieVerification.fulfilled,
          userAsGuestLogin.fulfilled,
          updateUserAddress.fulfilled,
          userLogin.rejected,
          userRegistration.rejected,
          userAddUserName.rejected,
          userForgotPassword.rejected,
          userChangePassword.rejected,
          userOTPCode.rejected,
          userResetPassword.rejected,
          userAddress.rejected,
          userVerifyId.rejected,
          userSelfieVerification.rejected,
          userAsGuestLogin.rejected,
          updateUserAddress.rejected
        ),
        (state) => {
          state.loading = LoadingState.REMOVE;
        }
      );
  },
});

export const { setOAuthLoading } = authentication.actions;

export default authentication.reducer;
