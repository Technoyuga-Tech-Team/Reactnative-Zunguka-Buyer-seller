import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View } from "react-native";
import { makeStyles } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/ui/CustomHeader";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import { MoverRequestTopRoutes } from "../../types/navigation";
import MyTabBar from "./MyTabBar";
import OngoingMoverRequest from "./OngoingMoverRequest";
import PastMoverRequest from "./PastMoverRequest";

const MoverRequestTab = () => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const Tab = createMaterialTopTabNavigator<MoverRequestTopRoutes>();
  return (
    <View style={style.scrollCont}>
      <CustomHeader title="Mover Request Page" />
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name={Route.navOngoingMoverRequest}
          component={OngoingMoverRequest}
        />
        <Tab.Screen
          name={Route.navPastMoverRequest}
          component={PastMoverRequest}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MoverRequestTab;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollCont: {
    flex: 1,
    paddingTop: props.insets.top,
    // backgroundColor: theme.colors?.background,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs20,
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.medium,
    alignSelf: "center",
    marginTop: 10,
  },
}));
