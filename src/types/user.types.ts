import {LoadingState} from './global.types';

export type UserRole = 'mover' | 'buyer_seller' | null;

export type UserData = {
  acc_verified: number;
  card_cvv: string;
  card_expiry: string;
  card_holder_name: string;
  card_number: string;
  card_type: string;
  created_at: string;
  email: string;
  email_verified_at: string;
  first_name: string;
  id: number;
  is_card: number;
  is_social: number;
  is_verified: number;
  last_name: string;
  otp: string;
  otp_expired_at: string;
  phone_number: string;
  profile_image: string;
  social_id: string;
  social_type: string;
  iso: string;
  purchase_item: number;
  push_notification: number;
  new_items: number;
  new_message: number;
  is_profile_completed: number;
  steps_count: number;
  rate: number;
  vehicle_type: string;
  state: string;
  city: string;
  license_number: string;
  license_copies: string;
  insurance_number: string;
  insurance_copies: string;
  address_proofs: any;
  address: string;
  type: string;
  total_user_rate: number;
  avg_rate: number;
  stripe_enabled: number;
  link: string;
};

export interface getUserData {
  message: string;
  status: number;
  user: UserData;
}

export interface GetUserDataProps {
  data: getUserData;
}

export interface UserProfileState {
  loading: LoadingState;
}
