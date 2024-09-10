import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductListing from "../../components/Product/ProductListing";
import { BASE_URL, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ThemeProps } from "../../types/global.types";
import { MyFrontStoreNavigationProps } from "../../types/navigation";
import { ProductDataProps } from "../../types/product.types";
import { getData } from "../../utils/asyncStorage";
import Scale from "../../utils/Scale";
import { sendRequestToNearbyMovers } from "../../store/Product/product.thunk";

const ClosedItems: React.FC<
  MyFrontStoreNavigationProps<Route.navClosedItems>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [dealsData, setDealsData] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getClosedData(10, 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getClosedData = async (offset: number, page: number) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_PRODUCTS}/closed/my/${offset}/${page}`,
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
          setDealsData(data?.data?.data);
          setTotalPage(data?.data?.totalPages);
          setPage(page + 1);
        }
      } else {
        setDealsData([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getClosedData(10, page);
    }
  };

  const onPressProductItem = (itemId: number, item: ProductDataProps) => {
    navigation.navigate(Route.navArchivedProductDetails, { item: item });
  };

  const onPressHireMover = async (itemId: number) => {
    try {
      const formData = new FormData();
      formData.append("item_id", itemId);
      const result = await dispatch(sendRequestToNearbyMovers({ formData }));
      if (sendRequestToNearbyMovers.fulfilled.match(result)) {
        if (result.payload.status === 1) {
          getClosedData(10, 1);
          navigation.navigate(Route.navRequestToMover);
          console.log("result sendRequestToNearbyMovers --->", result.payload);
        }
      } else {
        console.log("errror sendRequestToNearbyMovers --->", result.payload);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={style.container}>
      <ProductListing
        productData={dealsData}
        onPress={(itemId, item) => onPressProductItem(itemId, item)}
        onPressHireMover={(itemId) => onPressHireMover(itemId)}
        onEndReached={onEndReached}
        isLoading={loading}
        showLoadMore={page <= totalPage}
        fromClosedItem={true}
      />
    </View>
  );
};

export default ClosedItems;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: 10,
  },
  textInputCont: {
    height: Scale(40),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors?.borderButtonColor,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  txtInput: {
    height: Scale(50),
    flex: 1,
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
  },
  listCont: {
    flex: 1,
    paddingBottom: 110,
    marginTop: 10,
  },
}));
