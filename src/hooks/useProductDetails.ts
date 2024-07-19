// @ts-nocheck
import { UseQueryOptions, useQuery } from "react-query";
import { ProductsDetailsProps } from "../types/product.types";
import { fetch } from "../store/fetch";
import { QueryKeys } from "../utils/queryKeys";
import { API } from "../constant/apiEndpoints";

export const useProductDetails = (
  itemId: number,
  options?: UseQueryOptions<
    ProductsDetailsProps,
    unknown,
    ProductsDetailsProps,
    string[]
  >
) => {
  return useQuery(
    [QueryKeys.PRODUCT_DETAILS, itemId],
    async () => {
      const { data, errors } = await fetch<ProductsDetailsProps>({
        url: `${API.GET_PRODUCT_DETAILS}${itemId}`,
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
