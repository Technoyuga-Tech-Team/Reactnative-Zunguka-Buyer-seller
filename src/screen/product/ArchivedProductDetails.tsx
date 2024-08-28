import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ArchivedProductInfo from "../../components/Product/ArchivedProductInfo";
import ProductBanner from "../../components/ProductBanner";
import ProductHeader from "../../components/ui/ProductHeader";
import { HAS_NOTCH, SCREEN_WIDTH } from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import {
  ProductDetailsDataProps,
  productImage,
} from "../../types/product.types";
import { onShare } from "../../utils";
import Scale from "../../utils/Scale";

const ArchivedProductDetails: React.FC<
  HomeNavigationProps<Route.navArchivedProductDetails>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const productDetails = route.params.item as ProductDetailsDataProps;

  const userData = useSelector(selectUserData);

  const [productBannerData, setProductBannerData] = useState<productImage[]>(
    productDetails?.images
  );

  const [loader, setLoader] = useState(true);

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
      <ProductBanner productBannerData={productBannerData} />
      <View style={style.header}>
        <ProductHeader
          onPressBack={onPressBack}
          onPressShare={onPressShare}
          showDelete={false}
          onPressDelete={() => {}}
        />
      </View>

      <ArchivedProductInfo productDetails={productDetails} />
    </KeyboardAwareScrollView>
  );
};

export default ArchivedProductDetails;

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