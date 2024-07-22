import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
import AddressDataSheet from "../../components/DeliveryAddress/AddressDataSheet";
import BottomSheet, { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import RenderSortItemsList from "../../components/ui/RenderSortItemsList";
import CustomButton from "../../components/ui/CustomButton";
import { useCategories } from "../../hooks/useCategories";
import {
  CITIES,
  COLORS,
  CONDITIONS,
  HIT_SLOP2,
  RATINGS,
  SCREEN_HEIGHT,
  SIZES,
} from "../../constant";
import {
  CategoriesDataProps,
  HotBrandaDataProps,
} from "../../types/dashboard.types";
import LeftIcon from "../../components/ui/svg/LeftIcon";
import Scale from "../../utils/Scale";
import { useBrands } from "../../hooks/useBrands";
import PopupHeaderWithClose from "../../components/ui/popups/PopupHeaderWithClose";
import FilterItem from "../../components/Filter/FilterItem";
import CustomRangeSlider from "../../components/Slider/CustomRangeSlider";
import CategoriesListWithExpand from "../Categories/CategoriesListWithExpand";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import NoDataFound from "../../components/ui/NoDataFound";
import { AppImage } from "../../components/AppImage/AppImage";
import { Images } from "../../assets/images";
import RenderMultiSelectionItem from "../../components/Filter/RenderMultiSelectionItem";
import RenderColors from "../../components/Filter/RenderColors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SearchProducts: React.FC<HomeNavigationProps<Route.navSearchProduct>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const sortSheetRef = useRef<BottomSheet>(null);
  const filterSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "50%"], []);
  const snapPointsFilter = useMemo(() => ["90%", "90%"], []);

  const [search, setSearch] = useState("");
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);

  const [sortData, setSortData] = useState([
    {
      title: "Best Match",
      selected: false,
    },
    {
      title: "Lowest price to highest price",
      selected: false,
    },
    {
      title: "Highest price to lowest price",
      selected: false,
    },
    {
      title: "Newly listed",
      selected: true,
    },
  ]);

  const [visibleColor, setVisibleColor] = useState(false);
  const [visiblePrice, setVisiblePrice] = useState(false);
  const [visibleCondition, setVisibleCondition] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(false);
  const [visibleBrands, setVisibleBrands] = useState(false);
  const [visibleCity, setVisibleCity] = useState(false);
  const [visibleRating, setVisibleRating] = useState(false);
  const [visibleSize, setVisibleSize] = useState(false);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState<any[]>([]);
  const [selectedSizeValue, setSelectedSizeValues] = useState<any[]>([]);

  const [selectedRatings, setSelectedRatings] = useState<any[]>([]);
  const [selectedRatingsValues, setSelectedRatingsValues] = useState([]);
  const [sliderVal, setSliderVal] = useState({ low: 50, high: 500 });
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionData, setConditionData] = useState(CONDITIONS);

  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);
  const [brands, setBrands] = useState<HotBrandaDataProps[]>([]);

  const [expand, setExpand] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [parantCategoryId, setParantCategoryId] = useState<number | null>(null);
  const [subCatName, setSubCatName] = useState<string>("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const { data: categoriesData, isFetching } = useCategories();

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

  const [selectedBrand, setSelectedBrand] = useState<{
    id: number | null;
    name: string;
  }>({ id: null, name: "" });

  const { data: brandsData } = useBrands(`${parantCategoryId}`);

  useEffect(() => {
    if (brandsData?.data?.data) {
      setBrands(brandsData?.data?.data);
    }
  }, [brandsData]);

  useEffect(() => {
    if (categoriesData?.data?.data) {
      setCategories(categoriesData?.data?.data);
    }
  }, [categoriesData]);

  const onPressConditionItem = (index: number) => {
    setSelectedCondition(conditionData[index].title);
    setConditionData(
      conditionData.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  const onPressCity = () => {
    setVisibleCity(true);
  };
  const onPressBrand = () => {
    setVisibleBrands(true);
  };
  const onPressSize = () => {
    setVisibleSize(true);
  };
  const onPressCondition = () => {
    setVisibleCondition(true);
  };
  const onPressPrice = () => {
    setVisiblePrice(!visiblePrice);
  };
  const onPressCategories = () => {
    setVisibleCategories(!visibleCategories);
  };
  const onPressRating = () => {
    setVisibleRating(true);
  };
  const onPressColor = () => {
    setVisibleColor(true);
  };

  const ModalHeader = ({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) => {
    return (
      <View style={style.header}>
        <TouchableOpacity
          onPress={onPress}
          hitSlop={HIT_SLOP2}
          activeOpacity={0.8}
        >
          <LeftIcon color={theme?.colors?.black} />
        </TouchableOpacity>
        <Text style={style.txtHeaderTitle}>{title}</Text>
      </View>
    );
  };

  const handleColorSelect = (colors: any) => {
    setSelectedColors(colors);
  };

  const handleRatingSelection = (item: any) => {
    let arr: any = [];
    item.forEach((element: { itemValue: any }) => {
      arr.push(element.itemValue);
    });
    setSelectedRatingsValues(arr);
    setSelectedRatings(item);
  };

  const handleSizeSelection = (item: any) => {
    let arr: any = [];
    item.forEach((element: { itemValue: any }) => {
      arr.push(element.itemValue);
    });
    setSelectedSizeValues(arr);
    setSelectedSize(item);
  };

  const onExpand = (id: number) => {
    setExpand(null);
    expand == id ? setExpand(null) : setExpand(id);
  };

  const onPressCategory = (
    subCatId: number,
    subcatName: string,
    parantCatId: number,
    parantCatName: string
  ) => {
    setSubCatName(subcatName);
    setSubCategoryId(subCatId);
    setParantCategoryId(parantCatId);
  };

  const onSelectBrand = (itm: HotBrandaDataProps) => {
    setSelectedBrand({ id: itm.id, name: itm.name });
  };

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
    filterSheetRef?.current?.close();
  };

  const onPressFilter = () => {
    // toggleFilterPopup();
    filterSheetRef?.current?.snapToIndex(1);
  };

  const onPressShowItems = () => {
    handleCloseSort();
  };

  const onPressSort = () => {
    // setVisible(true);
    sortSheetRef?.current?.snapToIndex(1);
  };

  const handleCloseSort = () => {
    sortSheetRef?.current?.close();
  };
  const handleCloseFilter = () => {
    filterSheetRef?.current?.close();
  };

  const RenderSortItems = () => {
    return (
      <View style={{ flex: 1 }}>
        <RenderSortItemsList sortData={sortData} onPressItem={onPressItem} />
        <View style={style.buttonCont}>
          <CustomButton
            onPress={onPressShowItems}
            title={"Show Items"}
            buttonWidth="half"
            width={SCREEN_WIDTH - 40}
            variant="primary"
            type="solid"
          />
        </View>
      </View>
    );
  };

  const onPressItem = (index: number) => {
    setSortData(
      sortData.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  const RenderFilterItems = () => {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.container1}>
          <FilterItem
            onPress={onPressCategories}
            title="Categories"
            value={subCatName}
          />
          <FilterItem
            onPress={onPressBrand}
            title="Brand"
            value={selectedBrand.name}
          />
          <FilterItem
            onPress={onPressCondition}
            title="Condition"
            value={selectedCondition}
          />
          <FilterItem
            onPress={onPressColor}
            title="Colors"
            value={selectedColors?.join(", ")}
          />
          <FilterItem
            onPress={onPressPrice}
            title="Price"
            value={`R₣${sliderVal.low} - R₣${sliderVal.high}`}
            isSelected={visiblePrice}
          />
          {visiblePrice && (
            <View style={style.sliderCont}>
              <CustomRangeSlider
                sliderVal={sliderVal}
                setSliderVal={({ low, high }) => setSliderVal({ low, high })}
              />
            </View>
          )}
          <FilterItem
            onPress={onPressRating}
            title="Rating"
            value={
              selectedRatings?.length > 0
                ? selectedRatings?.map((item) => item.itemName).join(", ")
                : ""
            }
          />

          <FilterItem
            onPress={onPressSize}
            title="Size"
            value={selectedSizeValue?.join(", ")}
          />

          <FilterItem onPress={onPressCity} title="City" value={city} />
        </View>
        <View style={style.buttonCont}>
          <CustomButton
            onPress={toggleFilterPopup}
            title={"Show Items"}
            buttonWidth="half"
            width={SCREEN_WIDTH - 40}
            variant="primary"
            type="solid"
          />
        </View>
        {visibleSize && (
          <View style={style.view}>
            <ModalHeader
              title="Size"
              onPress={() => setVisibleSize(!visibleSize)}
            />
            <RenderMultiSelectionItem
              selectedItem={selectedSize}
              data={SIZES}
              onSelect={handleSizeSelection}
            />
          </View>
        )}
        {visibleRating && (
          <View style={style.view}>
            <ModalHeader
              title="Rating"
              onPress={() => setVisibleRating(!visibleRating)}
            />
            <RenderMultiSelectionItem
              selectedItem={selectedRatings}
              data={RATINGS}
              onSelect={handleRatingSelection}
            />
          </View>
        )}
        {visibleBrands && (
          <View style={style.view}>
            <ModalHeader
              title="Brands"
              onPress={() => setVisibleBrands(!visibleBrands)}
            />
            <View style={{ marginHorizontal: 20, flex: 1 }}>
              {brands?.length > 0 ? (
                brands.map((itm) => {
                  const btn =
                    itm?.id == selectedBrand.id
                      ? Images.CHECKED_RADIO
                      : Images.UNCHECKED_RADIO;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={style.itmBrandSelection}
                      onPress={() => onSelectBrand(itm)}
                    >
                      <AppImage
                        source={btn}
                        style={style.radioButton}
                        resizeMode="cover"
                      />
                      <Text style={style.txtBrands}>{itm.name}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <NoDataFound title="No brands found!" />
              )}
            </View>
          </View>
        )}
        {visibleCity && (
          <View style={style.view}>
            <ModalHeader
              title="City"
              onPress={() => setVisibleCity(!visibleCity)}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <CustomDropdown
                dropDownData={CITIES}
                placeHolder={"City"}
                value={city}
                topMargin={20}
                onSelect={(val) => {
                  setCityError("");
                  setCity(val.key);
                }}
                error={cityError}
              />
            </View>
          </View>
        )}
        {visibleCategories && (
          <View style={style.view}>
            <ModalHeader
              title="Categories"
              onPress={() => setVisibleCategories(!visibleCategories)}
            />
            <CategoriesListWithExpand
              categoriesData={categories}
              onExpand={onExpand}
              expand={expand}
              isLoading={isFetching}
              subCategoryId={subCategoryId}
              onPressCategory={(sub, subName, parant, parantName) =>
                onPressCategory(sub, subName, parant, parantName)
              }
            />
          </View>
        )}
        {visibleCondition && (
          <View style={style.view}>
            <ModalHeader
              title="Condition"
              onPress={() => setVisibleCondition(!visibleCondition)}
            />
            <RenderSortItemsList
              sortData={conditionData}
              onPressItem={onPressConditionItem}
            />
          </View>
        )}
        {visibleColor && (
          <View style={style.view}>
            <ModalHeader
              title="Colors"
              onPress={() => setVisibleColor(!visibleColor)}
            />
            <RenderColors
              isColor={true}
              selectedItem={selectedColors}
              data={COLORS}
              onSelect={handleColorSelect}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    );
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
      {/* <SortProduuctPopup
        visiblePopup={visible}
        togglePopup={togglePopup}
        onPressShowItems={onPressShowItems}
      /> */}
      <FilterProductPopup
        visiblePopup={visibleFilter}
        togglePopup={toggleFilterPopup}
      />
      <AddressDataSheet
        ref={sortSheetRef}
        title={"Sort"}
        handleClosePress={handleCloseSort}
        children={RenderSortItems()}
        snapPoints={snapPoints}
      />
      <AddressDataSheet
        ref={filterSheetRef}
        title={"Filter"}
        handleClosePress={handleCloseFilter}
        children={RenderFilterItems()}
        snapPoints={snapPointsFilter}
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
  buttonCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: Scale(50),
    paddingHorizontal: 20,
  },
  txtHeaderTitle: {
    fontSize: theme.fontSize?.fs22,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    marginLeft: 10,
  },
  container1: {
    flex: 1,
  },
  innerCont: {
    height: "auto",
    width: "100%",
    backgroundColor: theme.colors?.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 1,
  },
  sliderCont: {
    marginHorizontal: 20,
    zIndex: 11,
  },
  view: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottomtop: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    zIndex: 11,
    backgroundColor: theme?.colors?.white,
  },
  itmBrandSelection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  txtBrands: {
    fontSize: theme.fontSize?.fs18,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    marginLeft: 10,
  },
  radioButton: {
    height: Scale(20),
    width: Scale(20),
  },
}));
