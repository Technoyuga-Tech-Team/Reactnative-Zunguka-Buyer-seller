import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import ClosedItems from "./ClosedItems";
import MyTabBar from "./MyTabBar";
import OpenItems from "./OpenItems";
import { TopRoutes } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import CustomHeader from "../../components/ui/CustomHeader";
import OngoingItems from "./OngoingItems";

const MyStorefront = () => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const Tab = createMaterialTopTabNavigator<TopRoutes>();
  return (
    <View style={style.scrollCont}>
      <CustomHeader title="My Items and Deals" />
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name={Route.navOpenItems} component={OpenItems} />
        <Tab.Screen name={Route.navOngoingItems} component={OngoingItems} />
        <Tab.Screen name={Route.navClosedItems} component={ClosedItems} />
      </Tab.Navigator>
    </View>
  );
};

export default MyStorefront;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollCont: {
    flex: 1,
    paddingTop: props.insets.top,
    backgroundColor: theme.colors?.background,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs20,
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.medium,
    alignSelf: "center",
    marginTop: 10,
  },
}));
