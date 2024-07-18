// @ts-nocheck
import { UseQueryOptions, useQuery } from "react-query";
import { ProductsProps } from "../types/product.types";
import { fetch } from "../store/fetch";
import { QueryKeys } from "../utils/queryKeys";
import { API } from "../constant/apiEndpoints";

export const useGetProducts = (
  status: "my" | "all",
  offset: string,
  page: string,
  options?: UseQueryOptions<ProductsProps, unknown, ProductsProps, string[]>
) => {
  return useQuery(
    [QueryKeys.PRODUCTS, page],
    async () => {
      const { data, errors } = await fetch<ProductsProps>({
        url: `${API.GET_PRODUCTS}/${status}/${offset}/${page}`,
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
