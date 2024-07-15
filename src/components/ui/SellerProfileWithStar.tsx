import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import RatingBox from "./RatingBox";
import { AppImage } from "../AppImage/AppImage";
import Scale from "../../utils/Scale";
import { Images } from "../../assets/images";

const SellerProfileWithStar = () => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <AppImage
        source={Images.PLACEHOLDER_IMAGE}
        style={style.profile}
        resizeMode="cover"
      />
      <View style={style.innerCont}>
        <Text style={style.txtName}>Nick Furry</Text>
        <View style={style.rateCont}>
          <RatingBox rating={3} onlyStar={true} />
          <Text style={style.txtRatingCount}>(17)</Text>
        </View>
      </View>
    </View>
  );
};

export default SellerProfileWithStar;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profile: {
    height: Scale(40),
    width: Scale(40),
    borderRadius: Scale(40 / 2),
  },
  innerCont: {
    flex: 1,
    marginLeft: 10,
  },
  txtName: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.bold,
    color: theme?.colors?.black,
    marginBottom: 5,
  },
  txtRatingCount: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.black,
    marginLeft: 5,
  },
  rateCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));
