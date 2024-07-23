import { UseQueryOptions, useQuery } from "react-query";
import { fetch } from "../store/fetch";
import { GetPaymentCardDataProps } from "../types/payment.types";
import { QueryKeys } from "../utils/queryKeys";
import { API } from "../constant/apiEndpoints";

export const useGetPaymentCard = (
  options?: UseQueryOptions<
    GetPaymentCardDataProps,
    unknown,
    GetPaymentCardDataProps,
    string[]
  >
) => {
  return useQuery(
    [QueryKeys.PAYMENT_CARD_LIST],
    async () => {
      const { data, errors } = await fetch<GetPaymentCardDataProps>({
        url: API.LIST_CARD,
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
