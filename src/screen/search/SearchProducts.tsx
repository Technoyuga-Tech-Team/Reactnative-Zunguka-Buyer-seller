import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomSearchBarWithSortAndFilter from "../../components/CustomSearchBarWithSortAndFilter";
import ProductListing from "../../components/Product/ProductListing";
import FilterProductPopup from "../../components/ui/popups/FilterProductPopup";
import SortProduuctPopup from "../../components/ui/popups/SortProduuctPopup";
import { Route } from "../../constant/navigationConstants";
import { useGetProducts } from "../../hooks/useGetProducts";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { ProductDataProps } from "../../types/product.types";

const SearchProducts: React.FC<HomeNavigationProps<Route.navSearchProduct>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);

  const {
    data: productsData,
    refetch,
    isLoading,
    isError,
  } = useGetProducts("all", `${10}`, `${page}`, {
    enabled: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch().then();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isError && productsData?.data?.data) {
      setProducts([...products, ...productsData?.data?.data]);
      setTotalPage(productsData?.data?.totalPages);
      setPage(page + 1);
    }
  }, [productsData]);

  const onPressProduct = (itemId: number) => {
    navigation.navigate(Route.navProductDetails, { itemId: itemId });
  };

  const onEndReached = () => {
    if (page <= totalPage && !loader) {
      refetch().then();
    }
  };

  const onChangeText = (val: string) => {
    setSearch(val);
  };

  const onPressBack = () => {
    navigation.goBack();
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

      <ProductListing
        isLoading={loader}
        productData={products}
        onPress={onPressProduct}
        onEndReached={onEndReached}
        showLoadMore={page <= totalPage}
      />
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
