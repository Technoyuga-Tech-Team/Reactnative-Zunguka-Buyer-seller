import { ChatDataList } from "./chat.types";
import { UserData } from "./user.types";

export interface SettingsStateProps {
  isDark: boolean;
  userData: UserData;
  moverInfo: UserData;
  errorFromSocial: boolean;
  address: string;
  latlng: { lat: number; lng: number };
  city: string;
  notificationCount: number;
  productInfo: {
    id: number | null;
    price: number | null;
    isOutOfKigali: boolean;
    selfPickupAvailable: boolean;
    name: string;
    sellerName: string;
    sellerPhone: string;
    modeOfTransport: string;
  } | null;
  selectedDeliveryAddress: number | null;
  isNewPackageDelivered: number;
  closedItem: any;
  messagingData: ChatDataList[];
  unread_count: number;
  unread_alert_count: number;
  searchValueforCategory: string;
}
