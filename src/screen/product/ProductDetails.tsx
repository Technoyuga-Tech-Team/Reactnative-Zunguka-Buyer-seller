import { View, Text, StatusBar, Platform } from "react-native";
import React from "react";
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

const ProductDetails: React.FC<
  HomeNavigationProps<Route.navProductDetails>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  React.useEffect(() => {
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
      <ProductBanner />
      <View style={style.header}>
        <ProductHeader onPressBack={onPressBack} onPressShare={onPressShare} />
      </View>
      <ProductInfo />
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
