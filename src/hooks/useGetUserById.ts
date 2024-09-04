import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { getUserData } from "../types/user.types";
import { fetch } from "../store/fetch";
import { QueryKeys } from "../utils/queryKeys";
import { API } from "../constant/apiEndpoints";

export const useGetUserById = (
  id: string,
  options?: UseQueryOptions<getUserData, unknown, getUserData, QueryKey>
) => {
  return useQuery<getUserData>(
    [QueryKeys.ME, id],
    async () => {
      const { data, errors, statusCode } = await fetch<getUserData>({
        url: `${API.ME}/${id}`,
        method: "GET",
      });

      if (errors) {
        if (statusCode === 401) {
          return null;
        }
        throw new Error(errors.message);
      }

      return data;
    },
    options
  );
};
