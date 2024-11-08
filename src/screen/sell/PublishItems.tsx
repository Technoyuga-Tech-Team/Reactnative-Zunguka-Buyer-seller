import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../utils/asyncStorage";
import { BASE_URL, secureStoreKeys } from "../../constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { API } from "../../constant/apiEndpoints";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ProductDataProps } from "../../types/product.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ProductListing from "../../components/Product/ProductListing";
import { Route } from "../../constant/navigationConstants";

const PublishItems = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);

  const userData = useSelector(selectUserData);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMyProductProducts(10, 1, true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getMyProductProducts = async (
    limit: number,
    page: number,
    refresh: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_PRODUCTS}/all/my/${limit}/${page}`,
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
        setLoader(false);
        refresh
          ? setProducts([...data?.data?.data])
          : setProducts([...products, ...data?.data?.data]);
        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
      } else {
        setProducts([]);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };
  const onEndReached = () => {
    if (page <= totalPage && !loader) {
      getMyProductProducts(10, page, false);
    }
  };
  const onRefresh = () => {
    getMyProductProducts(10, 1, true);
  };

  const onPressProduct = (itemId: number, item: ProductDataProps) => {
    if (item.status == "Archived") {
      navigation.navigate(Route.navArchivedProductDetails, { item: item });
    } else {
      navigation.navigate(Route.navProductDetails, { itemId: itemId });
    }
  };
  return (
    <View style={style.container}>
      <ProductListing
        isLoading={loader}
        productData={products}
        onPress={onPressProduct}
        onEndReached={onEndReached}
        showLoadMore={page <= totalPage}
        refreshControl={
          <RefreshControl
            refreshing={loader}
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

export default PublishItems;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  txtTitle: {
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.bold,
    fontSize: theme.fontSize?.fs20,
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    marginVertical: 15,
  },
}));
