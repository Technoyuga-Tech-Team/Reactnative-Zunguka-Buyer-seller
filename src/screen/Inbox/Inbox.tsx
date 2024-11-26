import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationListing from "../../components/Notification/NotificationListing";
import { BASE_URL, secureStoreKeys, USER_DATA } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  markAllAsRead,
  readUnreadAlert,
} from "../../store/Notification/notification.thunk";
import {
  setTotalUnreadAlertCount,
  setUserData,
} from "../../store/settings/settings.slice";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { GetNotificationDataList } from "../../types/notification.types";
import { getData, setData } from "../../utils/asyncStorage";
import CustomHeader from "../../components/ui/CustomHeader";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/settings/settings.selectors";
import LoginToZunguka from "../../components/ui/LoginToZunguka";
import { logout } from "../../store/authentication/authentication.thunks";
import notifee from "@notifee/react-native";
import { CommonActions } from "@react-navigation/native";
import Scale from "../../utils/Scale";

const Inbox: React.FC<HomeNavigationProps<Route.navAlert>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(true);
  const [notifications, setNotifications] = useState<GetNotificationDataList[]>(
    []
  );
  const [unreadAlertCount, setUnreadAlertCount] = useState(0);

  const userData = useSelector(selectUserData);

  const isGuest = userData?.is_guest == 1;

  useEffect(() => {
    dispatch(setTotalUnreadAlertCount(unreadAlertCount));
  }, [unreadAlertCount]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications(10, 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getNotifications = async (limit: number, page: number) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_ALERT}/${limit}/${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setLoading(false);
        setNotifications([...notifications, ...data?.data?.data]);
        setUnreadAlertCount(data?.data?.unread_alerts);
        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
        setLoadMoreLoading(false);
      } else {
        setLoading(false);
        setLoadMoreLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setLoadMoreLoading(false);
      console.error(error);
    }
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      setLoadMoreLoading(true);
      getNotifications(10, page);
    }
  };

  const onPressItem = async (item: GetNotificationDataList) => {
    if (item.is_read == 0) {
      let data = [...notifications];
      data.map((ele) => {
        if (ele.id == item.id) {
          return (ele.is_read = 1);
        }
      });
      setNotifications(data);
      const result = await dispatch(
        readUnreadAlert({ alert_id: `${item.id}` })
      );
      if (readUnreadAlert.fulfilled.match(result)) {
        if (result.payload.status == 1) {
          setUnreadAlertCount(unreadAlertCount - 1);
        }
      } else {
        console.log("errror getMyEarningData --->", result.payload);
      }
    }

    if (item.type == "mover_status") {
      // navigate to request mover page
      navigation.navigate(Route.navRequestToMover);
    } else if (item.type == "sold_item") {
      // navigate to Closed item
      // @ts-ignore
      navigation.navigate(Route.navMyStorefront, {
        screen: Route.navClosedItems,
      });
    } else if (item.type == "new_item" || item.type == "saved_item") {
      // navigate to product details
      navigation.navigate(Route.navProductDetails, { itemId: item?.item_id });
    } else if (item.type == "new_message") {
      // navigate to Search screen
      // navigation.navigate(Route.navChatroom,{product_id:"",receiver_id:""})
    }
  };

  const onPressMarkAllAsRead = async () => {
    try {
      const result = await dispatch(markAllAsRead({ is_alert: 1 }));
      if (markAllAsRead.fulfilled.match(result)) {
        console.log("markAllAsRead result.payload", result.payload);
        if (result.payload.status == 1) {
          let data = [...notifications];
          data.map((ele) => {
            return (ele.is_read = 1);
          });
          setNotifications(data);
          getNotifications(10, 1);
          setUnreadAlertCount(0);
        }
      } else {
        console.log("errror markAllAsRead --->", result.payload);
      }
    } catch (error) {
      console.log("catch error markAllAsRead --->", error);
    }
  };

  const onPressLogin = async () => {
    dispatch(logout());
    await setData(secureStoreKeys.JWT_TOKEN, null);
    await setData(USER_DATA, null);
    notifee.cancelAllNotifications();
    // @ts-ignore
    dispatch(setUserData({}));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.navAuthentication }],
      })
    );
  };
  const onPressSignup = async () => {
    dispatch(logout());
    await setData(secureStoreKeys.JWT_TOKEN, null);
    await setData(USER_DATA, null);
    notifee.cancelAllNotifications();
    // @ts-ignore
    dispatch(setUserData({}));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: Route.navAuthentication,
            state: {
              routes: [{ name: Route.navSignup }],
            },
          },
        ],
      })
    );
  };

  console.log("notifications", JSON.stringify(notifications));

  return (
    <View style={style.container}>
      <CustomHeader title="Steps and Statuses" />
      {!isGuest ? (
        <View style={{ flex: 1 }}>
          {notifications?.length > 0 && (
            <TouchableOpacity
              disabled={unreadAlertCount == 0}
              onPress={onPressMarkAllAsRead}
              style={[
                style.btnMarkCont,
                {
                  backgroundColor:
                    unreadAlertCount == 0
                      ? theme?.colors?.unselectedIconColor
                      : theme?.colors?.blue,
                },
              ]}
            >
              <Text style={style.txtMark}>Mark all as read</Text>
            </TouchableOpacity>
          )}
          <NotificationListing
            notificationData={notifications}
            notificationLoading={loading}
            onEndReached={onEndReached}
            loadMoreLoading={loadMoreLoading}
            onPressItem={onPressItem}
          />
        </View>
      ) : (
        <LoginToZunguka
          onPressLogin={onPressLogin}
          onPressSignup={onPressSignup}
        />
      )}
    </View>
  );
};

export default Inbox;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom + 10,
  },
  txtHeaderTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    lineHeight: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  btnMarkCont: {
    height: Scale(30),
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme?.colors?.blue,
    // backgroundColor: "red",
    alignSelf: "flex-end",
    borderRadius: 4,
    marginRight: 10,
    marginVertical: 5,
  },
  txtMark: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
  },
}));
