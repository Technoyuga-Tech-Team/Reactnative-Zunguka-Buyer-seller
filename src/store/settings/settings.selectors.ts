import { createSelector } from "@reduxjs/toolkit";
import { RootReduxState } from "../../types/store.types";

const selectSettings = (state: RootReduxState) => state.settings;

export const isDark = createSelector(
  [selectSettings],
  (settings) => settings.isDark
);

export const selectUserData = createSelector(
  [selectSettings],
  (settings) => settings.userData
);
export const selectSocialError = createSelector(
  [selectSettings],
  (settings) => settings.errorFromSocial
);

export const getSavedAddress = createSelector(
  [selectSettings],
  (settings) => settings.address
);

export const getSavedLatLng = createSelector(
  [selectSettings],
  (settings) => settings.latlng
);

export const getCityAddress = createSelector(
  [selectSettings],
  (settings) => settings.city
);

export const getNotificationCount = createSelector(
  [selectSettings],
  (settings) => settings.notificationCount
);

export const getProductInfo = createSelector(
  [selectSettings],
  (settings) => settings.productInfo
);

export const getSelectedDeliveryAddress = createSelector(
  [selectSettings],
  (settings) => settings.selectedDeliveryAddress
);

export const getIsPackageDelivered = createSelector(
  [selectSettings],
  (settings) => settings.isNewPackageDelivered
);

export const selectMoverInfo = createSelector(
  [selectSettings],
  (settings) => settings.moverInfo
);

export const getClosedItem = createSelector(
  [selectSettings],
  (settings) => settings.closedItem
);

export const getMessagingData = createSelector(
  [selectSettings],
  (settings) => settings.messagingData
);

export const getUnreadCount = createSelector(
  [selectSettings],
  (settings) => settings.unread_count
);

export const getUnreadAlertCount = createSelector(
  [selectSettings],
  (settings) => settings.unread_alert_count
);

export const getSearchValueforCategory = createSelector(
  [selectSettings],
  (settings) => settings.searchValueforCategory
);
