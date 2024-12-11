import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../../types/global.types";
import Scale from "../../../utils/Scale";
import { AppImage } from "../../AppImage/AppImage";
import { DUMMY_PLACEHOLDER } from "../../../constant";
import ChatIcon from "../svg/ChatIcon";

interface RateItemProps {
  item: object;
  onPressMessage: () => void;
}

const RateItem: React.FC<RateItemProps> = ({ item, onPressMessage }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const product_image =
    item?.images?.length > 0 ? item?.images[0]?.uri : DUMMY_PLACEHOLDER;

  return (
    <DropShadow style={style.shadow}>
      <TouchableOpacity activeOpacity={1} style={style.container}>
        <View style={style.innerCont}>
          <View style={style.innerCont1}>
            <AppImage
              source={product_image}
              style={style.profile}
              resizeMode="cover"
            />
            <View style={style.namePhoneEmailCont}>
              <Text style={style.txtName}>{item?.title}</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
              <TouchableOpacity onPress={onPressMessage}>
                <ChatIcon color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default RateItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: theme.colors?.white,
    padding: 10,
    borderRadius: 8,
  },
  profile: {
    height: Scale(56),
    width: Scale(56),
    borderRadius: Scale(56 / 2),
    resizeMode: "cover",
    alignSelf: "flex-start",
    borderWidth: 3,
    borderColor: "rgba(103, 194, 201, 1)",
  },
  txtName: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.primaryText,
  },
  txtEmailPhone: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.greyed,
    marginTop: 3,
    width: "80%",
  },
  txtLocationRate: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginLeft: 5,
  },
  txtCont: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  txtInnerCont: {
    flexDirection: "row",
    marginTop: 10,
  },
  txtHire: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.white,
  },
  btnHire: {
    height: Scale(40),
    backgroundColor: theme.colors?.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  shadow: {
    shadowColor: theme.colors?.blackTrans,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  txtRate: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.greyed,
  },
  rateCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtVehicalType: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 5,
  },
  priceCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 0.5,
  },
  addressCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  innerCont: {
    flexDirection: "row",
  },
  innerCont1: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  namePhoneEmailCont: { marginLeft: 10, flex: 1 },
}));
