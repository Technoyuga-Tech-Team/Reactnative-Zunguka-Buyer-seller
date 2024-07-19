import { View, Text, StatusBar, Platform, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductBanner from "../../components/ProductBanner";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Scale from "../../utils/Scale";
import ProductHeader from "../../components/ui/ProductHeader";
import { HAS_NOTCH, SCREEN_WIDTH } from "../../constant";
import ProductInfo from "../../components/Product/ProductInfo";
import CustomButton from "../../components/ui/CustomButton";
import { CommonActions } from "@react-navigation/native";
import { useProductDetails } from "../../hooks/useProductDetails";
import RNBootSplash from "react-native-bootsplash";
import {
  ProductDetailsDataProps,
  productImage,
} from "../../types/product.types";
import Loading from "../../components/ui/Loading";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  deleteProduct,
  likeDislikeProduct,
} from "../../store/Product/product.thunk";

const ProductDetails: React.FC<
  HomeNavigationProps<Route.navProductDetails>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { itemId } = route.params;

  const [productDetails, setProductDetails] =
    useState<ProductDetailsDataProps | null>(null);
  const [savedItem, setSavedItem] = useState<boolean>(false);

  const [productBannerData, setProductBannerData] = useState<productImage[]>(
    []
  );

  const {
    data: productDetailsData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useProductDetails(itemId, { cacheTime: 0, enabled: false });

  useEffect(() => {
    const init = async () => {
      await RNBootSplash.hide();
    };
    init();
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (productDetailsData?.data) {
      setProductDetails(productDetailsData?.data);
      setProductBannerData(productDetailsData?.data?.images);
      setSavedItem(productDetailsData?.data?.is_like);
    }
  }, [productDetailsData]);

  console.log("productDetails", productDetails);

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
  const onPressShare = () => {};
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

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      <StatusBar
        translucent
        backgroundColor={theme.colors?.transparent}
        barStyle={"light-content"}
      />
      {(isLoading || isFetching) && <Loading />}
      <ProductBanner productBannerData={productBannerData} />
      <View style={style.header}>
        <ProductHeader
          onPressBack={onPressBack}
          onPressShare={onPressShare}
          onPressDelete={onPressDelete}
        />
      </View>
      <ProductInfo
        productDetails={productDetails}
        onPressSavedItem={onPressSavedItem}
        isProductLike={savedItem}
      />
      <View style={style.button}>
        <CustomButton
          title={"Message seller"}
          buttonWidth="half"
          width={(SCREEN_WIDTH - 50) / 2}
          variant="secondary"
          type="outline"
        />
        <CustomButton
          title={"Buy Product"}
          buttonWidth="half"
          width={(SCREEN_WIDTH - 50) / 2}
          variant="primary"
          type="solid"
        />
      </View>
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
}));
