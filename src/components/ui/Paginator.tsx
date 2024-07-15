import * as React from "react";
import { Animated, useWindowDimensions, View } from "react-native";
import { makeStyles } from "react-native-elements";
import Scale from "../../utils/Scale";
import { ViewStyleProps } from "../../types/common.types";

type ColorVariant = "primary" | "secondary";

interface SliderProps {
  data: number[];
  scrollX: Animated.Value;
  variant?: ColorVariant;
  marginHorizontal?: number;
  containerStyle?: ViewStyleProps;
  showSecondaryColor?: boolean;
}

const Paginator: React.FC<SliderProps> = ({
  data,
  scrollX,
  variant = "secondary",
  marginHorizontal = 10,
  containerStyle,
  showSecondaryColor = false,
}) => {
  const styles = useStyles({ variant, marginHorizontal });
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const doWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        const color = scrollX.interpolate({
          inputRange,
          outputRange: ["#FFFFFF", "#F3B241", "#FFFFFF"],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot,
              showSecondaryColor ? { backgroundColor: color } : { opacity },
            ]}
          />
        );
      })}
    </View>
  );
};

const useStyles = makeStyles(
  (theme, props: { variant: ColorVariant; marginHorizontal: number }) => ({
    container: {
      flexDirection: "row",
    },
    dot: {
      height: Scale(8),
      width: Scale(8),
      borderRadius: Scale(5),
      backgroundColor:
        props.variant === "secondary"
          ? theme.colors?.primary
          : theme.colors?.white,
      marginHorizontal: props.marginHorizontal || 10,
    },
  })
);

export default Paginator;
