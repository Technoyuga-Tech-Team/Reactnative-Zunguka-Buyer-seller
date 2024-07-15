import { View, Text } from "react-native";
import React, { useState } from "react";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import CustomSearchBarWithSortAndFilter from "../../components/CustomSearchBarWithSortAndFilter";
import ProductListing from "../../components/Product/ProductListing";
import { PRODUCTS } from "../../constant";
import LogoutPopup from "../../components/ui/popups/LogoutPopup";
import SortProduuctPopup from "../../components/ui/popups/SortProduuctPopup";
import FilterProductPopup from "../../components/ui/popups/FilterProductPopup";
import CustomRangeSlider from "../../components/Slider/CustomRangeSlider";

const SearchProducts: React.FC<HomeNavigationProps<Route.navSearchProduct>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [sliderVal, setSliderVal] = useState({ low: 50, high: 500 });

  const onChangeText = (val: string) => {
    setSearch(val);
  };

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressProduct = () => {
    navigation.navigate(Route.navProductDetails);
  };

  const toggleFilterPopup = () => {
    setVisibleFilter(!visibleFilter);
  };

  const onPressFilter = () => {
    toggleFilterPopup();
  };

  const onPressShowItems = () => {
    togglePopup();
  };

  const onPressSort = () => {
    setVisible(true);
  };

  const togglePopup = () => {
    setVisible(!visible);
  };
  return (
    <View style={style.container}>
      <CustomSearchBarWithSortAndFilter
        onPressBack={onPressBack}
        onPressFilter={onPressFilter}
        onPressSort={onPressSort}
        search={search}
        onChangeText={onChangeText}
      />

      <ProductListing productData={PRODUCTS} onPress={onPressProduct} />

      <SortProduuctPopup
        visiblePopup={visible}
        togglePopup={togglePopup}
        onPressShowItems={onPressShowItems}
      />
      <FilterProductPopup
        visiblePopup={visibleFilter}
        togglePopup={toggleFilterPopup}
      />
    </View>
  );
};

export default SearchProducts;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    backgroundColor: theme.colors?.background,
  },
}));
