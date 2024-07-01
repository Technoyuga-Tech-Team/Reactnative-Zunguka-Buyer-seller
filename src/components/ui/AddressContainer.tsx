import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { makeStyles, useTheme } from "react-native-elements";
import Scale from "../../utils/Scale";
import LocationIcon from "./svg/LocationIcon";

interface AddressContainerProps {
  address: string;
  onPressSave: () => void;
}

const AddressContainer: React.FC<AddressContainerProps> = ({
  address,
  onPressSave,
}) => {
  const style = useStyle();
  const { theme } = useTheme();
  return (
    <DropShadow style={style.shadow}>
      <View style={style.container}>
        <View style={style.firstCont}>
          <Text style={style.txtAddress}>Address</Text>
          <Text style={style.txtAddressCurrent}>Current Location</Text>
        </View>
        <View style={style.secondCont}>
          <LocationIcon color={theme?.colors?.aqua} />
          <Text style={style.address} numberOfLines={3}>
            {address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressSave}
          activeOpacity={0.8}
          style={style.btnSave}
        >
          <Text style={style.txtSave}>Save</Text>
        </TouchableOpacity>
      </View>
    </DropShadow>
  );
};

export default AddressContainer;

const useStyle = makeStyles((theme) => ({
  container: {
    marginHorizontal: 20,
    backgroundColor: theme?.colors?.white,
    borderRadius: 8,
  },
  shadow: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS === "ios" ? 0.8 : 0.4,
    shadowRadius: 50,
  },
  txtAddress: {
    color: theme.colors?.purple,
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
  },
  txtAddressCurrent: {
    color: theme.colors?.purple,
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
  },
  firstCont: {
    padding: 15,
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
  secondCont: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  address: {
    color: theme.colors?.purple,
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    marginLeft: 10,
    width: "90%",
  },
  txtSave: {
    color: theme.colors?.white,
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
  },
  btnSave: {
    height: Scale(50),
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: theme?.colors?.primary,
  },
}));
