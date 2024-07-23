import React, { useEffect, useState } from "react";
import { Platform, RefreshControl, StatusBar, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CategoryListing from "../components/Categories/CategoryListing";
import HeaderHome from "../components/HeaderHome";
import HomeBanner from "../components/HomeBanner";
import HotBrandsListing from "../components/HotBrands/HotBrandsListing";
import SeeAllItem from "../components/SeeAllItem";
import { Route } from "../constant/navigationConstants";
import { useGetDashboard } from "../hooks/useDashboard";
import { selectUserData } from "../store/settings/settings.selectors";
import {
  BannerProps,
  CategoriesDataProps,
  HotBrandaDataProps,
} from "../types/dashboard.types";
import { ThemeProps } from "../types/global.types";
import { HomeNavigationProps } from "../types/navigation";
import { useMeQuery } from "../hooks/useMeQuery";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setUserData } from "../store/settings/settings.slice";

const Home: React.FC<HomeNavigationProps<Route.navHome>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);

  const { data: currentUser, refetch: refetchUser } = useMeQuery({
    staleTime: Infinity,
  });

  const { data: dashboardData, refetch, isLoading } = useGetDashboard();

  const [name, setName] = useState(userData?.username);

  const [banner, setBanner] = useState<BannerProps[]>([]);
  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);
  const [hotBrands, setHotBrands] = useState<HotBrandaDataProps[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
      dispatch(setUserData(currentUser?.user));
    }
  }, [currentUser]);

  useEffect(() => {
    if (dashboardData?.data) {
      setBanner(dashboardData?.data?.banners);
      setCategories(dashboardData?.data?.categories);
      setHotBrands(dashboardData?.data?.brands);
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

  const onPressNotification = () => {
    navigation.navigate(Route.navAlert);
  };
  const onPressSearch = () => {
    navigation.navigate(Route.navSearchProduct);
  };
  const onPressSeeAllCategories = () => {
    navigation.navigate(Route.navAllCategories);
  };
  const onPressCategory = (item: any) => {};
  const onPressHotBrands = (item: any) => {};
  const onPressSeeAllHotBrands = () => {};
  const onPressBanner = () => {
    // navigation.navigate(Route.navModeOfDelivery);
    // navigation.navigate(Route.navDeliveryAddress);
    // navigation.navigate(Route.navAuthentication, {
    //   screen: Route.navTakeSelfie,
    // });
  };

  return (
    <View style={style.container}>
      <HeaderHome
        name={name}
        onPressNotification={onPressNotification}
        onPressSearch={onPressSearch}
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
                HotBrandsData={hotBrands}
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
}));
