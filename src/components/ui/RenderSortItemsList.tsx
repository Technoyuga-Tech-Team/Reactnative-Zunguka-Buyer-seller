import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { AppImage } from "../AppImage/AppImage";
import Scale from "../../utils/Scale";
import { Images } from "../../assets/images";

export interface SortData {
  title: string;
  value: string;
  selected: boolean;
}

interface RenderSortItemsListProps {
  sortData: SortData[];
  onPressItem: (index: number) => void;
  isBoarderBottom?: boolean;
}

const RenderSortItemsList: React.FC<RenderSortItemsListProps> = ({
  sortData,
  onPressItem,
  isBoarderBottom = true,
}) => {
  const style = useStyle();
  const { theme } = useTheme();

  return (
    <View style={style.cont}>
      {sortData?.map((item, index) => {
        const btn = item?.selected
          ? Images.CHECKED_RADIO
          : Images.UNCHECKED_RADIO;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onPressItem(index)}
            activeOpacity={0.8}
            style={[style.radioItemCont, isBoarderBottom && style.borderBottom]}
          >
            <AppImage
              source={btn}
              style={style.radioButton}
              resizeMode="cover"
            />
            <Text style={style.txtTitle}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RenderSortItemsList;

const useStyle = makeStyles((theme) => ({
  cont: {
    paddingHorizontal: 20,
    flex: 1,
    // paddingVertical: 20,
  },
  txtLoginToZunguka: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    marginTop: 10,
  },
  radioButton: {
    height: Scale(20),
    width: Scale(20),
  },
  radioItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    height: Scale(40),
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginLeft: 10,
  },
  borderBottom: {
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
}));
