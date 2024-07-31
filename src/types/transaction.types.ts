import { ProductDataProps } from "./product.types";

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

export interface transactionData {
  id: number;
  user_id: number;
  seller_id: number;
  mover_id: number;
  item_id: number;
  mode_of_payment: string;
  mode_of_delivery: string;
  delivery_price: number;
  pickup_point: string;
  deivery_point: string;
  order_id: number;
  created_at: string;
  updated_at: string;
  pickup_lat: string;
  pickup_long: string;
  delivery_lat: string;
  delivery_long: string;
  status: string;
  amount: number;
  type: string;
  transaction_data: null;
  transaction_type: "buy" | "sell";
  item: ProductDataProps;
}

export interface AddCardFormProps {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
