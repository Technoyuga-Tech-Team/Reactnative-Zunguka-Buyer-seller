import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductListing from "../components/Product/ProductListing";
import { BASE_URL, secureStoreKeys, USER_DATA } from "../constant";
import { API } from "../constant/apiEndpoints";
import { Route } from "../constant/navigationConstants";
import { ThemeProps } from "../types/global.types";
import { HomeNavigationProps } from "../types/navigation";
import { ProductDataProps } from "../types/product.types";
import { getData, setData } from "../utils/asyncStorage";
import { useSelector } from "react-redux";
import { selectUserData } from "../store/settings/settings.selectors";
import LoginToZunguka from "../components/ui/LoginToZunguka";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/authentication/authentication.thunks";
import notifee from "@notifee/react-native";
import { setUserData } from "../store/settings/settings.slice";
import { CommonActions } from "@react-navigation/native";

const Favorites: React.FC<HomeNavigationProps<Route.navFavourites>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savedProduct, setSavedProduct] = useState<ProductDataProps[]>([]);

  const userData = useSelector(selectUserData);

  const isGuest = userData?.is_guest == 1;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSavedProducts(10, 1, true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getSavedProducts = async (
    limit: number,
    page: number,
    refresh: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_SAVED_PRODUCTS}/${limit}/${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("data", data);
      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setLoading(false);
        refresh
          ? setSavedProduct([...data?.data?.data])
          : setSavedProduct([...savedProduct, ...data?.data?.data]);

        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
      } else {
        setSavedProduct([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onPressProduct = (itemId: number) => {
    navigation.navigate(Route.navProductDetails, { itemId: itemId });
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getSavedProducts(10, page, false);
    }
  };

  const onRefresh = () => {
    setSavedProduct([]);
    getSavedProducts(10, 1, true);
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

  return (
    <View style={style.container}>
      <Text style={style.txtHeaderTitle}>Favorites</Text>
      {!isGuest ? (
        <ProductListing
          isLoading={loading}
          productData={savedProduct}
          onPress={onPressProduct}
          onEndReached={onEndReached}
          showLoadMore={page <= totalPage}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={theme?.colors?.primary}
              // @ts-ignore
              colors={[theme?.colors?.primary]}
            />
          }
        />
      ) : (
        <LoginToZunguka onPressLogin={onPressLogin} />
      )}
    </View>
  );
};

export default Favorites;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  txtHeaderTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 10,
  },
}));
