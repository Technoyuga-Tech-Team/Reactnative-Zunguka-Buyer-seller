import { View, Text } from "react-native";
import React from "react";
import InfoIcon from "./svg/InfoIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";

interface TitleWithInfoIconProps {
  title: string;
  showIcon?: boolean;
}

const TitleWithInfoIcon: React.FC<TitleWithInfoIconProps> = ({
  title,
  showIcon = false,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <Text style={style.txtTitle}>{title}</Text>
      {showIcon && <InfoIcon color={theme?.colors?.unselectedIconColor} />}
    </View>
  );
};

export default TitleWithInfoIcon;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
  },
  txtTitle: {
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.bold,
    fontSize: theme.fontSize?.fs17,
    marginRight: 5,
  },
}));
