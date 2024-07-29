import React, { useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../types/global.types";
import DoubleRightIcon from "./ui/svg/DoubleRightIcon";
const { width } = Dimensions.get("window");
const lockWidth = width * 0.9;
const lockHeight = 60;
const smallgap = 8;
const finalPosition = lockWidth - lockHeight;

interface SwipeAnimationProps {
  onRight: () => void;
}

const SwipeAnimation: React.FC<SwipeAnimationProps> = ({ onRight }) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  const { theme } = useTheme();
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const translateBtn = pan.x.interpolate({
    inputRange: [0, finalPosition],
    outputRange: [0, finalPosition],
    extrapolate: "clamp",
  });
  const textOpacity = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateText = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [0, lockWidth / 4],
    extrapolate: "clamp",
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        if (g.vx > 2 || g.dx > lockWidth / 2) {
          unlock();
        } else {
          reset();
        }
      },
      onPanResponderTerminate: () => reset(),
    })
  ).current;
  const reset = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  const unlock = () => {
    reset();
    onRight();
    // Animated.spring(pan, {
    //   toValue: { x: finalPosition, y: 0 },
    //   useNativeDriver: true,
    //   bounciness: 0,
    // }).start();
  };
  return (
    <View style={styles.container}>
      <View style={styles.lockContainer}>
        <Animated.Text
          style={[
            styles.txt,
            {
              opacity: textOpacity,
              transform: [{ translateX: translateText }],
            },
          ]}
        >
          {"Swipe for quick payment"}
        </Animated.Text>
        <Animated.View
          style={[styles.bar, { transform: [{ translateX: translateBtn }] }]}
          {...panResponder.panHandlers}
        >
          <DoubleRightIcon
            color={theme?.colors?.white}
            style={{ marginRight: 10 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SwipeAnimation;
const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  lockContainer: {
    height: lockHeight,
    width: lockWidth,
    borderRadius: lockHeight,
    backgroundColor: theme?.colors?.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  txt: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
  },
  bar: {
    position: "absolute",
    height: lockHeight - smallgap * 2,
    width: lockHeight - smallgap * 2,
    left: smallgap,
    paddingLeft: 30,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
}));
