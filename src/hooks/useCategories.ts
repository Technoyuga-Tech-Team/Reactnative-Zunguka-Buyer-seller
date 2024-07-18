import { UseQueryOptions, useQuery } from "react-query";
import { fetch } from "../store/fetch";
import { API } from "../constant/apiEndpoints";
import { CategoriesProps } from "../types/dashboard.types";
import { QueryKeys } from "../utils/queryKeys";

export const useCategories = (
  options?: UseQueryOptions<CategoriesProps, unknown, CategoriesProps, string[]>
) => {
  return useQuery(
    [QueryKeys.CATEGORIES],
    async () => {
      const { data, errors } = await fetch<CategoriesProps>({
        url: API.GET_CATEGORIES,
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
