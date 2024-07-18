import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { SCREEN_WIDTH } from "../../constant";
import { SliderItemProps } from "../../types/slider.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import { BannerProps } from "../../types/dashboard.types";

interface SliderProps {
  item: BannerProps;
  bannerHeight?: number;
  bannerwidth?: number;
  borderRadius?: number;
  onPressBanner?: () => void;
}

const SliderItem: React.FC<SliderProps> = ({
  item,
  bannerHeight,
  bannerwidth,
  borderRadius,
  onPressBanner,
}) => {
  const height = bannerHeight || 213.41;
  const width = bannerwidth || SCREEN_WIDTH;
  const radius = borderRadius || 8;
  const styles = useStyles({ height, width, radius });
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPressBanner}
      activeOpacity={0.8}
      style={bannerHeight ? styles.container : styles.container1}
    >
      <AppImage
        source={item?.banner_image}
        style={styles.sliderImage}
        resizeMode={bannerHeight ? "cover" : "contain"}
      />
    </TouchableOpacity>
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
