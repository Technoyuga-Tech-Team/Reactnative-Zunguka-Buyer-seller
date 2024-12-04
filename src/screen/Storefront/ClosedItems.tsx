import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
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
import { useSelector } from "react-redux";
import { getClosedItem } from "../../store/settings/settings.selectors";

const ClosedItems: React.FC<
  MyFrontStoreNavigationProps<Route.navClosedItems>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const flatlistRef = useRef<FlatList>(null);
  const displayLabel = route?.params?.displayLabel;

  const packageId = route.params?.packageId;
  const closedItems = useSelector(getClosedItem);

  const [packageIndex, setPackageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [dealsData, setDealsData] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (closedItems?.length > 0) {
      setDealsData(closedItems);
    }
  }, [closedItems]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getClosedData(10, 1, false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getClosedData = async (
    offset: number,
    page: number,
    fromLoadMore: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_PRODUCTS}/delivered/my/${offset}/${page}`,
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
            ? setDealsData([...dealsData, data?.data?.data])
            : setDealsData(data?.data?.data);
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

  useEffect(() => {
    if (packageId !== "" && dealsData.length > 0) {
      let ind = dealsData.findIndex((ele) => ele.id === Number(packageId));
      if (ind !== -1) {
        setPackageIndex(ind);
        setTimeout(() => {
          flatlistRef?.current?.scrollToIndex({
            index: ind,
            animated: true,
          });
        }, 1000);
      }
    }
  }, [packageId, dealsData]);

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getClosedData(10, page, true);
    }
  };

  const onPressProductItem = (itemId: number, item: ProductDataProps) => {
    setPackageIndex(null);
    navigation.navigate(Route.navArchivedProductDetails, { item: item });
  };

  const onPressHireMover = async (itemId: number) => {
    setPackageIndex(null);
    try {
      const formData = new FormData();
      formData.append("item_id", itemId);
      const result = await dispatch(sendRequestToNearbyMovers({ formData }));
      if (sendRequestToNearbyMovers.fulfilled.match(result)) {
        if (result.payload.status === 1) {
          console.log("result sendRequestToNearbyMovers --->", result.payload);
          getClosedData(10, 1, false);
          // navigation.navigate(Route.navRequestToMover);
        }
      } else {
        console.log("errror sendRequestToNearbyMovers --->", result.payload);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onRefresh = () => {
    getClosedData(10, 1, false);
  };

  // console.log("dealsData", JSON.stringify(dealsData));

  return (
    <View style={style.container}>
      <ProductListing
        displayLabel={displayLabel}
        ref={flatlistRef}
        productData={dealsData}
        onPress={(itemId, item) => onPressProductItem(itemId, item)}
        onPressHireMover={(itemId) => {
          Alert.alert("Hire Mover", "Is items packed and ready to ship?", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "Yes",
              onPress: () => onPressHireMover(itemId),
            },
          ]);
        }}
        onEndReached={onEndReached}
        isLoading={loading}
        showLoadMore={page <= totalPage}
        fromClosedItem={true}
        packageIndex={packageIndex}
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
