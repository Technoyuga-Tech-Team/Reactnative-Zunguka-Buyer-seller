import { createAsyncThunk } from "@reduxjs/toolkit";
import { TokenPayload1 } from "../../types/authentication.types";
import { RootReduxState } from "../../types/store.types";
import { FetchResponseError } from "../../types/fetch.types";
import { fetchAction } from "../fetch";
import { API } from "../../constant/apiEndpoints";

export const addProductForSell = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/addProductForSell",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.ADD_PRODUCT_FOR_SELL,
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

export const addProductSearchFilter = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/productSearchFilter",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.GET_SEARCH_FILTER_ITEM,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
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

export const likeDislikeProduct = createAsyncThunk<
  any,
  {
    item_id: number | undefined;
    type: string;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/likeDislikeProduct",
  async ({ item_id, type }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.LIKE_DISLIKE_PRODUCT,
          method: "POST",
          data: { item_id, type },
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
export const deleteProduct = createAsyncThunk<
  any,
  {
    id: number | undefined;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>("product/deleteProduct", async ({ id }, { dispatch, rejectWithValue }) => {
  const { errors, data } = await dispatch(
    fetchAction<TokenPayload1>(
      {
        url: `${API.DELETE_PRODUCT}/${id}`,
        method: "DELETE",
      },
      true
    )
  );

  if (errors) {
    return rejectWithValue(errors);
  }

  return data;
});

export const sendTheMessage = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/sendTheMessage",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.SEND_MESSAGE,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
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

export const publishUnpublishProduct = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/publishUnpublishProduct",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.STAR_STOP_PUBLISH_PRODUCT,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
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

export const sendRequestToNearbyMovers = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/sendRequestToNearbyMovers",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.SEND_REQUEST_TO_NEARBY_MOVERS,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
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
