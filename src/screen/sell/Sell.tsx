import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductListing from "../../components/Product/ProductListing";
import CustomButton from "../../components/ui/CustomButton";
import {
  ADMIN_ADDRESS_VERIFICATION_PENDING_MESSAGE,
  ADMIN_VERIFICATION_PENDING_MESSAGE,
  BASE_URL,
  GUEST_USER_MESSAGE,
  SCREEN_WIDTH,
  secureStoreKeys,
} from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import {
  HomeNavigationProps,
  TopItemsRoutes,
  TopRoutes,
} from "../../types/navigation";
import { ProductDataProps } from "../../types/product.types";
import { getData } from "../../utils/asyncStorage";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/settings/settings.selectors";
import { notifyMessage } from "../../utils/notifyMessage";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setErrors, setSuccess } from "../../store/global/global.slice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyTabBar from "./MyTabBar";
import DraftProductList from "../product/DraftProductList";
import PublishItems from "./PublishItems";

const Sell: React.FC<HomeNavigationProps<Route.navSell>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);

  const userData = useSelector(selectUserData);
  const isGuest = userData?.is_guest == 1;
  const admin_verification_completed =
    userData?.is_selfie_uploaded == 1 &&
    userData?.is_kyc_verified_by_admin == 1;

  const admin_address_verification_completed =
    userData?.all_documentation_approved_by_admin == 1;

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

  const onPressProduct = (itemId: number, item: ProductDataProps) => {
    if (item.status == "Archived") {
      navigation.navigate(Route.navArchivedProductDetails, { item: item });
    } else {
      navigation.navigate(Route.navProductDetails, { itemId: itemId });
    }
  };

  const onPressCreateListing = () => {
    if (!isGuest) {
      if (admin_verification_completed) {
        if (admin_address_verification_completed) {
          navigation.navigate(Route.navAddNewProduct, { product_id: null });
        } else {
          dispatch(setSuccess(ADMIN_ADDRESS_VERIFICATION_PENDING_MESSAGE));
        }
      } else {
        dispatch(setSuccess(ADMIN_VERIFICATION_PENDING_MESSAGE));
      }
    } else {
      dispatch(setSuccess(GUEST_USER_MESSAGE));
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

  console.log("products", JSON.stringify(products));

  const Tab = createMaterialTopTabNavigator<TopItemsRoutes>();

  return (
    <View style={style.container}>
      <Text style={style.txtTitle}>Selling</Text>
      <View style={style.button}>
        <CustomButton
          onPress={onPressCreateListing}
          title={"Create new listing"}
          buttonWidth="half"
          width={SCREEN_WIDTH - 40}
          variant="secondary"
          type="outline"
        />
      </View>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name={Route.navPublishItems} component={PublishItems} />
        <Tab.Screen name={Route.navDraftItems} component={DraftProductList} />
      </Tab.Navigator>
      {/* <ProductListing
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
      /> */}
    </View>
  );
};

export default Sell;

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
    marginTop: 15,
  },
}));
