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

export const editProductForSell = createAsyncThunk<
  any,
  {
    formData: FormData;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/editProductForSell",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.EDIT_PRODUCT_FOR_SELL,
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
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
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

export const addRatingForItem = createAsyncThunk<
  any,
  {
    item_id: string;
    rate: number;
    rate_message: string;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/add-buyer-rating",
  async ({ item_id, rate, rate_message }, { dispatch, rejectWithValue }) => {
    console.log("item_id, rate, rate_message", item_id, rate, rate_message);

    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.RATE_ITEM_BY_BUYER,
          method: "POST",
          data: {
            item_id,
            rate: Number(rate),
            rate_message,
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

export const updateBuyerRatingStatus = createAsyncThunk<
  any,
  {
    item_id: string;
    status: boolean;
  },
  { state: RootReduxState; rejectValue: FetchResponseError }
>(
  "product/update-buyer-seller-rating-status",
  async ({ item_id, status }, { dispatch, rejectWithValue }) => {
    const { errors, data } = await dispatch(
      fetchAction<TokenPayload1>(
        {
          url: API.UPDATE_BUYER_RATING_STATUS,
          method: "POST",
          data: {
            item_id,
            status,
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
