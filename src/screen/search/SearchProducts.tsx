import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomSearchBarWithSortAndFilter from "../../components/CustomSearchBarWithSortAndFilter";
import ProductListing from "../../components/Product/ProductListing";
import FilterProductPopup from "../../components/ui/popups/FilterProductPopup";
import SortProduuctPopup from "../../components/ui/popups/SortProduuctPopup";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addProductSearchFilter } from "../../store/Product/product.thunk";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { ProductDataProps } from "../../types/product.types";
import { CommonActions } from "@react-navigation/native";
import { notifyMessage } from "../../utils/notifyMessage";
import {
  setProductInfo,
  setSearchValueforCategory,
  setSelectedDeliveryAddress,
} from "../../store/settings/settings.slice";
import { useSelector } from "react-redux";
import { getSearchValueforCategory } from "../../store/settings/settings.selectors";

const SearchProducts: React.FC<HomeNavigationProps<Route.navSearchProduct>> = ({
  navigation,
  route,
}) => {
  const { subCat, mainCat } = route.params;

  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const search_val = useSelector(getSearchValueforCategory);

  const [visible, setVisible] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchValueForAPI, setSearchValueForAPI] = useState<string>("");
  const [filterItems, setFilterItems] = useState<any>(null);

  const debouncedSearchTerm = useDebounce(searchValueForAPI, 500);

  // useEffect(() => {
  //   if (subCat) {
  //     console.log("called subcat");
  //     setSearchValue(subCat);
  //     getSearchedItems(subCat, 10, 1, true, null, false);
  //   } else if (mainCat) {
  //     console.log("called mainCat");
  //     setSearchValue(mainCat);
  //     getSearchedItems(mainCat, 10, 1, true, null, false);
  //   } else {
  //     getSearchedItems(debouncedSearchTerm, 10, 1, true, null, false);
  //   }
  // }, [mainCat, subCat, debouncedSearchTerm]);

  useEffect(() => {
    if (search_val) {
      setSearchValue(search_val);
      setSearchValueForAPI(search_val);

      getSearchedItems(search_val, 10, 1, true, null, false);
    } else {
      getSearchedItems(debouncedSearchTerm, 10, 1, true, null, false);
    }
  }, [search_val, debouncedSearchTerm]);

  const getSearchedItems = async (
    keyword: string,
    limit: number,
    page: number,
    fromChangeKeyword: boolean,
    filterItems: any,
    fromLoadMore: boolean
  ) => {
    keyword !== "" && setProducts([]);

    console.log("keyword", keyword);
    console.log("fromChangeKeyword", fromChangeKeyword);
    console.log("filterItems", filterItems);

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("is_search", keyword ? 1 : 0);
      formData.append("keyword", keyword);

      formData.append("is_filter", filterItems ? 1 : 0);
      (filterItems?.parantCategoryId || filterItems?.subCategoryId) &&
        formData.append(
          "category_ids",
          `${filterItems?.parantCategoryId},${filterItems?.subCategoryId}`
        );
      formData.append("brand_id", filterItems?.brand || "");
      formData.append("city", filterItems?.city || "");
      // formData.append("maxPrice", filterItems?.maxPrice || "");
      // formData.append("minPrice", filterItems?.minPrice || "");
      formData.append("color", filterItems?.selectedColors || "");
      formData.append(
        "condition_of_item",
        filterItems?.selectedConditionValue || ""
      );
      // formData.append("size", filterItems?.selectedSize || "");
      formData.append("rating", filterItems?.selectedRatings);

      formData.append("limit", limit);
      formData.append("offset", page);

      console.log("formData", formData);
      const result = await dispatch(
        addProductSearchFilter({ formData: formData })
      );

      if (addProductSearchFilter.fulfilled.match(result)) {
        // console.log(
        //   "addProductSearchFilter response - - - ",
        //   JSON.stringify(result.payload?.data?.data)
        // );
        if (result.payload.status === 1) {
          if (
            (fromChangeKeyword && keyword == "") ||
            filterItems ||
            fromLoadMore
          ) {
            console.log("in if - - - - -");
            !fromLoadMore
              ? setProducts([...result.payload?.data?.data])
              : setProducts([...products, ...result.payload?.data?.data]);
          } else {
            console.log("in else - - - - -");
            keyword !== "" && !fromLoadMore
              ? setProducts([...result.payload?.data?.data])
              : setProducts([...products, ...result.payload?.data?.data]);
          }

          setTotalPage(result.payload?.data?.totalPages);
          setPage(page + 1);
          setLoader(false);
          setVisibleFilter(false);
        }
      } else {
        setLoader(false);
        setProducts([]);
        setVisibleFilter(false);
        console.log("addProductSearchFilter error - - - ", result.payload);
      }
    } catch (error) {
      setLoader(false);
      console.log("API catch error", error);
    }
  };

  const onPressProduct = (itemId: number) => {
    dispatch(
      setProductInfo({
        id: null,
        price: null,
        isOutOfKigali: false,
        modeOfTransport: "",
        name: "",
        sellerName: "",
        sellerPhone: "",
        selfPickupAvailable: false,
      })
    );
    dispatch(setSelectedDeliveryAddress(null));
    navigation.navigate(Route.navProductDetails, { itemId: itemId });
  };

  const onEndReached = () => {
    if (page <= totalPage && !loader) {
      getSearchedItems(debouncedSearchTerm, 10, page, false, filterItems, true);
    }
  };

  const onChangeText = (val: string) => {
    setSearchValue(val);
    setSearchValueForAPI(val);
    dispatch(setSearchValueforCategory(val));
  };

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Route.navDashboard }],
        })
      );
    }
  };

  const toggleFilterPopup = () => {
    setVisibleFilter(!visibleFilter);
  };

  const onPressFilter = () => {
    toggleFilterPopup();
  };

  const sortData = (lowTohigh: boolean) => {
    const sortedArr = [...products].sort((a, b) => {
      const dateA = new Date(a.sale_price).valueOf();
      const dateB = new Date(b.sale_price).valueOf();
      return lowTohigh ? dateA - dateB : dateB - dateA;
    });

    setProducts(sortedArr);
    togglePopup();
  };

  const sortWithNewData = () => {
    const sortedArr = [...products].sort((a, b) => {
      const dateA = new Date(a.created_at).valueOf();
      const dateB = new Date(b.created_at).valueOf();
      return dateB - dateA;
    });

    setProducts(sortedArr);
    togglePopup();
  };

  const filterByMaxCategory = (data: any[]) => {
    // Create a mapping of category IDs to their occurrence count
    const categoryCounts = {};
    data.forEach((item) => {
      item.category_id.split(",").forEach((categoryId: string | number) => {
        // @ts-ignore
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
      });
    });

    // Find the category ID with the maximum occurrence count
    const maxCategoryId = Object.keys(categoryCounts).reduce((a, b) =>
      // @ts-ignore
      categoryCounts[a] > categoryCounts[b] ? a : b
    );

    // Filter the data based on the maximum category ID
    const filteredData = data.filter((item) => {
      return item.category_id.includes(maxCategoryId);
    });
    return filteredData;
  };

  const bestMatchData = () => {
    const result = filterByMaxCategory(products);
    setProducts(result);
    togglePopup();
  };

  const onPressShowItems = (key: number | null) => {
    if (key == 1) {
      bestMatchData();
    } else if (key == 2) {
      sortData(true);
    } else if (key == 3) {
      sortData(false);
    } else {
      sortWithNewData();
    }
    // togglePopup();
  };

  const onPressSort = () => {
    products && products.length > 0
      ? setVisible(true)
      : notifyMessage("There are no items to sort.");
  };

  const togglePopup = () => {
    setVisible(!visible);
  };

  const clearFilter = () => {
    getSearchedItems(debouncedSearchTerm, 10, 1, true, null, false);
  };

  const onPressShowItem = (
    parantCategoryId: any,
    subCategoryId: any,
    brand: any,
    selectedConditionValue: any,
    selectedColors: any,
    minPrice: any,
    maxPrice: any,
    selectedRatings: any,
    selectedSize: any,
    city: any
  ) => {
    let filter_Items = {
      parantCategoryId,
      subCategoryId,
      brand,
      selectedConditionValue,
      selectedColors,
      minPrice,
      maxPrice,
      selectedRatings,
      selectedSize,
      city,
    };
    setFilterItems(filter_Items);
    getSearchedItems(debouncedSearchTerm, 10, 1, false, filter_Items, false);
  };

  const onRefresh = () => {
    getSearchedItems(debouncedSearchTerm, 10, 1, true, null, false);
  };

  return (
    <View style={style.container}>
      <CustomSearchBarWithSortAndFilter
        onPressBack={onPressBack}
        disabledButton={products?.length > 0}
        onPressFilter={onPressFilter}
        onPressSort={onPressSort}
        search={searchValue}
        onChangeText={onChangeText}
      />

      <ProductListing
        isLoading={loader}
        productData={products}
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={onRefresh}
            tintColor={theme?.colors?.primary}
          />
        }
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
        loading={loader}
        onPressShowItem={(
          parantCategoryId: any,
          subCategoryId: any,
          brand: any,
          selectedConditionValue: any,
          selectedColors: any,
          minPrice: any,
          maxPrice: any,
          selectedRatings: any,
          selectedSize: any,
          city: any
        ) =>
          onPressShowItem(
            parantCategoryId,
            subCategoryId,
            brand,
            selectedConditionValue,
            selectedColors,
            minPrice,
            maxPrice,
            selectedRatings,
            selectedSize,
            city
          )
        }
        clearFilter={clearFilter}
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
