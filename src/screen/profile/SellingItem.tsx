import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import {
  HomeNavigationProps,
  SellingItemsRoutes,
  TopItemsRoutes,
} from "../../types/navigation";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyTabBar from "../sell/MyTabBar";
import DraftProductList from "../product/DraftProductList";
import PublishItems from "../sell/PublishItems";
import CustomHeader from "../../components/ui/CustomHeader";
import ClosedItems from "../Storefront/ClosedItems";
import CommanTabBar from "./commanTabBar";

const SellItemsFromProfile: React.FC<
  HomeNavigationProps<Route.navProfileSellingItem>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const Tab = createMaterialTopTabNavigator<SellingItemsRoutes>();

  return (
    <View style={style.container}>
      <CustomHeader title="Selling Item" />
      <Tab.Navigator tabBar={(props) => <CommanTabBar {...props} />}>
        <Tab.Screen name={Route.navDraftItems} component={DraftProductList} />
        <Tab.Screen name={Route.navPublishItems} component={PublishItems} />
        <Tab.Screen
          name={Route.navClosedItems}
          component={ClosedItems}
          initialParams={{ is_seller: true }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default SellItemsFromProfile;

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
