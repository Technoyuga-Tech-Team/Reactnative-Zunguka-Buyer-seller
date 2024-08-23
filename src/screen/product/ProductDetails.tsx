import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, RefreshControl, StatusBar, View } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ProductInfo from "../../components/Product/ProductInfo";
import ProductBanner from "../../components/ProductBanner";
import CustomButton from "../../components/ui/CustomButton";
import ProductHeader from "../../components/ui/ProductHeader";
import { HAS_NOTCH, SCREEN_WIDTH } from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useProductDetails } from "../../hooks/useProductDetails";
import {
  deleteProduct,
  likeDislikeProduct,
} from "../../store/Product/product.thunk";
import { selectUserData } from "../../store/settings/settings.selectors";
import { setProductInfo } from "../../store/settings/settings.slice";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import {
  ProductDetailsDataProps,
  productImage,
} from "../../types/product.types";
import { onShare } from "../../utils";
import Scale from "../../utils/Scale";

const ProductDetails: React.FC<
  HomeNavigationProps<Route.navProductDetails>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { itemId } = route.params;

  const userData = useSelector(selectUserData);

  const [productDetails, setProductDetails] =
    useState<ProductDetailsDataProps | null>(null);
  const [savedItem, setSavedItem] = useState<boolean>(false);

  const [productBannerData, setProductBannerData] = useState<productImage[]>(
    []
  );
  const [payablePrice, setPayablePrice] = useState<string>("");
  const [priceForPlatForm, setPriceForPlatForm] = useState<string>("");
  const [sellerWillGetPrice, setSellerWillGetPrice] = useState<string>("");

  const [productLikes, setProductLikes] = useState(0);
  const [loader, setLoader] = useState(true);

  const is_CurrentUsers_product = userData?.id == productDetails?.user_id;

  const {
    data: productDetailsData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useProductDetails(itemId, {
    staleTime: Infinity,
    cacheTime: 0,
    enabled: false,
  });

  useEffect(() => {
    const init = async () => {
      await RNBootSplash.hide();
    };
    init();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (productDetailsData?.data) {
      setProductDetails(productDetailsData?.data);
      setProductLikes(productDetailsData?.data?.likes_count);
      setProductBannerData(productDetailsData?.data?.images);
      setSavedItem(productDetailsData?.data?.is_like);
      let price1 = (productDetailsData?.data?.sale_price * 5) / 100;
      setPriceForPlatForm(price1.toString());
      let mainPrice = productDetailsData?.data?.sale_price - price1;
      setSellerWillGetPrice(mainPrice.toString());
      let payable_price = is_CurrentUsers_product
        ? mainPrice
        : productDetailsData?.data?.sale_price;
      setPayablePrice(payable_price.toString());
    }
  }, [productDetailsData, is_CurrentUsers_product]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setTranslucent(true);
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: Route.navDashboard,
              state: {
                routes: [{ name: Route.navSell }],
              },
            },
          ],
        })
      );
    }
  };
  const onPressShare = () => {
    onShare(`Link will here for product`);
  };
  const onPressDelete = () => {
    Alert.alert("", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "Yes",
        onPress: () => deleteItem(),
      },
    ]);
  };
  const deleteItem = async () => {
    const result = await dispatch(deleteProduct({ id: productDetails?.id }));
    if (deleteProduct.fulfilled.match(result)) {
      if (result.payload?.status === 1) {
        navigation.goBack();
      }
    } else {
      console.log("errror deleteProduct --->", result.payload);
    }
  };
  const onPressSavedItem = async () => {
    setSavedItem(!savedItem);
    try {
      const result = await dispatch(
        likeDislikeProduct({
          item_id: productDetails?.id,
          type: savedItem ? "dislike" : "like",
        })
      );
      if (likeDislikeProduct.fulfilled.match(result)) {
        if (result.payload) {
          console.log("response likeDislikeProduct --->", result.payload);
          refetch();
        }
      } else {
        console.log("errror likeDislikeProduct --->", result.payload);
      }
    } catch (error) {
      console.log("errror likeDislikeProduct --->", error);
    }
  };

  const onPressBuyProduct = () => {
    const is_OutOf_Kigali =
      (productDetails?.district || productDetails?.sector) == "Out of Kigali";

    productDetails &&
      dispatch(
        setProductInfo({
          id: productDetails?.id,
          price: productDetails?.sale_price,
          isOutOfKigali: is_OutOf_Kigali,
          name: productDetails?.title,
          sellerName: productDetails?.user?.username,
          sellerPhone: productDetails?.user?.phone_number,
          modeOfTransport: productDetails?.mode_of_transport,
        })
      );
    if (is_OutOf_Kigali) {
      navigation.navigate(Route.navPayment, {
        deliveryPrice: "",
        modeOfDelivery: "",
      });
    } else {
      navigation.navigate(Route.navDeliveryAddress);
    }
  };

  const onPressMessage = () => {
    navigation.navigate(Route.navChatroom, {
      receiver_id: `${productDetails?.user_id}`,
      product_id: `${productDetails?.id}`,
    });
  };

  const onRefresh = () => {
    refetch();
  };

  console.log("productDetails", productDetails);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={onRefresh}
          tintColor={theme?.colors?.primary}
          // @ts-ignore
          colors={[theme?.colors?.primary]}
        />
      }
    >
      <StatusBar
        translucent
        backgroundColor={theme.colors?.transparent}
        barStyle={"light-content"}
      />
      {/* {isFetching && <Loading />} */}
      <ProductBanner productBannerData={productBannerData} />
      <View style={style.header}>
        <ProductHeader
          onPressBack={onPressBack}
          onPressShare={onPressShare}
          showDelete={is_CurrentUsers_product}
          onPressDelete={onPressDelete}
        />
      </View>
      <ProductInfo
        productDetails={productDetails}
        onPressSavedItem={onPressSavedItem}
        isProductLike={savedItem}
        productLikes={productLikes}
        onPressMessage={onPressMessage}
        isCurrentUsersProduct={is_CurrentUsers_product}
      />
      {/* <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={style.txtPlatform}>Selling price : </Text>
          <Text style={[style.txtPlatform, { color: theme.colors?.pinkDark }]}>
            R₣{productDetails?.sale_price}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={style.txtPlatform}>Transport fee (5%) : </Text>
          <Text style={[style.txtPlatform, { color: theme.colors?.pinkDark }]}>
            R₣{priceForPlatForm}
          </Text>
        </View>
        {!is_CurrentUsers_product && (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text style={style.txtPlatform}>Seller will get : </Text>
            <Text
              style={[style.txtPlatform, { color: theme.colors?.pinkDark }]}
            >
              R₣{sellerWillGetPrice}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={style.txtPlatform}>
            {is_CurrentUsers_product
              ? "Total receivable amount : "
              : "Total payable amount : "}
          </Text>
          <Text
            style={[
              style.txtPlatform,
              {
                color: theme.colors?.primary,
                fontFamily: theme?.fontFamily?.bold,
              },
            ]}
          >
            R₣{payablePrice}
          </Text>
        </View>
      </View> */}
      {!is_CurrentUsers_product && (
        <View style={style.button}>
          <CustomButton
            onPress={onPressMessage}
            title={"Message seller"}
            buttonWidth="half"
            width={(SCREEN_WIDTH - 50) / 2}
            variant="secondary"
            type="outline"
          />
          <CustomButton
            onPress={onPressBuyProduct}
            title={"Buy Product"}
            buttonWidth="half"
            width={(SCREEN_WIDTH - 50) / 2}
            variant="primary"
            type="solid"
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default ProductDetails;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors?.background,
    zIndex: 1,
  },
  header: {
    height: Scale(50),
    width: SCREEN_WIDTH,
    position: "absolute",
    zIndex: 11,
    top: props.insets.top + 10,
  },
  button: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom:
      Platform.OS === "ios"
        ? HAS_NOTCH
          ? props.insets.bottom
          : props.insets.bottom + 10
        : props.insets.bottom + 10,
  },
  txtPlatform: {
    fontSize: theme.fontSize?.fs14,
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.medium,
  },
}));
