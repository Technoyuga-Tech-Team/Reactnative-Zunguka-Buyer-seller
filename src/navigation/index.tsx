import {
  CommonActions,
  LinkingOptions,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { useTheme } from "react-native-elements";
import Snackbar from "react-native-snackbar";
import { useSelector } from "react-redux";
// Relative path
import notifee, { EventType, Notification } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import DeliveryConfirmationPopup from "../components/ui/popups/DeliveryConfirmationPopup";
import LogoutPopup from "../components/ui/popups/LogoutPopup";
import {
  BASE_PORT,
  BASE_URL,
  GOOGLE_WEB_CLIENT_ID,
  secureStoreKeys,
  USER_DATA,
} from "../constant";
import { API } from "../constant/apiEndpoints";
import { Route } from "../constant/navigationConstants";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  selectGlobalErrors,
  selectGlobalSuccess,
} from "../store/global/global.selectors";
import { clearErrors, clearSuccess } from "../store/global/global.slice";
import { selectSocialError } from "../store/settings/settings.selectors";
import {
  setClosedItems,
  setErrorFromSocial,
  setIsNewPackageDeliverd,
  setMessagingData,
  setSaveNotificationCount,
  setTotalUnreadAlertCount,
  setTotalUnreadNotificationCount,
  setUserData,
} from "../store/settings/settings.slice";
import store from "../store/store";
import { ChatDataList } from "../types/chat.types";
import { getData, setData } from "../utils/asyncStorage";
import MainStack from "./MainStack";

const linking: LinkingOptions<{}> = {
  prefixes: [`http://${BASE_PORT}/`, `zunguka://`],
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
  },

  config: {
    screens: {
      EmailVerify: "verify-email/:token/:email",
      NewPassword: "password-setup/:token",
      ChatRoom: "chat-box/:id/:sender_id/:chat_id/:fireConsole",
      BuyerSellerStack: {
        screens: {
          ProductDetails: "viewing-profile/:itemId",
        },
      },
    },
  },
};

const MainNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useAppDispatch();
  const { errors, errorMessage } = useSelector(selectGlobalErrors);
  const { success, successMessage } = useSelector(selectGlobalSuccess);
  const isSocialError = useSelector(selectSocialError);
  const { theme } = useTheme();

  const [notificationCount, setNotificationCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleDeleteAccount, setVisibleDeleteAccount] = useState(false);
  const [moverId, setMoverId] = useState("");
  const [packageDetailsId, setPackageDetailsId] = useState("");

  const handleDynamicLink = (link: { url: string }) => {
    var url = link.url;
    let split_data = url.split("?");
    let id = split_data[1].split("=");
    setTimeout(() => {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: Route.navProductDetails, params: { itemId: id[1] } },
          ],
        })
      );
    }, 1000);
  };

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        link && handleDynamicLink(link);
      });
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      errors &&
      errors.errors?.findIndex(
        (err: { domain: string }) =>
          err.domain === "global" || err.domain === "nonFieldErrors"
      ) !== -1
    ) {
      if (!isSocialError) {
        if (errorMessage !== "") {
          Snackbar.show({
            text: errorMessage || "",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: theme.colors?.error,
            textColor: theme.colors?.white,
            fontFamily: theme.fontFamily?.medium,
          });
        }
      }

      dispatch(clearErrors());
      dispatch(setErrorFromSocial(false));
    }
  }, [
    dispatch,
    errorMessage,
    errors,
    theme.colors?.error,
    theme.colors?.white,
    isSocialError,
  ]);

  useEffect(() => {
    if (success && successMessage) {
      Snackbar.show({
        text: successMessage,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.colors?.primary,
        textColor: theme.colors?.black,
        fontFamily: theme.fontFamily?.medium,
      });
      dispatch(clearSuccess());
    }
  }, [
    dispatch,
    success,
    successMessage,
    theme.colors?.black,
    theme.colors?.grey5,
  ]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      // scopes: ['https://www.googleapis.com/auth/user.phonenumbers.read'],
    });
  }, []);

  const handleClickedNotitfaction = async (
    notification: FirebaseMessagingTypes.RemoteMessage | Notification
  ) => {
    await AsyncStorage.setItem("notificationHandled", "true");
    if (notification?.data?.is_notification == "1") {
      let unread_noti_count = notification?.data?.unread_notifications;
      dispatch(setTotalUnreadNotificationCount(Number(unread_noti_count)));
    }
    if (notification?.data?.is_alert == "1") {
      let unread_alerts = notification?.data?.unread_alerts;
      dispatch(setTotalUnreadAlertCount(Number(unread_alerts)));
    }
    setTimeout(() => {
      if (notification && notification.data && notification.data.type) {
        switch (notification.data.type) {
          case "new_message":
            const user = notification.data.user as string;
            let data = JSON.parse(user);
            let product_id = notification?.data?.chat_ref_id;
            // @ts-ignore
            navigationRef.navigate(Route.navChatroom, {
              receiver_id: data?.id,
              product_id: product_id,
            });

            break;
          case "new_item":
            let itemId = notification?.data?.ref_id;
            // @ts-ignore
            navigationRef.navigate(Route.navProductDetails, { itemId: itemId });
            // set default type wise
            break;
          case "mover_status":
            // @ts-ignore
            navigationRef.navigate(Route.navMyStorefront, {
              screen: Route.navClosedItems,
            });
            // set default type wise
            break;
          case "confirmed":
            let packageId = notification?.data?.item_id;

            // @ts-ignore
            navigationRef.navigate(Route.navMyStorefront, {
              screen: Route.navClosedItems,
              params: { packageId: packageId },
            });
            // set default type wise
            break;
          case "send_request_again":
            // @ts-ignore
            navigationRef.navigate(Route.navMyStorefront, {
              screen: Route.navClosedItems,
            });
            // set default type wise
            break;
          case "send_request_again_not_started":
            // @ts-ignore
            navigationRef.navigate(Route.navMyStorefront, {
              screen: Route.navClosedItems,
            });
            // set default type wise
            break;
          case "delivery_code":
            // @ts-ignore
            navigationRef.navigate(Route.navMyStorefront, {
              screen: Route.navClosedItems,
            });
            // set default type wise
            break;
          case "send_request_again":
            // @ts-ignore
            navigationRef.navigate(Route.navMyStorefront, {
              screen: Route.navClosedItems,
            });
            // set default type wise
            break;
          case "on_the_way":
            // @ts-ignore
            navigationRef.navigate(Route.navRequestToMover, {
              screen: Route.navOngoingMoverRequest,
            });
            // set default type wise
            break;
          case "startjob":
            // @ts-ignore
            navigationRef.navigate(Route.navRequestToMover, {
              screen: Route.navOngoingMoverRequest,
            });
            // set default type wise
            break;
          case "endjob":
            // @ts-ignore
            navigationRef.navigate(Route.navRequestToMover, {
              screen: Route.navPastMoverRequest,
            });
            // set default type wise
            break;
          case "sold_item":
            let item = notification?.data?.product;
            let prod = JSON.parse(item);
            console.log("prod = = = = =", prod);
            // @ts-ignore
            navigationRef.navigate(Route.navArchivedProductDetails, {
              item: prod,
            });
            // set default type wise
            break;
          default:
            // @ts-ignore
            if (notification?.data?.is_notification == "1") {
              navigationRef.navigate(Route.navNotification);
            }
            if (notification?.data?.is_alert == "1") {
              navigationRef.navigate(Route.navAlert);
            }
          // set default notification
        }
      }
    }, 1000);
  };

  notifee.onBackgroundEvent(async (localMessage) => {
    console.log(
      "notifee setBackgroundMessageHandler localMessage",
      JSON.stringify(localMessage)
    );
    handleClickedNotitfaction(localMessage.detail.notification);
  });

  const onNotifeeMessageReceived = async (message: any) => {
    console.log("message - - - ", message);
    if (message.data.is_notification == "1") {
      let unread_noti_count = store.getState().settings.unread_count;
      console.log("unread_noti_count - - - -", unread_noti_count);
      dispatch(
        setTotalUnreadNotificationCount(message.data.unread_notifications)
      );
    }
    if (message.data.is_alert == "1") {
      let unread_alerts = store.getState().settings.unread_alert_count;
      console.log("unread_alerts - - - -", unread_alerts);
      dispatch(setTotalUnreadAlertCount(message.data.unread_alerts));
    }

    if (message?.data?.type === "endjob") {
      dispatch(setIsNewPackageDeliverd(notificationCount + 1));
      let user = JSON.parse(message?.data?.user);
      setMoverId(user.mover_id);
      setPackageDetailsId(user.id);
      setVisible(true);
    }

    if (
      message?.data?.type === "confirmed" ||
      message?.data?.type === "send_request_again" ||
      message?.data?.type === "send_request_again_not_started"
    ) {
      const token = await getData(secureStoreKeys.JWT_TOKEN);
      try {
        const response = await fetch(
          `${BASE_URL}${API.GET_PRODUCTS}/closed/my/10/1`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        // Handle the fetched data here
        if (data.status === 1) {
          if (data && data?.data?.data.length > 0) {
            dispatch(setClosedItems(data?.data?.data));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (message?.data?.type === "new_message") {
      let message = store.getState().settings.messagingData;
      const token = await getData(secureStoreKeys.JWT_TOKEN);
      try {
        const response = await fetch(
          `${BASE_URL}${API.GET_ALL_CHATS_LIST}/10/0`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        // Handle the fetched data here
        if (data.status === 1) {
          if (data && data?.data?.list?.length > 0) {
            let total_data = [...message, ...data?.data?.list];
            // const uniqueChat = _.uniqBy(total_data, "id");
            const groupedData: ChatDataList[] = total_data.reduce(
              (acc, curr) => {
                const key = curr.username;
                if (!acc.hasOwnProperty(key)) {
                  acc[key] = curr;
                } else if (curr.created_at > acc[key].created_at) {
                  acc[key] = curr;
                }
                return acc;
              },
              {}
            );

            // Convert the grouped object to an array
            const latestData = Object.values(groupedData);
            dispatch(setMessagingData(latestData));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (message?.data?.type === "logout") {
      setVisibleDeleteAccount(true);
      // let userData = store.getState().settings.userData;
      // if (userData?.is_social == 1) {
      //   await GoogleSignin.signOut();
      // }
      // setVisible(false);
      // // dispatch(logout());
      // await setData(secureStoreKeys.JWT_TOKEN, null);
      // await setData(USER_DATA, null);
      // dispatch(setSaveNotificationCount(0));
      // notifee.cancelAllNotifications();
      // // @ts-ignore
      // dispatch(setUserData({}));
      // navigationRef.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: Route.navAuthentication }],
      //   })
      // );
    }

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });
    notifee.displayNotification({
      id: message.messageId,
      title: message.notification.title,
      // body: message.notification.body,
      data: message.data,
      android: {
        channelId: channelId,
        sound: "default",
        pressAction: {
          id: "default",
        },
      },
    });
  };

  useEffect(() => {
    const checkInitialNotification = async () => {
      const isnotificationHandled = await AsyncStorage.getItem(
        "notificationHandled"
      );
      let notificationHandled = JSON.parse(isnotificationHandled);
      console.log("notificationHandled - - ", notificationHandled);
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification clicked when the app is in the background or terminated:",
              remoteMessage
            );
            if (remoteMessage && !notificationHandled) {
              handleClickedNotitfaction(remoteMessage);
            }

            // Handle the notification click here
            // You can navigate to a specific screen or perform other actions
          }
        });
    };
    checkInitialNotification();
  }, []);

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification clicked when the app is in the foreground:",
      remoteMessage
    );
    handleClickedNotitfaction(remoteMessage);
    // Handle the notification click here
    // You can navigate to a specific screen or perform other actions
  });

  // @todo - handle in-app notifications
  useEffect(() => {
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        handleClickedNotitfaction(detail?.notification);
      }
    });
    messaging().onMessage(onNotifeeMessageReceived);
    messaging().setBackgroundMessageHandler(async (message) => {
      console.log("in background message", message);
    });
  }, []);

  const togglePopup = () => {
    setVisible(!visible);
  };

  const onPressOkay = () => {
    togglePopup();
    setTimeout(() => {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: Route.navDeliveryCompleteAndRateDriver,
              params: {
                user_id: moverId,
                package_details_id: packageDetailsId,
              },
            },
          ],
        })
      );
    }, 500);
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <DeliveryConfirmationPopup
        visiblePopup={visible}
        togglePopup={togglePopup}
        onPressOkay={onPressOkay}
      />
      <LogoutPopup
        title1={"Account Terminated"}
        title2={"Admin terminated your account"}
        title3={"Dismiss"}
        visiblePopup={visibleDeleteAccount}
        loading={false}
        onPressLogout={async () => {
          let userData = store.getState().settings.userData;
          if (userData?.is_social == 1) {
            await GoogleSignin.signOut();
          }
          await setData(secureStoreKeys.JWT_TOKEN, null);
          await setData(USER_DATA, null);
          dispatch(setSaveNotificationCount(0));
          notifee.cancelAllNotifications();
          // @ts-ignore
          dispatch(setUserData({}));
          setVisibleDeleteAccount(false);
          navigationRef.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Route.navAuthentication }],
            })
          );
        }}
      />
      <MainStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
