import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import RangeSlider from "rn-range-slider";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";

interface CustomRangeSliderProps {
  sliderVal: { low: number; high: number };
  setSliderVal: ({ low, high }: { low: number; high: number }) => void;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  sliderVal,
  setSliderVal,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const handleValueChange = useCallback((low: number, high: number) => {
    setSliderVal({ low, high });
  }, []);

  const renderThumb = useCallback(
    () => (
      <View
        style={{
          height: Scale(24),
          width: Scale(24),
          borderRadius: Scale(12),
          backgroundColor: theme.colors?.primary,
        }}
      />
    ),
    []
  );
  const renderRail = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors?.primaryLight,
          height: Scale(8),
          borderRadius: 4,
        }}
      />
    ),
    []
  );
  const renderRailSelected = useCallback(
    () => (
      <View
        style={{
          backgroundColor: theme.colors?.primary,
          height: Scale(8),
          borderRadius: 4,
        }}
      />
    ),
    []
  );

  return (
    <View style={{ zIndex: 111 }}>
      <RangeSlider
        style={style.slider}
        min={50}
        max={400}
        step={50}
        floatingLabel={false}
        low={sliderVal.low}
        high={sliderVal.high}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange}
      />
      <FlatList
        horizontal
        data={["0", "50", "100", "150", "200", "250", "300", "350", "400+"]}
        scrollEnabled={false}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={style.scrollCont}
        renderItem={({ item }) => {
          return <Text style={style.txtItem}>R₣{item}</Text>;
        }}
      />
    </View>
  );
};

export default CustomRangeSlider;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    backgroundColor: theme.colors?.background,
    paddingBottom: 110,
  },
  slider: {
    flex: 1,
  },
  notchRoot: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#4499ff",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  scrollCont: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  txtItem: {
    fontSize: theme.fontSize?.fs10,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    lineHeight: 13,
  },
}));
