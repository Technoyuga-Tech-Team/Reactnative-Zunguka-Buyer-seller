import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SettingsStateProps} from '../../types/settings.types';
import {UserData} from '../../types/user.types';

const initialState: SettingsStateProps = {
  isDark: true,
  userData: {
    acc_verified: 0,
    card_cvv: '',
    card_expiry: '',
    card_holder_name: '',
    card_number: '',
    card_type: '',
    created_at: '',
    email: '',
    email_verified_at: '',
    first_name: '',
    id: 0,
    is_card: 0,
    is_social: 0,
    is_verified: 0,
    last_name: '',
    otp: '',
    otp_expired_at: '',
    phone_number: '',
    profile_image: '',
    social_id: '',
    social_type: '',
    iso: '',
    purchase_item: 0,
    push_notification: 0,
    new_items: 0,
    new_message: 0,
    is_profile_completed: 0,
    steps_count: 0,
    rate: 0,
    vehicle_type: '',
    state: '',
    city: '',
    license_number: '',
    license_copies: '',
    insurance_number: '',
    insurance_copies: '',
    address_proofs: undefined,
    address: '',
    type: '',
    total_user_rate: 0,
    avg_rate: 0,
    stripe_enabled: 0,
    link: '',
  },
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    isDarkMode: (
      state: SettingsStateProps,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isDark = payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const {isDarkMode, setUserData} = settings.actions;

export default settings.reducer;
