import React, { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";
import CustomHeader from "../../components/ui/CustomHeader";
import RenderSortItemsList from "../../components/ui/RenderSortItemsList";
import TitleWithInfoIcon from "../../components/ui/TitleWithInfoIcon";
import { CITIES, CONDITIONS } from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { CustomTxtInput } from "../../components/ui/CustomTextInput";
import Scale from "../../utils/Scale";
import { isRequiredFields } from "../../constant/formValidations";
import TermsAndCondition from "../../components/ui/TermsAndCondition";
import PencilIcon from "../../components/ui/svg/PencilIcon";
import SellProductItems from "../../components/SellProductItems";
import CustomButton from "../../components/ui/CustomButton";
import PickSellProduct from "../../components/ui/PickSellProduct";
import { imagePickerProps } from "../../types/common.types";

const AddNewProduct: React.FC<HomeNavigationProps<Route.navAddNewProduct>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const productTitleRef = React.useRef<TextInput>(null);
  const locationRef = React.useRef<TextInput>(null);

  const [conditionData, setConditionData] = useState(CONDITIONS);
  const [selectedCondition, setSelectedCondition] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

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

  const toggleCheckbox = () => setChecked(!checked);
  const toggleCheckboxNotDamage = () =>
    setCheckedNotDamaged(!checkedNotDamaged);

  const onPressItem = (index: number) => {
    setSelectedCondition(conditionData[index].title);
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
      setProductTitleError("Selling price is required");
    }
  };

  const onBlurLocation = () => {
    let isValid = isRequiredFields(productLocation);
    if (!isValid) {
      setProductTitleError("Location is required");
    }
  };

  const onChangeProductSelling = (val: string) => {
    setProductSellingPriceError("");
    const newValue = val.replace(/\./, "");
    setProductSellingPrice(newValue);
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
    console.log("first");
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Create new listing" />
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollCont}
      >
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
          touched={productTitleError == ""}
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
          onPress={onPressSelectCategory}
          onPressIn={onPressSelectCategory}
          onPressOuterRightIcon={onPressSelectCategory}
          editable={false}
          // onChangeText={onChangeProductTitle}
          // onBlur={onBlurProductTitle}
          // value={productTitle}
          // error={productTitleError}
          // touched={productTitleError == ""}
          textInputStyle={style.inputWithoutBgColor}
          style={style.txtInputWithoutBgColor}
        />
        <TitleWithInfoIcon title="Condition of item" showIcon={true} />
        <RenderSortItemsList
          sortData={conditionData}
          onPressItem={onPressItem}
        />
        <TitleWithInfoIcon title="Item specifics" showIcon={true} />
        <View style={style.paddingHorizontal}>
          <SellProductItems title="Brand" value={""} onPressItem={() => {}} />
          <SellProductItems title="Color" value={""} onPressItem={() => {}} />
        </View>
        <TitleWithInfoIcon title="Location" />
        <View style={style.paddingHorizontal}>
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
          touched={productLocationError == ""}
          textInputStyle={style.inputWithoutBgColor}
          style={style.txtInputWithoutBgColor}
        />
        <TitleWithInfoIcon title="Photos" />
        <PickSellProduct
          images={productImages}
          setImages={(val) => {
            setProductImages(val);
          }}
        />

        <View style={[style.paddingHorizontal, { paddingHorizontal: 10 }]}>
          <TermsAndCondition
            checked={checkedNotDamaged}
            toggleCheckbox={toggleCheckboxNotDamage}
            title="Damages clearly photos"
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
          onChangeText={onChangeProductDescription}
          onBlur={onBlurDescription}
          value={productDescription}
          error={productDescriptionError}
          touched={productDescriptionError == ""}
          onSubmitEditing={() => {}}
        />
        <TitleWithInfoIcon title="Selling Price" />
        <CustomTxtInput
          placeholder="Enter price"
          returnKeyType="done"
          returnKeyLabel="done"
          keyboardType={"number-pad"}
          icon={<Text style={style.txtrf}>R₣</Text>}
          onChangeText={onChangeProductSelling}
          onBlur={onBlurSellingPrice}
          value={productSellingPrice}
          error={productSellingPriceError}
          touched={productSellingPriceError == ""}
          textInputStyle={style.inputSellingPrice}
          style={style.txtSellingPrice}
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
            }}
            title={"Submit"}
            buttonWidth="full"
            variant="primary"
            type="solid"
            // disabled={!isValid || loading === LoadingState.CREATE}
            // loading={loading === LoadingState.CREATE}
          />
        </View>
      </KeyboardAwareScrollView>
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
    marginHorizontal: 20,
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
}));
