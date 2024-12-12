import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  View,
  ViewToken,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { AppImage } from "../../components/AppImage/AppImage";
import { Images } from "../../assets/images";
import CustomHeader from "../../components/ui/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_HEIGHT } from "../../constant";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

interface HowItWorksProps {}

const HowItWorks: React.FC<HowItWorksProps> = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const width = SCREEN_WIDTH;
  const height = SCREEN_HEIGHT - 170;

  const style = useStyles({ insets, width, height });

  console.log("WINDOW_HEIGHT", WINDOW_HEIGHT);

  return (
    <View style={style.scrollCont}>
      <CustomHeader title="How It Works" />
      <AppImage
        source={Images.HOW_IT_WORKS}
        resizeMode="contain"
        style={[style.howItWorksImage]}
      />
    </View>
  );
};

export default HowItWorks;

export const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollCont: {
    flex: 1,
    paddingTop: props.insets.top,
    backgroundColor: theme.colors?.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  howItWorksImage: {
    height: props?.height,
    width: props?.width,
    borderRadius: props?.radius,
  },
}));
