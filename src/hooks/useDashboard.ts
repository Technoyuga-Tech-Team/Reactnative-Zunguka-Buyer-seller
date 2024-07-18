import { UseQueryOptions, useQuery } from "react-query";
import { fetch } from "../store/fetch";
import { API } from "../constant/apiEndpoints";
import { DashboardProps } from "../types/dashboard.types";
import { QueryKeys } from "../utils/queryKeys";

export const useGetDashboard = (
  options?: UseQueryOptions<DashboardProps, unknown, DashboardProps, string[]>
) => {
  return useQuery(
    [QueryKeys.DASHBOARD],
    async () => {
      const { data, errors } = await fetch<DashboardProps>({
        url: API.GET_DASHBOARD,
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
