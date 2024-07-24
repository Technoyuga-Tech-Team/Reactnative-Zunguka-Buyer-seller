import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../../assets/images";
import {
  CITIES,
  COLORS,
  CONDITIONS,
  HIT_SLOP2,
  RATINGS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "../../../constant";
import { useBrands } from "../../../hooks/useBrands";
import { useCategories } from "../../../hooks/useCategories";
import CategoriesListWithExpand from "../../../screen/Categories/CategoriesListWithExpand";
import {
  CategoriesDataProps,
  HotBrandaDataProps,
} from "../../../types/dashboard.types";
import { ThemeProps } from "../../../types/global.types";
import Scale from "../../../utils/Scale";
import { AppImage } from "../../AppImage/AppImage";
import CustomDropdown from "../../Dropdown/CustomDropdown";
import FilterItem from "../../Filter/FilterItem";
import RenderColors from "../../Filter/RenderColors";
import RenderMultiSelectionItem from "../../Filter/RenderMultiSelectionItem";
import CustomRangeSlider from "../../Slider/CustomRangeSlider";
import CustomButton from "../CustomButton";
import NoDataFound from "../NoDataFound";
import RenderSortItemsList from "../RenderSortItemsList";
import BackIcon from "../svg/BackIcon";
import PopupHeaderWithClose from "./PopupHeaderWithClose";
import LeftIcon from "../svg/LeftIcon";

interface FilterProductPopupProps {
  visiblePopup: boolean;
  togglePopup: () => void;
  onPressShowItem: (
    subCategoryId: any,
    brand: any,
    selectedCondition: any,
    selectedColors: any,
    minPrice: any,
    maxPrice: any,
    selectedRatings: any,
    selectedSize: any,
    city: any
  ) => void;
}

const FilterProductPopup: React.FC<FilterProductPopupProps> = ({
  visiblePopup,
  togglePopup,
  onPressShowItem,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const { theme } = useTheme();

  const { data: categoriesData, isFetching } = useCategories();

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

  console.log("selectedColors", selectedColors);

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

  const onPressItem = (index: number) => {
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

  return (
    <Modal
      visible={visiblePopup}
      onRequestClose={togglePopup}
      style={style.modalCont}
      transparent={true}
      animationType="slide"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePopup}
        style={style.container}
      ></TouchableOpacity>
      <View style={style.container1}>
        <View style={style.innerCont}>
          <PopupHeaderWithClose title="Filter" onPressClose={togglePopup} />
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

          <View style={style.buttonCont}>
            <CustomButton
              onPress={() =>
                onPressShowItem(
                  subCategoryId,
                  selectedBrand.id,
                  selectedCondition,
                  selectedColors,
                  sliderVal.low,
                  sliderVal.high,
                  selectedRatings.map((ele) => ele.itemValue).join(", "),
                  selectedSize.map((ele) => ele.itemValue).join(", "),
                  city
                )
              }
              title={"Show Items"}
              buttonWidth="half"
              width={SCREEN_WIDTH - 100}
              variant="primary"
              type="solid"
            />
          </View>
        </View>
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
            onPressItem={onPressItem}
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
    </Modal>
  );
};

export default FilterProductPopup;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors?.overlay,
    paddingTop: props.insets.top + 20,
  },
  container1: {
    // flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalCont: {
    backgroundColor: "transparent",
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
  txtLoginToZunguka: {
    fontSize: theme.fontSize?.fs22,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    marginTop: 10,
  },
  txtLoginToZunguka1: {
    fontSize: theme.fontSize?.fs18,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
    marginVertical: 20,
    textAlign: "center",
    width: "90%",
  },
  txtLoginToZungukaDesc: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
    textAlign: "center",
    color: theme.colors?.secondaryText,
    lineHeight: 20,
    marginTop: 10,
  },
  buttonCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonRightMargin: {
    marginRight: 10,
  },
  buttonLeftMargin: {
    marginLeft: 10,
  },
  iconCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    paddingTop: props.insets.top,
    backgroundColor: theme?.colors?.white,
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
  sliderCont: {
    marginHorizontal: 20,
    zIndex: 11,
  },
  radioButton: {
    height: Scale(20),
    width: Scale(20),
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
}));
