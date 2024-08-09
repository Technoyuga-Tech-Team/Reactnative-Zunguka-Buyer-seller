import { UserData } from "./user.types";

export interface SettingsStateProps {
  isDark: boolean;
  userData: UserData;
  errorFromSocial: boolean;
  address: string;
  city: string;
  notificationCount: number;
  productInfo: {
    id: number;
    price: number;
    isOutOfKigali: boolean;
  } | null;
}
