import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import {
  GetProductDetailsDataProps,
  ProductDataProps,
  ProductDetailsDataProps,
} from "../../types/product.types";
import { useGetPurchasedHistory } from "../../hooks/useGetPurchasedHistory";
import CustomHeader from "../../components/ui/CustomHeader";
import ProductListing from "../../components/Product/ProductListing";
import { BASE_URL, HAS_NOTCH, secureStoreKeys } from "../../constant";
import { getData } from "../../utils/asyncStorage";
import { API } from "../../constant/apiEndpoints";

const PurchasedHistory: React.FC<
  HomeNavigationProps<Route.navPurchasedHistory>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loader, setLoader] = useState(true);
  const [fetchMore, setFetchMore] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [purchasedProduct, setPurchasedProduct] = useState<ProductDataProps[]>(
    []
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPurchasedHistory(10, 1, false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getPurchasedHistory = async (
    limit: number,
    page: number,
    fromLoadMore: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      // ${API.GET_PURCHASED_PRODUCTS}?limit=10&offset=${page}
      const response = await fetch(
        `${BASE_URL}${API.GET_PURCHASED_PRODUCTS}?limit=${limit}&offset=${page}`,
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
        setLoading(false);
        if (data && data?.data?.data.length > 0) {
          fromLoadMore
            ? setPurchasedProduct([...purchasedProduct, data?.data?.data])
            : setPurchasedProduct(data?.data?.data);
          setTotalPage(data?.data?.totalPages);
          setPage(page + 1);
        }
      } else {
        setPurchasedProduct([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // const {
  //   data: productData,
  //   refetch,
  //   isLoading,
  //   error,
  // } = useGetPurchasedHistory(`${fetchMore}`, { enabled: false, cacheTime: 0 });

  // useEffect(() => {
  //   setLoader(isLoading);
  // }, [isLoading]);

  // useEffect(() => {
  //   setPurchasedProduct([]);
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setFetchMore(1);
  //     refetch();
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("productData =  = =", productData?.data?.data);
  //   if (productData?.data?.data && productData?.data?.data?.length > 0) {
  //     setPurchasedProduct([...purchasedProduct, ...productData?.data?.data]);
  //     setTotalPage(productData?.data?.totalPages);
  //     setFetchMore(fetchMore + 1);
  //     setFetchMoreLoading(false);
  //   }
  //   if (error) {
  //     setFetchMoreLoading(false);
  //     setPurchasedProduct([]);
  //   }
  // }, [productData, error]);

  const onPressProductItem = (itemId: number) => {
    navigation.navigate(Route.navProductDetails, { itemId: itemId });
  };

  const onPressMoverBook = (itemId: number) => {};

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getPurchasedHistory(10, page, true);
    }
  };
  console.log("purchasedProduct = =", JSON.stringify(purchasedProduct));

  const onPressProduct = (id, item) => {
    console.log("id = = ", id);
    console.log("item = = ", item);
  };

  return (
    <View style={style.container}>
      {/* {!loading && isFetching && <Loading />} */}
      <CustomHeader title="Purchased History" />
      {/* <ProductListing
        productData={purchasedProduct}
        onPressProductItem={(item: number) => onPressProductItem(item)}
        onPressMoverBook={(item: number) => onPressMoverBook(item)}
        onEndReached={onEndReached}
        fromPurchased={true}
        isLoading={fetchMoreLoading || loader}
      /> */}
      <ProductListing
        isLoading={loader}
        productData={purchasedProduct}
        fromPurchase={true}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loader}
        //     onRefresh={onRefresh}
        //     tintColor={theme?.colors?.primary}
        //   />
        // }
        onPress={onPressProduct}
        onEndReached={onEndReached}
        // showLoadMore={page <= totalPage}
      />
    </View>
  );
};

export default PurchasedHistory;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
    paddingBottom:
      Platform.OS === "ios"
        ? HAS_NOTCH
          ? props.insets.bottom
          : props.insets.bottom + 10
        : props.insets.bottom + 10,
  },
  listCont: {
    flex: 1,
    marginTop: 10,
  },
}));
