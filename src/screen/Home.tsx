import { View, Text, StatusBar, Platform } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import HeaderHome from "../components/HeaderHome";
import { useSelector } from "react-redux";
import { selectUserData } from "../store/settings/settings.selectors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HomeBanner from "../components/HomeBanner";
import SeeAllItem from "../components/SeeAllItem";
import { CATEGORIES, HOT_BRANDS } from "../constant";
import CategoryListing from "../components/Categories/CategoryListing";
import HotBrandsListing from "../components/HotBrands/HotBrandsListing";
import { HomeNavigationProps } from "../types/navigation";
import { Route } from "../constant/navigationConstants";

const Home: React.FC<HomeNavigationProps<Route.navHome>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const userData = useSelector(selectUserData);

  const [name, setName] = useState({
    fname: userData?.first_name,
    lname: userData?.last_name,
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setName({
        fname: userData?.first_name,
        lname: userData?.last_name !== null ? userData?.last_name : "",
      });
    });
    return () => {
      unsubscribe();
    };
  }, [userData]);

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

  const onPressNotification = () => {
    navigation.navigate(Route.navAlert);
  };
  const onPressSearch = () => {
    navigation.navigate(Route.navSearchProduct);
  };
  const onPressSeeAllCategories = () => {};
  const onPressCategory = (item: any) => {};
  const onPressHotBrands = (item: any) => {};
  const onPressSeeAllHotBrands = () => {};
  return (
    <View style={style.container}>
      <StatusBar
        translucent
        backgroundColor={theme.colors?.transparent}
        barStyle={"dark-content"}
      />
      <HeaderHome
        name={`${name?.fname} ${name?.lname}`}
        onPressNotification={onPressNotification}
        onPressSearch={onPressSearch}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={style.scrollCont}
        showsVerticalScrollIndicator={false}
      >
        <HomeBanner />
        <View style={style.innerCont}>
          <SeeAllItem
            title="Categories"
            onPressSeeAll={onPressSeeAllCategories}
          />
          <CategoryListing
            CategoryData={CATEGORIES}
            onPressCategory={(item) => onPressCategory(item)}
          />
          <SeeAllItem
            title="Hot Brands"
            onPressSeeAll={onPressSeeAllHotBrands}
          />
          <HotBrandsListing
            HotBrandsData={HOT_BRANDS}
            onPressHotBrands={(item) => onPressHotBrands(item)}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Home;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
  },
  scrollCont: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  innerCont: {
    paddingHorizontal: 20,
  },
}));
