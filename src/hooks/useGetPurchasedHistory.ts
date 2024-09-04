import { UseQueryOptions, useQuery } from "react-query";
import { fetch } from "../store/fetch";
import { GetPurchasedHistoryProps } from "../types/product.types";
import { QueryKeys } from "../utils/queryKeys";
import { API } from "../constant/apiEndpoints";

export const useGetPurchasedHistory = (
  page: string,
  options?: UseQueryOptions<
    GetPurchasedHistoryProps,
    unknown,
    GetPurchasedHistoryProps,
    string[]
  >
) => {
  return useQuery(
    [QueryKeys.PURCHASED_PRODUCTS],
    async () => {
      const { data, errors } = await fetch<GetPurchasedHistoryProps>({
        url: `${API.GET_PURCHASED_PRODUCTS}/${10}/${page}`,
        method: "GET",
      });

      if (errors) {
        throw new Error(errors.message);
      }

      return data;
    },
    options
  );
};
