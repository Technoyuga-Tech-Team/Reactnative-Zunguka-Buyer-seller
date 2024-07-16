import React from "react";
import { View, Text, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import CustomButton from "../../components/ui/CustomButton";
import { PRODUCTS, SCREEN_WIDTH } from "../../constant";
import ProductListing from "../../components/Product/ProductListing";
import { Route } from "../../constant/navigationConstants";
import { HomeNavigationProps } from "../../types/navigation";

const Sell: React.FC<HomeNavigationProps<Route.navSell>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const loading = false;

  const onPressProduct = () => {
    navigation.navigate(Route.navProductDetails);
  };
  const onRefresh = () => {};
  const onPressCreateListing = () => {
    navigation.navigate(Route.navAddNewProduct);
  };
  return (
    <View style={style.container}>
      <Text style={style.txtTitle}>Selling</Text>
      <View style={style.button}>
        <CustomButton
          onPress={onPressCreateListing}
          title={"Create new listing"}
          buttonWidth="half"
          width={SCREEN_WIDTH - 50}
          variant="secondary"
          type="outline"
        />
      </View>
      <ProductListing
        productData={PRODUCTS}
        onPress={onPressProduct}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
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
    marginVertical: 15,
  },
}));
