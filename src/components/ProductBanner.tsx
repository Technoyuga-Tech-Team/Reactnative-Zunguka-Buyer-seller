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

// relative path
import { SCREEN_WIDTH } from "../constant";
import { productImage } from "../types/product.types";
import { createArrayUseNumber } from "../utils";
import ProductBannerImage from "./Product/ProductBannerImage";
import Paginator from "./ui/Paginator";

const { width: wWidth } = Dimensions.get("window");

interface ProductBannerProps {
  productBannerData: productImage[];
}

const ProductBanner: React.FC<ProductBannerProps> = ({ productBannerData }) => {
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
    if (currentSlide < productBannerData?.length - 1) {
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

  return (
    <View style={styles.mainCont}>
      <Animated.FlatList
        ref={sliderRef}
        contentContainerStyle={styles.fltCont}
        horizontal={true}
        data={productBannerData}
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
          <ProductBannerImage
            item={item}
            bannerHeight={286}
            bannerwidth={SCREEN_WIDTH}
            borderRadius={1}
          />
        )}
      />
      {productBannerData?.length > 2 && (
        <View style={styles.outerPaginatorCont}>
          <Paginator
            data={createArrayUseNumber(productBannerData?.length)}
            scrollX={scrollX}
            variant={"secondary"}
            marginHorizontal={2}
            containerStyle={styles.paginatorCont}
            showSecondaryColor={true}
          />
        </View>
      )}
    </View>
  );
};

export default ProductBanner;

export const useStyles = makeStyles((theme) => ({
  mainCont: {},
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
  paginatorCont: {
    backgroundColor: theme?.colors?.greyed,
    padding: 5,
    borderRadius: 10,
  },
  outerPaginatorCont: {
    alignItems: "center",
    marginVertical: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
  },
}));
