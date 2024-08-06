import { CommonActions, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Images } from "../../assets/images";
import { AppImage } from "../../components/AppImage/AppImage";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import RenderColors from "../../components/Filter/RenderColors";
import RenderMultiSelectionItem from "../../components/Filter/RenderMultiSelectionItem";
import SellProductItems from "../../components/SellProductItems";
import CustomButton from "../../components/ui/CustomButton";
import CustomHeader from "../../components/ui/CustomHeader";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import NoDataFound from "../../components/ui/NoDataFound";
import PickSellProduct from "../../components/ui/PickSellProduct";
import RenderSortItemsList from "../../components/ui/RenderSortItemsList";
import LeftIcon from "../../components/ui/svg/LeftIcon";
import PencilIcon from "../../components/ui/svg/PencilIcon";
import TermsAndCondition from "../../components/ui/TermsAndCondition";
import TitleWithInfoIcon from "../../components/ui/TitleWithInfoIcon";
import {
  CITIES,
  COLORS,
  CONDITIONS,
  DISTRICT_AND_SECTORS,
  HIT_SLOP2,
  SCREEN_HEIGHT,
  SIZES,
  VEHICLE_TYPE_DATA,
} from "../../constant";
import { isRequiredFields } from "../../constant/formValidations";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useBrands } from "../../hooks/useBrands";
import { useCategories } from "../../hooks/useCategories";
import { setErrors } from "../../store/global/global.slice";
import { selectProductLoading } from "../../store/Product/product.selectors";
import { addProductForSell } from "../../store/Product/product.thunk";
import { imagePickerProps } from "../../types/common.types";
import {
  CategoriesDataProps,
  HotBrandaDataProps,
} from "../../types/dashboard.types";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { getUrlExtension } from "../../utils";
import Scale from "../../utils/Scale";
import CategoriesListWithExpand from "../Categories/CategoriesListWithExpand";

