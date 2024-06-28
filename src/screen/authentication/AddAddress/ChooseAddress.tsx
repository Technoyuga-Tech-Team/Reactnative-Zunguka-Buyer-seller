import { View, Text } from "react-native";
import React from "react";
import { AuthNavigationProps } from "../../../types/navigation";
import { Route } from "../../../constant/navigationConstants";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../../types/global.types";
import CustomHeader from "../../../components/ui/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChooseAddress: React.FC<AuthNavigationProps<Route.navChooseAddress>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <CustomHeader title="Choose your address" />
    </View>
  );
};

export default ChooseAddress;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background,
    paddingTop: props.insets.top,
    paddingBottom: props.insets.bottom + 10,
  },
}));
