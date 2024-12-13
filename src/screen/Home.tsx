import notifee, { AuthorizationStatus } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StatusBar,
  View,
  Text,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CategoryListing from "../components/Categories/CategoryListing";
import HeaderHome from "../components/HeaderHome";
import HomeBanner from "../components/HomeBanner";
import HotBrandsListing from "../components/HotBrands/HotBrandsListing";
import SeeAllItem from "../components/SeeAllItem";
import { USER_DATA, WINDOW_WIDTH } from "../constant";
import { Route } from "../constant/navigationConstants";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useGetDashboard } from "../hooks/useDashboard";
import { useMeQuery } from "../hooks/useMeQuery";
import {
  getUnreadAlertCount,
  getUnreadCount,
  selectUserData,
} from "../store/settings/settings.selectors";
import {
  setSearchValueforCategory,
  setTotalUnreadAlertCount,
  setTotalUnreadNotificationCount,
  setUserData,
} from "../store/settings/settings.slice";
import {
  BannerProps,
  CategoriesDataProps,
  HotBrandaDataProps,
} from "../types/dashboard.types";
import { ThemeProps } from "../types/global.types";
import { HomeNavigationProps } from "../types/navigation";
import { setData } from "../utils/asyncStorage";
import { socket, socketEvent } from "../utils/socket";
import HowItWorks from "./howItWorks";
import { AppImage } from "../components/AppImage/AppImage";
import { Images } from "../assets/images";

