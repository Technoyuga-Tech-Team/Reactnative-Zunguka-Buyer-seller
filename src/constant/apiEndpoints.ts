export const API = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGIN_AS_GUEST: "/login-as-guest",
  LOGOUT: "/logout",
  OAUTH_LOGIN: "/social_login_reg",
  OAUTH_REGISTER: "/register",
  FORGOT_PASSWORD: "/send-otp",
  CHANGE_PASSWORD: "/change-password",
  RESET_PASSWORD: "/reset-password",
  RESEND_OTP: "/send-otp",
  VERIFY_OTP_CODE: "/verify-code",
  ADD_USERNAME: "/add_username",
  // Address
  ADD_ADDRESS: "/add-address",
  UPDATE_ADDRESS: "/edit-address",
  // Verify ID (kyc)
  VERIFY_KYC: "/verify-kyc",
  VERIFY_SELFIE: "/add-selfie",

  // profile
  UPDATE_PROFILE: "/profile",
  UPDATE_PROFILE_PICTURE: "/profile",
  UPDATE_NOTIFICATION: "/profile",
  SETUP_PROFILE: "/setup-profile",
  SAVE_KEYWORD: "/save-keyword",
  LIST_SAVED_KEYWORD: "/list-keyword",
  DELETE_KEYWORD: "/delete-keyword",
  DELETE_ACCOUNT: "/delete-account",
  // product
  GET_ALL_DEALS: "/list-item",
  GET_CATEGORIES: "/categories",
  GET_BRANDS: "/brands",
  GET_SUB_CATEGORIES: "/subcategories",
  ADD_PRODUCT_FOR_SELL: "/add-item",
  EDIT_PRODUCT_FOR_SELL: "/edit-item",
  GET_PRODUCT_DETAILS: "/get-item/",
  GET_PRODUCTS: "/list-item",
  GET_SEARCH_ITEM: "/search-item",
  GET_SEARCH_FILTER_ITEM: "/search-filter",
  GET_PRODUCT_FILTER_ITEM: "/filter-items",
  LIKE_DISLIKE_PRODUCT: "/like-dislike",
  DELETE_PRODUCT: "/delete-item",
  GET_SAVED_PRODUCTS: "/saved-items",
  GET_PURCHASED_PRODUCTS: "/purchased-history",
  STAR_STOP_PUBLISH_PRODUCT: "/stop_start_publising",
  SEND_REQUEST_TO_NEARBY_MOVERS: "/send_request_to_nearby_movers",
  // dashboard
  GET_DASHBOARD: "/home",
  // notification
  GET_NOTIFICATION: "/notification-list",
  READ_UNREAD_NOTIFICATION: "/read_notification",
  MARK_ALL_AS_READ_NOTIFICATION_ALERT: "/mark-all-as-read",
  GET_ALERT: "/alert-list",
  READ_UNREAD_ALERT: "/read_alert",
  // user data
  ME: "/get-user-details",
  // Payment Card
  ADD_CARD: "/add-card",
  LIST_CARD: "/list-card",
  DELETE_CARD: "/delete-card",
  MAKE_PAYMENT: "/pay-deposit-seller",
  MAKE_PAYMENT_FOR_MOVER: "/pay-mover",
  GET_TRANSACTIONS: "/get-transactions",
  // chat
  GET_ALL_CHATS_LIST: "/get-all-messages",
  GET_CHAT_ROOM_MESSAGE_LIST: "/get-user-messages",
  SEND_MESSAGE: "/send-message",
  // mover booking flow
  ADD_PACKAGE_INFO: "/add-package",
  GET_MOVER_REQUESTED: "/request-details",
  GET_DELIVERY_DETAILS: "/delivery-details",
  GET_ORDER_DETAILS: "/mover-delivery-details",
  REJECT_MOVER_REQUESTE: "/request-approve-reject",
  END_JOB: "/mover-end-job",
  GET_PAST_MOVER_HISTORY: "/past-movers-details",
  GET_MOVER_RATING_HISTORY: "/rating-review-list",
  // package status

  GET_PACKAGE_STATUS: "/package-details",
  // rating mover
  ADD_RATING: "/add-rating",
  // my earning
  GET_MY_EARNING: "/my-earnings",
  GET_PAYOUT_HISTORY: "/get-withdraw-requests-user",
  SEND_PAYOUT_REQUEST: "/send_withdraw_request_user",
  // Delivery address
  ADD_DELIVERY_ADDRESS: "/add-delivery-address",
  UPDATE_DELIVERY_ADDRESS: "/update_delivery_address",
  GET_SAVED_DELIVERY_ADDRESS: "/get_all_addresses",
  // Payment
  PAY_DEPOSIT_SELLER: "/pay-deposit-seller",
  PAY_DEPOSIT_MOVER: "/pay_deposit_to_mover",
};
