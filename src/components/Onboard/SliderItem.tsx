import * as React from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { SCREEN_WIDTH } from "../../constant";
import { SliderItemProps } from "../../types/slider.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";

interface SliderProps {
  item: SliderItemProps;
  bannerHeight?: number;
  bannerwidth?: number;
  borderRadius?: number;
}

const SliderItem: React.FC<SliderProps> = ({
  item,
  bannerHeight,
  bannerwidth,
  borderRadius,
}) => {
  const height = bannerHeight || 213.41;
  const width = bannerwidth || SCREEN_WIDTH;
  const radius = borderRadius || 8;
  const styles = useStyles({ height, width, radius });
  const { theme } = useTheme();

  return (
    <View style={bannerHeight ? styles.container : styles.container1}>
      <AppImage
        source={item?.image}
        style={styles.sliderImage}
        resizeMode={"cover"}
      />
    </View>
  );
};

const useStyles = makeStyles(
  (theme, props: { height: number; width: number; radius: number }) => {
    return {
      container: {
        alignItems: "center",
        justifyContent: "flex-end",
        width: SCREEN_WIDTH,
        height: props?.height,
      },
      container1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 100,
      },
      imageContainer: {
        paddingVertical: Scale(20),
      },
      sliderImage: {
        height: props?.height,
        width: props?.width,
        borderRadius: props?.radius,
      },
    };
  }
);

export default SliderItem;
