import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
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

const SearchProducts: React.FC<HomeNavigationProps<Route.navSearchProduct>> = ({
  navigation,
  route,
}) => {
  const { subCat, mainCat } = route.params;

  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setProducts([]);
    if (subCat) {
      setSearchValue(subCat);
    } else {
      setSearchValue(mainCat);
    }
  }, [mainCat, subCat]);

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  useEffect(() => {
    getSearchedItems(debouncedSearchTerm, 10, 1, true, null);
  }, [debouncedSearchTerm, mainCat, subCat]);

  const getSearchedItems = async (
    keyword: string,
    limit: number,
    page: number,
    fromChangeKeyword: boolean,
    filterItems: any
  ) => {
    keyword !== "" && setProducts([]);
    try {
      setLoader(true);
      const formData = new FormData();
      console.log(
        "filterItems?.subCategoryId",
        filterItems?.parantCategoryId,
        filterItems?.subCategoryId
      );
      formData.append("is_search", keyword ? 1 : 0);
      formData.append("keyword", keyword);

      formData.append("is_filter", filterItems ? 1 : 0);
      formData.append(
        "category_ids",
        `${filterItems?.parantCategoryId},${filterItems?.subCategoryId}`
      );
      formData.append("brand_id", filterItems?.brand || "");
      formData.append("city", filterItems?.city);
      formData.append("maxPrice", filterItems?.maxPrice);
      formData.append("minPrice", filterItems?.minPrice);
      formData.append("color", filterItems?.selectedColors);
      formData.append("condition_of_item", filterItems?.selectedCondition);
      formData.append("size", filterItems?.selectedSize);
      // formData.append("rating", filterItems?.selectedRatings);

      formData.append("limit", limit);
      formData.append("offset", page);

      const result = await dispatch(
        addProductSearchFilter({ formData: formData })
      );

      if (addProductSearchFilter.fulfilled.match(result)) {
        console.log("addProductSearchFilter response - - - ", result.payload);
        if (result.payload.status === 1) {
          if ((fromChangeKeyword && keyword == "") || filterItems) {
            setProducts(result.payload?.data?.data);
          } else {
            keyword
              ? setProducts(result.payload?.data?.data)
              : setProducts([...products, ...result.payload?.data?.data]);
          }

          setTotalPage(result.payload?.data?.totalPages);
          setPage(page + 1);
          setLoader(false);
          setVisibleFilter(false);
        }
      } else {
        setLoader(false);
        // setProducts([]);
        setVisibleFilter(false);
        console.log("addProductSearchFilter error - - - ", result.payload);
      }
    } catch (error) {
      setLoader(false);
      console.log("API catch error", error);
    }
  };

  const onPressProduct = (itemId: number) => {
    navigation.navigate(Route.navProductDetails, { itemId: itemId });
  };

  const onEndReached = () => {
    if (page <= totalPage && !loader) {
      getSearchedItems(debouncedSearchTerm, 10, page, false, null);
    }
  };

  const onChangeText = (val: string) => {
    setSearchValue(val);
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
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
      });
    });

    // Find the category ID with the maximum occurrence count
    const maxCategoryId = Object.keys(categoryCounts).reduce((a, b) =>
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
    console.log("key", key);
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
    setVisible(true);
  };

  const togglePopup = () => {
    setVisible(!visible);
  };

  const clearFilter = () => {
    getSearchedItems(debouncedSearchTerm, 10, 1, true, null);
  };

  const onPressShowItem = (
    parantCategoryId: any,
    subCategoryId: any,
    brand: any,
    selectedCondition: any,
    selectedColors: any,
    minPrice: any,
    maxPrice: any,
    selectedRatings: any,
    selectedSize: any,
    city: any
  ) => {
    let filterItems = {
      parantCategoryId,
      subCategoryId,
      brand,
      selectedCondition,
      selectedColors,
      minPrice,
      maxPrice,
      selectedRatings,
      selectedSize,
      city,
    };
    console.log("filterItems", filterItems);
    getSearchedItems(debouncedSearchTerm, 10, 1, false, filterItems);
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
          selectedCondition: any,
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
            selectedCondition,
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
