import { UseQueryOptions, useQuery } from "react-query";
import { fetch } from "../store/fetch";
import { API } from "../constant/apiEndpoints";
import { BrandsProps } from "../types/dashboard.types";
import { QueryKeys } from "../utils/queryKeys";

export const useBrands = (
  category_ID: string,
  options?: UseQueryOptions<BrandsProps, unknown, BrandsProps, string[]>
) => {
  return useQuery(
    [QueryKeys.BRANDS, category_ID],
    async () => {
      const { data, errors } = await fetch<BrandsProps>({
        url: `${API.GET_BRANDS}/${category_ID}`,
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
