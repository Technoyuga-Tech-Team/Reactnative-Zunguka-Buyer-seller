import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
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
import BuyerSellerTabView from "../sell/buyerSellerTab";
import { BASE_URL, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { getData } from "../../utils/asyncStorage";

const MyStorefront = () => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const [ongoingCount, setOngoingCount] = useState(0);
  const [selectedBuyerSellerTab, setSelectedBuyerSellerTab] = useState(1);

  const Tab = createMaterialTopTabNavigator<TopRoutes>();

  const getOngoingCountFromApi = async () => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);

    const response = await fetch(
      `${BASE_URL}${API.GET_PRODUCTS}/closed/my/${1}/${1}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    let mydata = data?.data?.data;

    const filteredData = mydata?.filter((item) => {
      return item.is_delivered !== 1;
    });

    setOngoingCount(filteredData?.length || 0);
  };

  useEffect(() => {
    getOngoingCountFromApi();
  }, []);

  return (
    <View style={style.scrollCont}>
      <CustomHeader title="My Deals" />
      {/* <BuyerSellerTabView
        selectedBuyerSellerTab={selectedBuyerSellerTab}
        setSelectedBuyerSellerTab={setSelectedBuyerSellerTab}
      /> */}
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} ongoingCount={ongoingCount} />}
      >
        <Tab.Screen
          name={Route.navOpenItems}
          component={OpenItems}
          initialParams={{ displayLabel: true }}
        />
        <Tab.Screen
          name={Route.navOngoingItems}
          component={OngoingItems}
          initialParams={{ displayLabel: true }}
        />
        <Tab.Screen
          name={Route.navClosedItems}
          component={ClosedItems}
          initialParams={{ displayLabel: true }}
        />
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
