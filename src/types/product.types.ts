import { LoadingState } from "./global.types";
import { UserData } from "./user.types";

export type Product = {
  image: string;
  name: string;
  price: string;
};

export interface ProductState {
  loading: LoadingState;
}

export type CategoriesDataProps = {
  created_at: string;
  icon: string;
  id: number;
  parent_id: string;
  updated_at: string;
  name: string;
  title: string;
  key: string;
};
export interface CategoriesProps {
  message: string;
  status: number;
  data: categories_data_props;
}

export interface categories_data_props {
  data: CategoriesDataProps[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export type SubCategoriesDataProps = {
  created_at: string;
  icon: string;
  id: number;
  name: string;
  parent_id: string;
  updated_at: string;
  title: string;
  key: string;
};
export type SubCategoriesProps = {
  message: string;
  status: number;
  data: SubCategoriesDataProps[];
};

export interface ProductsProps {
  message: string;
  status: number;
  data: GetProductData;
}

export interface GetProductData {
  data: ProductDataProps[];
  totalRecords: number;
  totalPages: number;
  currentPage: string;
}

interface productImage {
  item_id: number;
  image: string;
}

interface productCategory {
  name: number;
}

interface brandInfo {
  id: number;
  name: string;
  icon: string;
}

export interface ProductDataProps {
  id: number;
  sale_price: number;
  user_id: number;
  title: string;
  category_id: string;
  status: string;
  added_at: string;
  images: productImage[];
  category: productCategory[];
  brand: brandInfo;
  color: string;
  condition_of_item: string;
}
export interface GetMoverDetailsDataProps {
  acc_verified: number;
  address: string;
  address_proofs: string;
  card_cvv: string;
  card_expiry: string;
  card_holder_name: string;
  card_number: string;
  card_type: string;
  city: string;
  created_at: string;
  device_token: string;
  device_type: string;
  email: string;
  email_verified_at: null;
  fcm_token: string;
  first_name: string;
  id: number;
  insurance_copies: null;
  insurance_number: null;
  is_card: number;
  is_profile_completed: number;
  is_social: number;
  is_verified: number;
  iso: string;
  last_name: string;
  license_copies: string;
  license_number: string;
  new_items: number;
  new_message: number;
  otp: string;
  otp_expired_at: string;
  phone_number: string;
  profile_image: string;
  profile_percentage: string;
  purchase_item: string;
  push_notification: string;
  rate: string | number;
  social_id: string;
  social_type: string;
  state: string;
  steps_count: number;
  type: string;
  updated_at: string;
  vehicle_type: string;
  total_user_rate: number;
  avg_rate: number;
}

export interface productImagesProps {
  id: number;
  user_id: number;
  item_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}
