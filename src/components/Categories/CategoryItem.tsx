import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoriesDataProps } from "../../types/dashboard.types";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";

interface CategoryItemProps {
  item: CategoriesDataProps;
  onPressCategory: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  onPressCategory,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPressCategory}
      activeOpacity={0.9}
      style={style.container}
    >
      {/* <View style={style.imageBg}> */}
      <AppImage source={item.icon} style={style.product} resizeMode="cover" />
      {/* </View> */}
      <Text style={style.txtTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginVertical: 10,
    alignItems: "center",
    marginRight: 10,
    width: Scale(80),
  },
  product: {
    height: Scale(56),
    width: Scale(56),
    borderRadius: Scale(56 / 2),
    resizeMode: "cover",
  },
  imageBg: {
    height: Scale(56),
    width: Scale(56),
    borderRadius: Scale(56 / 2),
    backgroundColor: theme.colors?.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.darkGrey,
    marginTop: 2,
    letterSpacing: 0.8,
    textTransform: "capitalize",
    textAlign: "center",
  },
}));
