import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HIT_SLOP2 } from "../constant";
import { ThemeProps } from "../types/global.types";

interface SeeAllItemProps {
  title: string;
  onPressSeeAll: () => void;
}

const SeeAllItem: React.FC<SeeAllItemProps> = ({ title, onPressSeeAll }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  return (
    <View style={style.container}>
      <Text style={style.txtTitle}>{title}</Text>
      <TouchableOpacity
        onPress={onPressSeeAll}
        activeOpacity={0.8}
        hitSlop={HIT_SLOP2}
      >
        <Text style={style.txtSeeAll}>{"See all"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeeAllItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
  },
  txtSeeAll: {
    fontSize: theme.fontSize?.fs11,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    textDecorationLine: "underline",
    letterSpacing: 0.7,
  },
}));
