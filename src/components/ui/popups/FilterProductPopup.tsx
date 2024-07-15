import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  COLORS,
  HIT_SLOP,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../constant";
import { ThemeProps } from "../../../types/global.types";
import Scale from "../../../utils/Scale";
import FilterItem from "../../Filter/FilterItem";
import RenderColors from "../../Filter/RenderColors";
import CustomRangeSlider from "../../Slider/CustomRangeSlider";
import CustomButton from "../CustomButton";
import BackIcon from "../svg/BackIcon";
import PopupHeaderWithClose from "./PopupHeaderWithClose";
import RenderCondition from "../../Filter/RenderCondition";
import RenderSortItemsList from "../RenderSortItemsList";

interface FilterProductPopupProps {
  visiblePopup: boolean;
  togglePopup: () => void;
}

const FilterProductPopup: React.FC<FilterProductPopupProps> = ({
  visiblePopup,
  togglePopup,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const { theme } = useTheme();

  const [visibleColor, setVisibleColor] = useState(false);
  const [visiblePrice, setVisiblePrice] = useState(false);
  const [visibleCondition, setVisibleCondition] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sliderVal, setSliderVal] = useState({ low: 50, high: 500 });

  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionData, setConditionData] = useState([
    {
      title: "New, unused",
      selected: false,
    },
    {
      title: "Near unused",
      selected: false,
    },
    {
      title: "No noticeable scratchs or stains",
      selected: false,
    },
    {
      title: "Slightly scratched or soiled",
      selected: false,
    },
    {
      title: "Scratched or soiled",
      selected: false,
    },
  ]);

  const onPressItem = (index: number) => {
    setSelectedCondition(conditionData[index].title);
    setConditionData(
      conditionData.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  const onPressState = () => {};
  const onPressCity = () => {};
  const onPressBrand = () => {};
  const onPressSize = () => {};
  const onPressCondition = () => {
    setVisibleCondition(true);
  };
  const onPressPrice = () => {
    setVisiblePrice(!visiblePrice);
  };
  const onPressCategories = () => {};
  const onPressRating = () => {};
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
          hitSlop={HIT_SLOP}
          activeOpacity={0.8}
        >
          <BackIcon color={theme?.colors?.black} />
        </TouchableOpacity>
        <Text style={style.txtHeaderTitle}>{title}</Text>
      </View>
    );
  };

  const handleColorSelect = (colors: any) => {
    setSelectedColors(colors);
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
          <FilterItem onPress={onPressCategories} title="Categories" value="" />
          <FilterItem
            onPress={onPressColor}
            title="Color"
            value={selectedColors?.join(", ")}
          />
          <FilterItem onPress={onPressRating} title="Rating" value="" />
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
          <FilterItem onPress={onPressSize} title="Size" value="" />
          <FilterItem
            onPress={onPressCondition}
            title="Condition"
            value={selectedCondition}
          />
          <FilterItem onPress={onPressBrand} title="Brand" value="" />
          <FilterItem onPress={onPressState} title="State" value="" />
          <FilterItem onPress={onPressCity} title="City" value="" />

          <View style={style.buttonCont}>
            <CustomButton
              title={"Show Items"}
              buttonWidth="half"
              width={SCREEN_WIDTH - 100}
              variant="primary"
              type="solid"
            />
          </View>
        </View>
      </View>
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
            title="Color"
            onPress={() => setVisibleColor(!visibleColor)}
          />
          <RenderColors
            selectedColors={selectedColors}
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
    backgroundColor: theme?.colors?.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: Scale(50),
    paddingHorizontal: 20,
    marginTop: props.insets.top + 20,
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
}));
