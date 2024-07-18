import React, { useState } from "react";
import { LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import DownArrowIcon from "./ui/svg/DownArrowIcon";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Scale from "../utils/Scale";

interface ExpandableViewProps {
  title: string;
  children: any;
  onExpand: () => void;
  isExpanded: boolean;
}

const ExpandableView: React.FC<ExpandableViewProps> = ({
  title,
  children,
  onExpand,
  isExpanded,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = isExpanded
      ? withTiming(height, {
          duration: 100,
          easing: Easing.in(Easing.ease),
          reduceMotion: ReduceMotion.System,
        })
      : withTiming(0, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        });

    return {
      height: animatedHeight.value,
    };
  }, [isExpanded, height]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={style.container}
        onPress={onExpand}
      >
        <Text
          style={[
            style.txtTitle,
            {
              color: isExpanded ? theme?.colors?.red : theme?.colors?.black,
            },
          ]}
        >
          {title}
        </Text>
        <DownArrowIcon
          color={isExpanded ? theme?.colors?.red : theme?.colors?.iconColor}
          height={20}
          width={20}
          style={{ transform: [{ rotate: isExpanded ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>
      <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
        <View
          style={{ position: "absolute", paddingHorizontal: 10 }}
          onLayout={onLayout}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default ExpandableView;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Scale(50),
    paddingHorizontal: 20,
    marginTop: 10,
  },
  scrollCont: {
    flexGrow: 1,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs18,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    marginTop: 2,
    letterSpacing: 0.8,
    textTransform: "capitalize",
    textAlign: "center",
  },
}));
