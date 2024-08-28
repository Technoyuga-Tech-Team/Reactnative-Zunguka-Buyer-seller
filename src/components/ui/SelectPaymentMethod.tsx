import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { AppImage } from "../AppImage/AppImage";
import Scale from "../../utils/Scale";
import { Images } from "../../assets/images";
import { RWF } from "../../constant";

export interface SortData {
  title: string;
  value: string;
  selected: boolean;
  key?: number | undefined;
}

interface SelectPaymentMethodProps {
  sortData: SortData[];
  onPressItem: (index: number, key: number | undefined) => void;
  isBoarderBottom?: boolean;
  totalUsersEarning: string;
  totalAmount: string;
}

const SelectPaymentMethod: React.FC<SelectPaymentMethodProps> = ({
  sortData,
  onPressItem,
  isBoarderBottom = true,
  totalUsersEarning,
  totalAmount,
}) => {
  const style = useStyle();
  const { theme } = useTheme();
  return (
    <View style={style.cont}>
      {sortData?.map((item, index) => {
        const btn = item?.selected
          ? Images.CHECKED_RADIO
          : Images.UNCHECKED_RADIO;
        const isDisable =
          index == 1 &&
          (Number(totalUsersEarning) <= 0 ||
            Number(totalAmount) >= Number(totalUsersEarning));

        return (
          <TouchableOpacity
            disabled={isDisable}
            key={index}
            onPress={() => onPressItem(index, item?.key)}
            activeOpacity={0.8}
            style={[style.radioItemCont, isBoarderBottom && style.borderBottom]}
          >
            <AppImage
              source={btn}
              style={style.radioButton}
              resizeMode="cover"
              tintColor={
                isDisable ? theme?.colors?.lightGrey : theme?.colors?.black
              }
            />
            <Text
              style={[
                style.txtTitle,
                {
                  color: isDisable
                    ? theme?.colors?.lightGrey
                    : theme?.colors?.black,
                },
              ]}
            >
              {item.title}{" "}
              <Text style={style.txtTitle1}>
                {index == 1 &&
                  Number(totalUsersEarning) > 0 &&
                  `(${RWF} ${totalUsersEarning})`}
              </Text>
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectPaymentMethod;

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
  txtTitle1: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.grey11,
  },
  borderBottom: {
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
}));
