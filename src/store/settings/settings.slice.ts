import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsStateProps } from "../../types/settings.types";
import { UserData } from "../../types/user.types";
import { ChatDataList } from "../../types/chat.types";

const initialState: SettingsStateProps = {
  isDark: true,
  userData: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    social_type: "",
    social_id: "",
    is_social: 0,
    email_verified_at: "",
    profile_image: "",
    otp: "",
    otp_expired_at: "",
    is_verified: 0,
    card_number: "",
    card_type: "",
    card_cvv: "",
    card_expiry: "",
    card_holder_name: "",
    is_card: 0,
    push_notification: 0,
    new_message: 0,
    new_items: 0,
    purchase_item: 0,
    created_at: "",
    updated_at: "",
    acc_verified: 0,
    iso: "",
    type: "",
    is_profile_completed: 0,
    step: 0,
    profile_percentage: 0,
    address: "",
    insurance_number: "",
    insurance_copies: "",
    address_proofs: "",
    license_number: "",
    license_copies: "",
    vehicle_type: "",
    city: "",
    rate: 0,
    avg_rate: 0,
    total_user_rate: 0,
    device_type: "",
    device_token: "",
    fcm_token: "",
    customer_id: "",
    latitude: "",
    longitude: "",
    is_blocked_by_admin: 0,
    online: 0,
    stripe_account_id: "",
    apple_secret: "",
    stripe_enabled: 0,
    house_images: "",
    street_address_1: "",
    street_address_2: "",
    country: "",
    zip_code: "",
    kyc_documents: "",
    id_type: null,
    is_kyc_verified_by_admin: 0,
    selfie_image: "",
    is_selfie_uploaded: 0,
    total_earning: 0,
    sector: "",
    all_documentation_approved_by_admin: 0,
  },
  errorFromSocial: false,
  address: "",
  city: "",
  notificationCount: 0,
  productInfo: null,
  selectedDeliveryAddress: null,
  latlng: { lat: 0, lng: 0 },
  isNewPackageDelivered: 0,
  moverInfo: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    social_type: "",
    social_id: "",
    is_social: 0,
    email_verified_at: "",
    profile_image: "",
    otp: "",
    otp_expired_at: "",
    is_verified: 0,
    card_number: "",
    card_type: "",
    card_cvv: "",
    card_expiry: "",
    card_holder_name: "",
    is_card: 0,
    push_notification: 0,
    new_message: 0,
    new_items: 0,
    purchase_item: 0,
    created_at: "",
    updated_at: "",
    acc_verified: 0,
    iso: "",
    type: "",
    is_profile_completed: 0,
    step: 0,
    profile_percentage: 0,
    address: "",
    insurance_number: "",
    insurance_copies: "",
    address_proofs: "",
    license_number: "",
    license_copies: "",
    vehicle_type: "",
    city: "",
    rate: 0,
    avg_rate: 0,
    total_user_rate: 0,
    device_type: "",
    device_token: "",
    fcm_token: "",
    customer_id: "",
    latitude: "",
    longitude: "",
    is_blocked_by_admin: 0,
    online: 0,
    stripe_account_id: "",
    apple_secret: "",
    stripe_enabled: 0,
    house_images: "",
    street_address_1: "",
    street_address_2: "",
    country: "",
    zip_code: "",
    kyc_documents: "",
    id_type: null,
    is_kyc_verified_by_admin: 0,
    selfie_image: "",
    is_selfie_uploaded: 0,
    total_earning: 0,
    sector: "",
    all_documentation_approved_by_admin: 0,
  },
  closedItem: [],
  messagingData: [],
  unread_count: 0,
  unread_alert_count: 0,
  searchValueforCategory: "",
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    isDarkMode: (
      state: SettingsStateProps,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isDark = payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setErrorFromSocial: (state, action: PayloadAction<boolean>) => {
      state.errorFromSocial = action.payload;
    },
    saveAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    saveLatLng: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.latlng = action.payload;
    },
    saveCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSaveNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload;
    },
    setProductInfo: (
      state,
      action: PayloadAction<{
        id: number | null;
        price: number | null;
        isOutOfKigali: boolean;
        selfPickupAvailable: boolean;
        name: string;
        sellerName: string;
        sellerPhone: string;
        modeOfTransport: string;
      } | null>
    ) => {
      state.productInfo = action.payload;
    },
    setSelectedDeliveryAddress: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.selectedDeliveryAddress = action.payload;
    },
    setIsNewPackageDeliverd: (state, action: PayloadAction<number>) => {
      state.isNewPackageDelivered = action.payload;
    },
    setMoverInfo: (state, action: PayloadAction<UserData>) => {
      state.moverInfo = action.payload;
    },
    setClosedItems: (state, action: PayloadAction<any[]>) => {
      state.closedItem = action.payload;
    },
    setMessagingData: (state, action: PayloadAction<ChatDataList[]>) => {
      state.messagingData = action.payload;
    },
    setTotalUnreadNotificationCount: (state, action: PayloadAction<number>) => {
      state.unread_count = action.payload;
    },
    setTotalUnreadAlertCount: (state, action: PayloadAction<number>) => {
      state.unread_alert_count = action.payload;
    },
    setSearchValueforCategory: (state, action: PayloadAction<string>) => {
      state.searchValueforCategory = action.payload;
    },
  },
});

export const {
  isDarkMode,
  setUserData,
  setErrorFromSocial,
  saveAddress,
  saveLatLng,
  saveCity,
  setSaveNotificationCount,
  setProductInfo,
  setSelectedDeliveryAddress,
  setIsNewPackageDeliverd,
  setMoverInfo,
  setClosedItems,
  setMessagingData,
  setTotalUnreadNotificationCount,
  setTotalUnreadAlertCount,
  setSearchValueforCategory,
} = settings.actions;

export default settings.reducer;
