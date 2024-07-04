import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import BottomTabBar from "./BottomTabBar";
import RNBootSplash from "react-native-bootsplash";
import { BottomRoutes } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import Home from "../../screen/Home";
import Profile from "../../screen/profile/Profile";
import Favorites from "../../screen/Favorites";
import Sell from "../../screen/sell/Sell";
import Inbox from "../../screen/Inbox/Inbox";

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
      <Tab.Screen name={Route.navFavourites} component={Favorites} />
      <Tab.Screen name={Route.navSell} component={Sell} />
      <Tab.Screen name={Route.navInbox} component={Inbox} />
      <Tab.Screen name={Route.navProfile} component={Profile} />
    </Tab.Navigator>
  );
};

export default Bottombar;