const Home: React.FC<HomeNavigationProps<Route.navHome>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);
  const unread_notification_Count = useSelector(getUnreadCount);
  const unread_alert_Count = useSelector(getUnreadAlertCount);

  const { data: currentUser, refetch: refetchUser } = useMeQuery({
    staleTime: Infinity,
  });

  const { data: dashboardData, refetch, isLoading } = useGetDashboard();
  const appState = useRef(AppState.currentState);
  const [name, setName] = useState(userData?.username);

  const [banner, setBanner] = useState<BannerProps[]>([]);
  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);
  const [hotBrands, setHotBrands] = useState<HotBrandaDataProps[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] =
    React.useState(0);
  const [unreadAlertCount, setUnreadAlertCount] = React.useState(0);

  useEffect(() => {
    setUnreadAlertCount(unread_alert_Count);
  }, [unread_alert_Count]);

  useEffect(() => {
    setUnreadNotificationCount(unread_notification_Count);
  }, [unread_notification_Count]);

  useEffect(() => {
    async function checkNotificationPermission() {
      const settings = await notifee.getNotificationSettings();
      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        console.log("Notification permissions has been authorized");
      } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
        console.log("Notification permissions has been denied");
        requestUserPermission();
      }
    }

    checkNotificationPermission().then();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === "ios") {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log("Permission settings:", settings);
      } else {
        console.log("User declined permissions");
        await notifee.requestPermission();
      }
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        refetchUser().then();
        console.log("App has come to the foreground!");
        socket.connect();
        const user_id = userData?.id;
        socket.on(socketEvent.CONNECT, () => {
          console.log("Connected to the server");
          console.log("connected", socket.connected);
          console.log("Activate", socket.active);
          console.log("socket.id", socket.id);
          console.log("user_id - - - -", user_id);
          socket.emit("conn", userData?.id);
        });
      } else {
        console.log("disconnected - - - userData?.id", userData?.id);
        socket.emit("disconnected", userData?.id);
        socket.emit("offline");
        socket.disconnect();
        const setNotificationHandled = async () => {
          console.log("Called  notificationHandled to FALSE");
          await AsyncStorage.setItem("notificationHandled", "false");
        };
        setNotificationHandled();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [socket, userData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchUser().then();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser?.user) {
      socket.connect();
      const user_id = currentUser?.user?.id;
      socket.on(socketEvent.CONNECT, () => {
        console.log(" - - Connected to the server - - ");
        console.log("connected", socket.connected);
        console.log("Activate", socket.active);
        console.log("socket.id", socket.id);
        console.log("user_id - - - -", user_id);
        socket.emit("conn", user_id);
      });
      dispatch(setUserData(currentUser?.user));
      setData(USER_DATA, currentUser?.user);
    }
  }, [currentUser, socket]);

  useEffect(() => {
    if (dashboardData?.data) {
      setBanner(dashboardData?.data?.banners);
      setCategories(dashboardData?.data?.categories);
      setHotBrands(dashboardData?.data?.brands);
      setUnreadNotificationCount(dashboardData?.data?.unread_notifications);
      setUnreadAlertCount(dashboardData?.data?.unread_alerts);
      dispatch(
        setTotalUnreadNotificationCount(
          dashboardData?.data?.unread_notifications
        )
      );
      dispatch(setTotalUnreadAlertCount(dashboardData?.data?.unread_alerts));
    }
  }, [dashboardData]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setName(userData?.username);
    });
    return () => {
      unsubscribe();
    };
  }, [userData]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setTranslucent(true);
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refetchUser().then();
    refetch().then(() => {
      setRefreshing(false);
    });
  };

  const onPressAlert = () => {
    navigation.navigate(Route.navAlert);
  };
  const onPressSearch = () => {
    navigation.navigate(Route.navSearchProduct, { mainCat: "", subCat: "" });
  };
  const onPressSeeAllCategories = () => {
    navigation.navigate(Route.navAllCategories);
  };
  const onPressCategory = (item: CategoriesDataProps) => {
    navigation.navigate(Route.navSearchProduct, {
      mainCat: item.name,
      subCat: "",
    });
    dispatch(setSearchValueforCategory(item.name));
  };
  const onPressHotBrands = (item: HotBrandaDataProps) => {
    navigation.navigate(Route.navSearchProduct, {
      mainCat: item.name,
      subCat: "",
    });
    dispatch(setSearchValueforCategory(item.name));
  };
  const onPressSeeAllHotBrands = () => {
    navigation.navigate(Route.navAllBrand);
  };
  const onPressBanner = async () => {
    // navigation.navigate(Route.navAdminVerification);
  };

  // console.log("userData - - ", userData);

  return (
    <View style={style.container}>
      <HeaderHome
        name={name}
        onPressNotification={onPressAlert}
        onPressSearch={onPressSearch}
        notificationCount={unreadAlertCount}
        onPressHowItWorkIcon={() => navigation.navigate(Route.howItWorks)}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={style.scrollCont}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isLoading}
            onRefresh={onRefresh}
            tintColor={theme?.colors?.primary}
            // @ts-ignore
            colors={[theme?.colors?.primary]}
          />
        }
      >
        {/* <View style={[style.innerCont, style.howItWorksWrapper]}>
          <Text
            style={{ fontWeight: 700 }}
            onPress={() => navigation.navigate(Route.howItWorks)}
          >
            How It Works
          </Text>
        </View> */}
        {banner?.length > 0 && (
          <HomeBanner bannerData={banner} onPressBanner={onPressBanner} />
        )}
        <View style={style.innerCont}>
          {categories?.length > 0 && (
            <>
              <SeeAllItem
                title="Categories"
                onPressSeeAll={onPressSeeAllCategories}
              />
              <CategoryListing
                CategoryData={categories}
                onPressCategory={(item) => onPressCategory(item)}
              />
            </>
          )}
          {hotBrands?.length > 0 && (
            <>
              <SeeAllItem
                title="Hot Brands"
                onPressSeeAll={onPressSeeAllHotBrands}
              />
              <HotBrandsListing
                HotBrandsData={hotBrands.slice(0, 6)}
                onPressHotBrands={(item) => onPressHotBrands(item)}
              />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Home;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
  },
  scrollCont: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  innerCont: {
    paddingHorizontal: 20,
  },
  howItWorksWrapper: {
    backgroundColor: theme.colors?.backgroundLight,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: WINDOW_WIDTH - 40,
    alignSelf: "center",
    alignItems: "center",
  },
}));