const AddNewProduct: React.FC<HomeNavigationProps<Route.navAddNewProduct>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const scrollRef = React.useRef<KeyboardAwareScrollView>(null);
  const productTitleRef = React.useRef<TextInput>(null);
  const locationRef = React.useRef<TextInput>(null);

  const loading = useSelector(selectProductLoading);

  const [conditionData, setConditionData] = useState(CONDITIONS);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedConditionError, setSelectedConditionError] = useState("");

  const [productCategory, setProductCategory] = useState("");
  const [productCategoryError, setProductCategoryError] = useState("");

  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");

  const [sector, setSector] = useState("");
  const [sectorError, setSectorError] = useState("");

  const [sectorData, setSectorData] = useState<
    { title: string; key: string }[]
  >([]);

  const [vehicle, setVehicle] = useState("");
  const [vehicleError, setVehicleError] = useState("");

  const [productTitle, setProductTitle] = useState("");
  const [productTitleError, setProductTitleError] = useState("");

  const [productLocation, setProductLocation] = useState("");
  const [productLocationError, setProductLocationError] = useState("");

  const [productDescription, setProductDescription] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");

  const [productSellingPrice, setProductSellingPrice] = useState("");
  const [productSellingPriceError, setProductSellingPriceError] = useState("");

  const [checked, setChecked] = React.useState(false);
  const [checkedNotDamaged, setCheckedNotDamaged] = React.useState(false);

  const [productImages, setProductImages] = useState<imagePickerProps[]>([]);
  const [productImageError, setProductImageError] = useState<string>("");

  const [visibleCategories, setVisibleCategories] = useState(false);
  const [visibleBrands, setVisibleBrands] = useState(false);
  const [visibleColor, setVisibleColor] = useState(false);
  const [visibleSize, setVisibleSize] = useState(false);

  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [parantCategoryId, setParantCategoryId] = useState<number | null>(null);
  const [subCatName, setSubCatName] = useState<string>("");
  const [parantCatName, setParantCatName] = useState<string>("");

  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);
  const [brands, setBrands] = useState<HotBrandaDataProps[]>([]);

  const [expand, setExpand] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedColorsError, setSelectedColorsError] = useState<string>("");

  const [selectedSize, setSelectedSize] = useState<any[]>([]);
  const [selectedSizeValue, setSelectedSizeValues] = useState<any[]>([]);
  const [selectedSizeValueError, setSelectedSizeValueError] =
    useState<string>("");

  const [selectedBrand, setSelectedBrand] = useState<{
    id: number | null;
    name: string;
  }>({ id: null, name: "" });
  const [selectedBrandError, setSelectedBrandError] = useState<string>("");

  const [subParantCat, setSubParantCat] = useState<string>("");

  const { data: categoriesData, isFetching } = useCategories();

  const { data: brandsData } = useBrands(`${parantCategoryId}`);

  useEffect(() => {
    if (brandsData?.data?.data) {
      setBrands(brandsData?.data?.data);
    }
  }, [brandsData]);

  useEffect(() => {
    if (parantCatName && subCatName) {
      setSubParantCat(`${parantCatName} - ${subCatName}`);
    }
  }, [parantCatName, subCatName]);

  useEffect(() => {
    if (categoriesData?.data?.data) {
      setCategories(categoriesData?.data?.data);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (district) {
      console.log("district", district);
      DISTRICT_AND_SECTORS.map((ele) => {
        if (ele.key == district) {
          setSectorData(ele.sectors);
        }
      });
    }
  }, [district]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (visibleCategories || visibleBrands || visibleColor || visibleSize) {
          setVisibleCategories(false);
          setVisibleBrands(false);
          setVisibleColor(false);
          setVisibleSize(false);
          return true;
        }
        return false;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [visibleCategories, visibleBrands, visibleColor, visibleSize])
  );

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
          <LeftIcon color={theme?.colors?.black} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <Text style={style.txtHeaderTitle}>{title}</Text>
      </View>
    );
  };

  const toggleCheckbox = () => setChecked(!checked);
  const toggleCheckboxNotDamage = () =>
    setCheckedNotDamaged(!checkedNotDamaged);

  const onPressItem = (index: number) => {
    setSelectedConditionError("");
    setSelectedCondition(conditionData[index].value);
    setConditionData(
      conditionData.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  const onChangeProductDescription = (val: string) => {
    setProductDescriptionError("");
    setProductDescription(val);
  };

  const onBlurDescription = () => {
    let isValid = isRequiredFields(productDescription);
    if (!isValid) {
      setProductDescriptionError("Description is required");
    }
  };

  const onBlurSellingPrice = () => {
    let isValid = isRequiredFields(productSellingPrice);
    if (!isValid) {
      setProductSellingPriceError("Selling price is required");
    }
  };

  const onBlurProductTitle = () => {
    let isValid = isRequiredFields(productTitle);
    if (!isValid) {
      setProductTitleError("Title is required");
    }
  };

  const onBlurLocation = () => {
    let isValid = isRequiredFields(productLocation);
    if (!isValid) {
      setProductLocationError("Address is required");
    }
  };

  const onChangeProductSelling = (val: string) => {
    if (Number(val) > 0) {
      setProductSellingPriceError("");
      const newValue = val.trim();
      setProductSellingPrice(newValue);
    } else {
      setProductSellingPrice("");
      setProductSellingPriceError("Selling price is not valid");
    }
  };

  const onChangeProductTitle = (val: string) => {
    setProductTitleError("");
    const newValue = val.replace(/\./, "");
    setProductTitle(newValue);
  };

  const onChangeLocation = (val: string) => {
    setProductLocationError("");
    const newValue = val.replace(/\./, "");
    setProductLocation(newValue);
  };

  const onPressTitleIcon = () => {
    productTitleRef?.current?.focus();
  };

  const onPressSelectEnterAddress = () => {
    locationRef?.current?.focus();
  };

  const onPressSelectCategory = () => {
    Keyboard.dismiss();
    setVisibleCategories(true);
  };

  const checkIsValidForm = () => {
    let isValidProductImage = productImages.length > 0;
    let isValidTitle = isRequiredFields(productTitle);
    let isValidProductCategory = isRequiredFields(subParantCat);
    let isValidConditionOfItems = isRequiredFields(selectedCondition);
    let isValidBrands = isRequiredFields(selectedBrand.name);
    let isValidColors = isRequiredFields(selectedColors[0]);
    let isValidSize = isRequiredFields(selectedSizeValue[0]);
    let isValidCity = isRequiredFields(district);
    let isValidAddress = isRequiredFields(productLocation);
    let isValidDescription = isRequiredFields(productDescription);
    let isValidModeOfTransport = isRequiredFields(vehicle);
    let isValidPrice = isRequiredFields(productSellingPrice);
    console.log("isValidTitle", isValidTitle);
    if (!isValidProductImage) {
      setProductImageError("Product photos are required");
      scrollRef?.current?.scrollToPosition(0, 0, true);
      return false;
    } else if (!isValidTitle) {
      setProductTitleError("Title is required");
      scrollRef?.current?.scrollToPosition(0, 0, true);
      return false;
    } else if (!isValidProductCategory) {
      setProductCategoryError("Category is required");
      scrollRef?.current?.scrollToPosition(0, 0, true);
      return false;
    } else if (!isValidConditionOfItems) {
      setSelectedConditionError("Condition Of Items is required");
      scrollRef?.current?.scrollToPosition(0, SCREEN_HEIGHT / 2, true);
      return false;
    } else if (!isValidBrands) {
      setSelectedBrandError("Brands are required");
      scrollRef?.current?.scrollToPosition(0, SCREEN_HEIGHT / 2, true);
      return false;
    } else if (!isValidColors) {
      scrollRef?.current?.scrollToPosition(0, SCREEN_HEIGHT, true);
      return false;
    } else if (!isValidSize) {
      scrollRef?.current?.scrollToPosition(0, SCREEN_HEIGHT, true);
      return false;
    } else if (!isValidCity) {
      setDistrictError("District is required");
      return false;
    } else if (!isValidAddress) {
      setProductLocationError("Address is required");
      return false;
    } else if (!isValidDescription) {
      setProductDescriptionError("Description is required");
      return false;
    } else if (!isValidModeOfTransport) {
      setVehicleError("Mode of transport is required");
      return false;
    } else if (!isValidPrice) {
      setProductSellingPriceError("Selling price is required");
      return false;
    } else if (!checked) {
      dispatch(
        setErrors({
          message: "Please agree with terms & condition",
          status: 0,
          statusCode: null,
        })
      );
      return false;
    }

    return true;
  };

  const onPressSubmit = async () => {
    if (checkIsValidForm()) {
      const formData = new FormData();

      Object.entries(productImages).forEach(([_key, val]) => {
        formData.append(`images[${_key}]`, {
          name:
            val.name ||
            `${new Date().getMilliseconds()}.${getUrlExtension(val.uri)}`,
          type: `image/${getUrlExtension(val.uri)}`,
          uri: Platform.OS === "ios" ? val.uri.replace("file://", "") : val.uri,
        });
      });
      formData.append("title", productTitle);
      formData.append("category_id", `${subCategoryId},${parantCategoryId}`);
      formData.append("condition_of_item", selectedCondition);
      formData.append("brand_id", selectedBrand.id);
      formData.append("color", selectedColors.join(", "));
      formData.append("size", selectedSizeValue.join(", "));
      formData.append("district", district);
      formData.append("sector", sector);
      formData.append("city", district);
      formData.append("address", productLocation);
      formData.append("description", productDescription);
      formData.append("mode_of_transport", vehicle.toLocaleLowerCase());
      formData.append("sale_price", productSellingPrice);

      const result = await dispatch(addProductForSell({ formData: formData }));

      if (addProductForSell.fulfilled.match(result)) {
        if (result.payload.status === 1) {
          console.log(
            "addProductForSell response - - - ",
            result.payload?.data
          );
          const itemId = result.payload?.data?.id;
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: Route.navCongratulations, params: { itemId: itemId } },
              ],
            })
          );
        }
      } else {
        console.log("addProductForSell error - - - ", result.payload);
      }
    }
  };

  const onPressCategory = (
    subCatId: number,
    subcatName: string,
    parantCatId: number,
    parantCatName: string
  ) => {
    setProductCategoryError("");
    setSubCatName(subcatName);
    setParantCatName(parantCatName);
    setSubCategoryId(subCatId);
    setParantCategoryId(parantCatId);
  };

  const onExpand = (id: number) => {
    setExpand(null);
    expand == id ? setExpand(null) : setExpand(id);
  };

  const onSelectBrand = (itm: HotBrandaDataProps) => {
    setSelectedBrand({ id: itm.id, name: itm.name });
  };

  const onPressBrand = () => {
    setSelectedBrandError("");
    setVisibleBrands(true);
  };

  const handleColorSelect = (colors: any) => {
    setSelectedColors(colors);
  };
  const handleSizeSelection = (item: any) => {
    let arr: any = [];
    item.forEach((element: { itemValue: any }) => {
      arr.push(element.itemValue);
    });
    setSelectedSizeValues(arr);
    setSelectedSize(item);
  };

  const onPressColor = () => {
    setSelectedColorsError("");
    setVisibleColor(!visibleColor);
  };
  const onPressSize = () => {
    setSelectedSizeValueError("");
    setVisibleSize(!visibleSize);
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Create new listing" />
      <KeyboardAwareScrollView
        ref={scrollRef}
        bounces={false}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollCont}
        nestedScrollEnabled={true}
        persistentScrollbar={true}
      >
        <TitleWithInfoIcon title="Photos" />
        <PickSellProduct
          images={productImages}
          setImages={(val) => {
            setProductImageError("");
            setProductImages(val);
          }}
        />
        {(productImageError || productImages?.length <= 0) && (
          <Text style={style.error}>{productImageError}</Text>
        )}
        <View style={[style.paddingHorizontal, { paddingHorizontal: 10 }]}>
          <TermsAndCondition
            checked={checkedNotDamaged}
            toggleCheckbox={toggleCheckboxNotDamage}
            title="Damages clearly photos"
          />
        </View>
        <View style={style.paddingHorizontal}>
          <CustomTxtInput
            ref={productTitleRef}
            textInputTitle={"Title"}
            placeholder="Enter item title here"
            returnKeyType="next"
            returnKeyLabel="next"
            keyboardType={"default"}
            iconPosition={"right"}
            icon={<PencilIcon color={theme?.colors?.unselectedIconColor} />}
            onPressOuterRightIcon={onPressTitleIcon}
            onChangeText={onChangeProductTitle}
            onBlur={onBlurProductTitle}
            value={productTitle}
            error={productTitleError}
            touched={productTitleError !== ""}
            textInputStyle={style.inputWithoutBgColor}
            style={style.txtInputWithoutBgColor}
          />

          <CustomTxtInput
            ref={productTitleRef}
            textInputTitle={"Category"}
            placeholder="Select product category type"
            returnKeyType="next"
            returnKeyLabel="next"
            keyboardType={"default"}
            iconPosition={"right"}
            icon={<PencilIcon color={theme?.colors?.unselectedIconColor} />}
            value={subParantCat}
            error={productCategoryError}
            touched={productCategoryError !== ""}
            onPress={onPressSelectCategory}
            onPressIn={onPressSelectCategory}
            onPressOuterRightIcon={onPressSelectCategory}
            editable={false}
            textInputStyle={style.inputWithoutBgColor}
            style={style.txtInputWithoutBgColor}
          />
        </View>
        <TitleWithInfoIcon title="Condition of item" showIcon={true} />
        <RenderSortItemsList
          sortData={conditionData}
          onPressItem={onPressItem}
        />
        {(selectedConditionError || selectedConditionError?.length <= 0) && (
          <Text style={style.error}>{selectedConditionError}</Text>
        )}
        <TitleWithInfoIcon title="Item specifics" showIcon={true} />
        <View style={style.paddingHorizontal}>
          <SellProductItems
            title="Brand"
            value={selectedBrand?.name}
            onPressItem={onPressBrand}
            error={selectedBrandError}
          />
          <SellProductItems
            title="Color"
            value={selectedColors.join(", ")}
            onPressItem={onPressColor}
            error={selectedColorsError}
          />
          <SellProductItems
            title="Size"
            value={selectedSizeValue?.join(", ")}
            onPressItem={onPressSize}
            error={selectedSizeValueError}
          />
        </View>
        <TitleWithInfoIcon title="Location" />
        <View style={style.paddingHorizontal}>
          <CustomDropdown
            dropDownData={DISTRICT_AND_SECTORS}
            placeHolder={"District"}
            value={district}
            topMargin={20}
            onSelect={(val) => {
              setDistrictError("");
              setDistrict(val.key);
            }}
            error={districtError}
          />
          {sectorData?.length > 0 && (
            <CustomDropdown
              dropDownData={sectorData}
              placeHolder={"Sector"}
              value={sector}
              topMargin={20}
              onSelect={(val) => {
                setSectorError("");
                setSector(val.key);
              }}
              error={sectorError}
            />
          )}
        </View>
        <View style={style.paddingHorizontal}>
          <CustomTxtInput
            ref={locationRef}
            placeholder="Enter address"
            returnKeyType="next"
            returnKeyLabel="next"
            keyboardType={"default"}
            iconPosition={"right"}
            icon={<PencilIcon color={theme?.colors?.unselectedIconColor} />}
            onPressOuterRightIcon={onPressSelectEnterAddress}
            onChangeText={onChangeLocation}
            onBlur={onBlurLocation}
            value={productLocation}
            error={productLocationError}
            touched={productLocationError !== ""}
            textInputStyle={style.inputWithoutBgColor}
            style={style.txtInputWithoutBgColor}
          />
        </View>
        <TitleWithInfoIcon title="Description" />

        <CustomTxtInput
          placeholder={`Please provide detailed information about your products.\n\nEx: Used iPhone in great condition! 1 year old, 90% battery health, and only minor scratches.`}
          returnKeyType="next"
          returnKeyLabel="next"
          keyboardType={"default"}
          textInputStyle={style.txtDesc}
          style={style.textInput}
          multiline={true}
          textAlignVertical="top"
          maxLength={200}
          onChangeText={onChangeProductDescription}
          onBlur={onBlurDescription}
          value={productDescription}
          error={productDescriptionError}
          touched={productDescriptionError !== ""}
          onSubmitEditing={() => {}}
          extraPeddingLeft={true}
        />

        <TitleWithInfoIcon title="Mode of transports" />
        <View style={style.paddingHorizontal}>
          <CustomDropdown
            dropDownData={VEHICLE_TYPE_DATA}
            placeHolder={"Select"}
            value={vehicle}
            topMargin={20}
            onSelect={(val) => {
              setVehicleError("");
              setVehicle(val.key);
            }}
            error={vehicleError}
          />
        </View>
        <TitleWithInfoIcon title="Selling Price" />
        <CustomTxtInput
          placeholder="Enter price"
          returnKeyType="done"
          returnKeyLabel="done"
          keyboardType={"numeric"}
          icon={<Text style={style.txtrf}>R₣</Text>}
          onChangeText={onChangeProductSelling}
          onBlur={onBlurSellingPrice}
          value={productSellingPrice}
          error={productSellingPriceError}
          touched={productSellingPriceError !== ""}
          textInputStyle={style.inputSellingPrice}
          style={style.txtSellingPrice}
          extraPeddingLeft={true}
        />
        <View style={[style.paddingHorizontal, { paddingHorizontal: 10 }]}>
          <TermsAndCondition
            checked={checked}
            toggleCheckbox={toggleCheckbox}
            isTandC={true}
          />
        </View>
        <View style={style.btnSubmit}>
          <CustomButton
            onPress={() => {
              Keyboard.dismiss();
              onPressSubmit();
            }}
            title={"Submit"}
            buttonWidth="full"
            variant="primary"
            type="solid"
            disabled={loading === LoadingState.CREATE}
            loading={loading === LoadingState.CREATE}
          />
        </View>
      </KeyboardAwareScrollView>
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
    </View>
  );
};

export default AddNewProduct;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  scrollCont: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  txtDesc: {
    height: Scale(150),
    backgroundColor: theme?.colors?.textInputFieldBg,
    paddingHorizontal: 10,
    paddingTop: 3,
    borderRadius: 4,
    marginHorizontal: 20,
  },
  textInput: {
    height: 140,
    width: "100%",
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs15,
    lineHeight: 20,
  },
  txtrf: {
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.bold,
    fontSize: theme.fontSize?.fs11,
    lineHeight: 13,
    marginHorizontal: 10,
  },
  txtSellingPrice: {
    height: Scale(50),
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs15,
    width: "90%",
  },
  inputSellingPrice: {
    height: Scale(50),
    backgroundColor: theme?.colors?.textInputFieldBg,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginHorizontal: 20,
  },
  inputWithoutBgColor: {
    height: 40,
    backgroundColor: theme?.colors?.transparent,
  },
  txtInputWithoutBgColor: {
    height: 40,
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs15,
    width: "95%",
  },
  btnSubmit: {
    marginVertical: 10,
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
  error: {
    marginTop: 5,
    fontSize: theme.fontSize?.fs12,
    color: theme.colors?.error,
    marginLeft: 20,
  },
}));
