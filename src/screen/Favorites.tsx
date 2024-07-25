import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import ProductListing from "../components/Product/ProductListing";
import { ProductDataProps } from "../types/product.types";
import { HomeNavigationProps } from "../types/navigation";
import { Route } from "../constant/navigationConstants";
import { useGetProducts } from "../hooks/useGetProducts";
import { getData } from "../utils/asyncStorage";
import { BASE_URL, secureStoreKeys } from "../constant";
import { API } from "../constant/apiEndpoints";

const Favorites: React.FC<HomeNavigationProps<Route.navFavourites>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savedProduct, setSavedProduct] = useState<ProductDataProps[]>([]);

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

  return (
    <View style={style.container}>
      <Text style={style.txtHeaderTitle}>Favorites</Text>
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
    marginVertical: 20,
  },
}));
