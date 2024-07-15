import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { AppImage } from "../AppImage/AppImage";
import Scale from "../../utils/Scale";
import { Images } from "../../assets/images";

export interface SortData {
  title: string;
  selected: boolean;
}

interface RenderSortItemsListProps {
  sortData: SortData[];
  onPressItem: (index: number) => void;
}

const RenderSortItemsList: React.FC<RenderSortItemsListProps> = ({
  sortData,
  onPressItem,
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
            onPress={() => onPressItem(index)}
            activeOpacity={0.8}
            style={style.radioItemCont}
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
    paddingVertical: 20,
  },
  txtLoginToZunguka: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    marginTop: 10,
  },
  radioButton: {
    height: Scale(24),
    width: Scale(24),
  },
  radioItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    height: Scale(40),
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginLeft: 10,
  },
}));
