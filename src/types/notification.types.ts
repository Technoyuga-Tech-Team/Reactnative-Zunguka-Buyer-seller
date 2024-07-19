import { UserData } from "./user.types";

export interface GetNotificationDataProps {
  message: string;
  status: number;
  data: GetNotificationData;
}

export interface GetNotificationData {
  data: GetNotificationDataList[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export interface GetNotificationDataList {
  id: number;
  user_id: number;
  type: string;
  buyer_seller_id: number;
  mover_id: number;
  reference_id: number;
  order_id: number;
  item_id: number;
  chat_id: number;
  message: string;
  is_read: number;
  status: number;
  created_at: string;
  updated_at: string;
  user: UserData;
}
