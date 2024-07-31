import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyFrontStoreNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ProductListing from "../../components/Product/ProductListing";
import { BASE_URL, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { getData } from "../../utils/asyncStorage";
import { ProductDataProps } from "../../types/product.types";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";

const OpenItems: React.FC<MyFrontStoreNavigationProps<Route.navOpenItems>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dealsData, setDealsData] = useState<ProductDataProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  console.log("dealsData", dealsData);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOpenData(10, 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getOpenData = async (offset: number, page: number) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_PRODUCTS}/my/${offset}/${page}`,
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
      getOpenData(10, page);
    }
  };

  const onPressProductItem = (itemId: number) => {
    navigation.navigate(Route.navProductDetails, { itemId: itemId });
  };

  return (
    <View style={style.container}>
      <ProductListing
        productData={dealsData}
        onPress={(item) => onPressProductItem(item)}
        onEndReached={onEndReached}
        isLoading={loading}
        showLoadMore={page <= totalPage}
      />
    </View>
  );
};

export default OpenItems;

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
