import { UserData } from "./user.types";

export interface SettingsStateProps {
  isDark: boolean;
  userData: UserData;
  errorFromSocial: boolean;
  address: string;
  city: string;
  notificationCount: number;
  productInfo: {
    id: number | null;
    price: number | null;
    isOutOfKigali: boolean;
    name: string;
    sellerName: string;
    sellerPhone: string;
    modeOfTransport: string;
  } | null;
  selectedDeliveryAddress: number | null;
}
