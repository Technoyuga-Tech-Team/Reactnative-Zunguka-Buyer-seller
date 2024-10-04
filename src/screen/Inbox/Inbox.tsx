import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationListing from "../../components/Notification/NotificationListing";
import { BASE_URL, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { readUnreadAlert } from "../../store/Notification/notification.thunk";
import { setTotalUnreadAlertCount } from "../../store/settings/settings.slice";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { GetNotificationDataList } from "../../types/notification.types";
import { getData } from "../../utils/asyncStorage";
import CustomHeader from "../../components/ui/CustomHeader";

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

    console.log("item - - -", item);
    if (item.type == "mover_status") {
      // navigate to request mover page
      navigation.navigate(Route.navRequestToMover);
    } else if (item.type == "sold_item") {
      // navigate to Closed item
      // @ts-ignore
      navigation.navigate(Route.navMyStorefront, {
        screen: Route.navClosedItems,
      });
    } else if (item.type == "new_item") {
      // navigate to product details
      navigation.navigate(Route.navProductDetails, { itemId: item?.item_id });
    } else if (item.type == "new_message") {
      // navigate to Search screen
      // navigation.navigate(Route.navChatroom,{product_id:"",receiver_id:""})
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Alert" />
      {/* <Text style={style.txtHeaderTitle}>Alert</Text> */}
      <NotificationListing
        notificationData={notifications}
        notificationLoading={loading}
        onEndReached={onEndReached}
        loadMoreLoading={loadMoreLoading}
        onPressItem={onPressItem}
      />
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
}));
