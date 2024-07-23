export type amountType = "credit" | "debit";

export type transactionDataProps = {
  status: number;
  message: string;
  data: Transaction_Data_Pagination_Props;
};

export interface Transaction_Data_Pagination_Props {
  data: transactionData[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export interface transactionData {}

export interface AddCardFormProps {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
