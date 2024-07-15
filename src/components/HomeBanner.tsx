import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  View,
  ViewToken,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { HOME_BANNERS, SCREEN_WIDTH } from "../constant";
import { createArrayUseNumber } from "../utils";
import SliderItem from "./Onboard/SliderItem";
import Paginator from "./ui/Paginator";
import Scale from "../utils/Scale";
// relative path

const { width: wWidth } = Dimensions.get("window");

interface HomeBannerProps {}

const HomeBanner: React.FC<HomeBannerProps> = ({}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const sliderRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // handle hardware back button click
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       if (currentSlide === 0) {
  //         return false;
  //       } else {
  //         sliderRef.current?.scrollToOffset({
  //           offset: (currentSlide - 1) * wWidth,
  //           animated: true,
  //         });
  //         setCurrentSlide((pv) => pv - 1);
  //         return true;
  //       }
  //     };
  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);
  //     return () =>
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //   }, [currentSlide])
  // );

  // scroll to next slide
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextSlide = async () => {
    if (currentSlide < HOME_BANNERS.length - 1) {
      sliderRef.current?.scrollToIndex({ index: currentSlide + 1 });
    } else {
      sliderRef.current?.scrollToIndex({ index: 0 });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide().then();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [nextSlide]);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setCurrentSlide(viewableItems[0].index as number);
    }
  ).current;

  const scrollToIndex = (index: number) => {
    sliderRef.current?.scrollToIndex({ index });
  };

  return (
    <View style={styles.mainCont}>
      <View style={styles.innerCont}>
        <Animated.FlatList
          ref={sliderRef}
          contentContainerStyle={styles.fltCont}
          horizontal={true}
          data={HOME_BANNERS}
          pagingEnabled={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          keyExtractor={(_item, index) => index.toString()}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => (
            <SliderItem
              item={item}
              bannerHeight={180}
              bannerwidth={SCREEN_WIDTH - 30}
            />
          )}
        />
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Paginator
            data={createArrayUseNumber(HOME_BANNERS.length)}
            scrollX={scrollX}
            variant={"secondary"}
            marginHorizontal={2}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeBanner;

export const useStyles = makeStyles((theme) => ({
  mainCont: {
    marginTop: 20,
  },
  innerCont: { flex: 1 },
  bottomSafeAreaView: {
    flex: 0,
  },
  lgCont: { flex: 1 },
  topSafeAreaView: {
    flex: 0,
    zIndex: 999,
    backgroundColor: theme.colors?.background,
  },
  subContainer: {
    flex: 0.3,
    paddingHorizontal: 20,
  },
  bottomCont: {
    paddingBottom: 16,
  },
  fltCont: { flexGrow: 1 },
}));
