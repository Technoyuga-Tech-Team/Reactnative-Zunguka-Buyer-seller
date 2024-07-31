import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootReduxState } from "../../types/store.types";
import { FetchResponseError } from "../../types/fetch.types";
import { fetchAction } from "../fetch";
import { TokenPayload, TokenPayload1 } from "../../types/authentication.types";
import { API } from "../../constant/apiEndpoints";

export const AddNewCard = createAsyncThunk<
  any,
  {
    card_holder_name: string;
    card_no: string;
    exp_month: string;
    exp_year: string;
    cvv_no: string;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "payment/AddNewCard",
  async (
    { card_holder_name, card_no, exp_month, exp_year, cvv_no },
    { dispatch, rejectWithValue }
  ) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.ADD_CARD,
          method: "POST",
          data: { card_holder_name, card_no, exp_month, exp_year, cvv_no },
        },
        true
      )
    );

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);

export const deletePaymentCard = createAsyncThunk<
  any,
  {
    card_id: string;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "payment/deletePaymentCard",
  async ({ card_id }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: `${API.DELETE_CARD}/${card_id}`,
          method: "DELETE",
        },
        true
      )
    );

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);

export const MakePayment = createAsyncThunk<
  any,
  {
    mode_of_payment: "cash" | "card";
    card_id?: string;
    item_id: string | undefined;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "payment/MakePayment",
  async (
    { mode_of_payment, card_id, item_id },
    { dispatch, rejectWithValue }
  ) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.MAKE_PAYMENT,
          method: "POST",
          data: {
            mode_of_payment,
            ...(card_id && {
              card_id,
            }),
            item_id,
          },
        },
        true
      )
    );

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);

export const MakePaymentToMover = createAsyncThunk<
  any,
  {
    mode_of_payment: "cash" | "card";
    card_id: string;
    package_details_id: string;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "payment/MakePaymentToMover",
  async (
    { mode_of_payment, card_id, package_details_id },
    { dispatch, rejectWithValue }
  ) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.MAKE_PAYMENT_FOR_MOVER,
          method: "POST",
          data: {
            mode_of_payment,
            ...(card_id && {
              card_id,
            }),
            package_details_id,
          },
        },
        true
      )
    );

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);

// Delivery address
export const userDeliveryAddress = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "payment/userDeliveryAddress",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload>(
        {
          url: API.ADD_DELIVERY_ADDRESS,
          method: "POST",
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        true
      )
    );

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);

export const userUpdateDeliveryAddress = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "payment/userUpdateDeliveryAddress",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload>(
        {
          url: API.UPDATE_DELIVERY_ADDRESS,
          method: "POST",
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        true
      )
    );

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);
