import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductListing from "../../components/Product/ProductListing";
import { BASE_URL, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { ProductDataProps } from "../../types/product.types";
import { getData } from "../../utils/asyncStorage";
import Scale from "../../utils/Scale";
import CustomHeader from "../../components/ui/CustomHeader";

const DraftProductList: React.FC<HomeNavigationProps<Route.navDraftItems>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const fromProfile = route.params?.from == "profile";
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [draftData, setDraftData] = useState<ProductDataProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDraftProductsData(10, 1, false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getDraftProductsData = async (
    offset: number,
    page: number,
    fromLoadMore: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_PRODUCTS}/saved_as_draft/my/${offset}/${page}`,
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
            ? setDraftData([...draftData, data?.data?.data])
            : setDraftData(data?.data?.data);
          setTotalPage(data?.data?.totalPages);
          setPage(page + 1);
        }
      } else {
        setDraftData([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getDraftProductsData(10, page, true);
    }
  };

  const onPressProductItem = (itemId: number) => {
    navigation.navigate(Route.navProductDetails, {
      itemId: itemId,
      routeName: route.name,
    });
  };

  const onRefresh = () => {
    getDraftProductsData(10, 1, false);
  };

  return (
    <View style={style.container}>
      {fromProfile && <CustomHeader title="Selling Item" />}
      <ProductListing
        productData={draftData}
        onPress={(item) => onPressProductItem(item)}
        onEndReached={onEndReached}
        isLoading={loading}
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

export default DraftProductList;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
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
