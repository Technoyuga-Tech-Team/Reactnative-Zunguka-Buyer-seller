import { LoadingState } from "./global.types";

export interface PaymentCardState {
  loading: LoadingState;
}

export interface GetPaymentCardDataProps {
  message: string;
  status: number;
  data: GetPaymentCardData[];
}

export interface GetPaymentCardData {
  id: string;
  object: string;
  address_city: string;
  address_country: string;
  address_line1: string;
  address_line1_check: string;
  address_line2: string;
  address_state: string;
  address_zip: string;
  address_zip_check: string;
  brand: string;
  country: string;
  customer: string;
  cvc_check: string;
  dynamic_last4: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  last4: string;
  metadata: object;
  name: string;
  tokenization_method: string;
  wallet: string;
}

export interface DeliveryAddressProps {
  message: string;
  status: number;
  data: GetDeliveryAddressData;
}
export interface GetDeliveryAddressData {
  data: DeliveryAddressDataProps[];
  totalRecords: number;
  totalPages: number;
  currentPage: string;
}
export interface DeliveryAddressDataProps {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  iso: string;
  gps_location: string;
  latitude: string;
  longitude: string;
  region: string;
  city: string;
  is_default: number;
  created_at: string;
  updated_at: string;
}
