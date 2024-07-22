import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import DropShadow from "react-native-drop-shadow";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import { Images } from "../../assets/images";
import PencilIcon from "../ui/svg/PencilIcon";
import { HIT_SLOP2 } from "../../constant";

interface DeliveryAddressItemProps {
  item: any;
  onPressItem: () => void;
  onPressEdit: () => void;
  isSelectedAddress: boolean;
}

const DeliveryAddressItem: React.FC<DeliveryAddressItemProps> = ({
  item,
  onPressItem,
  onPressEdit,
  isSelectedAddress,
}) => {
  const style = useStyles();
  const { theme } = useTheme();
  const btn = isSelectedAddress ? Images.CHECKED_RADIO : Images.UNCHECKED_RADIO;
  return (
    <DropShadow style={style.shadow}>
      <TouchableOpacity
        onPress={onPressItem}
        activeOpacity={0.8}
        style={style.container}
      >
        <View style={style.radioBtnCont}>
          <AppImage source={btn} style={style.radioButton} resizeMode="cover" />
        </View>
        <View style={style.centerCont}>
          <Text
            style={style.txtName}
          >{`${item.firstName} ${item.lastName}`}</Text>
          <Text numberOfLines={2} style={style.txtOthers}>
            {item.address}
          </Text>
          <Text style={style.txtOthers}>{item.phone}</Text>
          <Text style={style.txtOthers}>{`${item.region},${item.city}`}</Text>
          {isSelectedAddress && (
            <View style={style.defaultAddrCont}>
              <Text style={style.txtDefaultAddr}>Default address</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={onPressEdit}
          hitSlop={HIT_SLOP2}
          activeOpacity={0.5}
          style={style.pencilIcon}
        >
          <PencilIcon color={theme?.colors?.unselectedIconColor} />
        </TouchableOpacity>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default DeliveryAddressItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  shadow: {
    shadowColor: theme?.colors?.overlay,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS === "ios" ? 0.3 : 0.1,
    shadowRadius: 3,
    marginTop: 15,
  },
  container: {
    marginHorizontal: 20,
    minHeight: Scale(131),
    backgroundColor: theme?.colors?.white,
    borderRadius: 8,
    padding: 10,
  },
  radioButton: {
    height: Scale(17),
    width: Scale(17),
  },
  pencilIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  radioBtnCont: {
    position: "absolute",
    top: 13,
    left: 10,
  },
  centerCont: {
    flex: 1,
    paddingLeft: 25,
  },
  txtName: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  txtOthers: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
    marginTop: 5,
  },
  txtDefaultAddr: {
    fontSize: theme.fontSize?.fs11,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
  },
  defaultAddrCont: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: theme?.colors?.borderButtonColor,
    alignSelf: "flex-start",
    marginTop: 5,
  },
}));
