import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import BottomTabBar from "./BottomTabBar";
import RNBootSplash from "react-native-bootsplash";
import { BottomRoutes } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import Home from "../../screen/Home";

const Bottombar = () => {
  const Tab = createBottomTabNavigator<BottomRoutes>();
  useEffect(() => {
    const init = async () => {
      await RNBootSplash.hide();
    };
    init();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={Route.navHome}
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name={Route.navHome} component={Home} />
      <Tab.Screen name={Route.navFavourites} component={Home} />
      <Tab.Screen name={Route.navSell} component={Home} />
      <Tab.Screen name={Route.navInbox} component={Home} />
      <Tab.Screen name={Route.navProfile} component={Home} />
    </Tab.Navigator>
  );
};

export default Bottombar;
