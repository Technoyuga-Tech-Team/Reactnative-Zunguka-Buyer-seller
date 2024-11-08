import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// @ts-ignore
import Stars from "react-native-stars";
import { ThemeProps } from "../../types/global.types";
import { SCREEN_WIDTH } from "../../constant";
import Scale from "../../utils/Scale";
import StarIcon from "./svg/StarIcon";
import HalfStarIcon from "./svg/HalfStarIcon";
import { AppImage } from "../AppImage/AppImage";
import { Images } from "../../assets/images";

const RatingBoxSelection = ({
  rating,
  onRatingChange,
  onlyStar,
}: {
  rating: number;
  onRatingChange?: (rate: number) => void;
  onlyStar?: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [hoverRating1, setHoverRating1] = useState<number>(0);
  const [hoverRating2, setHoverRating2] = useState<number>(0);
  const [hoverRating3, setHoverRating3] = useState<number>(0);

  const handlePress = (newRating: number) => {
    setHoverRating1(newRating);
    onRatingChange && onRatingChange(newRating);
  };

  const btn1 =
    hoverRating1 == 1 ? Images.CHECKED_RADIO : Images.UNCHECKED_RADIO;
  const btn2 =
    hoverRating2 == 2 ? Images.CHECKED_RADIO : Images.UNCHECKED_RADIO;
  const btn3 =
    hoverRating3 == 3 ? Images.CHECKED_RADIO : Images.UNCHECKED_RADIO;

  const onPressStars = (count1: number, count2: number, count3: number) => {
    setHoverRating1(count1);
    setHoverRating2(count2);
    setHoverRating3(count3);
  };

  return (
    <View style={style.ratingCont}>
      <TouchableOpacity
        onPress={() => onPressStars(1, 0, 0)}
        style={style.starCont}
      >
        <View>
          <AppImage
            source={btn1}
            style={style.radioButton}
            resizeMode="cover"
          />
          <Text>Bad</Text>
        </View>
        <Stars
          disabled
          half={true}
          default={hoverRating1}
          // update={handlePress}
          spacing={10}
          starSize={26}
          count={3}
          fullStar={
            <StarIcon
              color={theme.colors?.primary}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
          emptyStar={
            <StarIcon
              color={theme.colors?.borderButtonColor}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
          halfStar={
            <HalfStarIcon
              color={theme.colors?.primary}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressStars(0, 2, 0)}
        style={style.starCont}
      >
        <Text>Good</Text>

        <Stars
          disabled
          half={true}
          default={hoverRating2}
          // update={handlePress}
          spacing={10}
          starSize={26}
          count={3}
          fullStar={
            <StarIcon
              color={theme.colors?.primary}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
          emptyStar={
            <StarIcon
              color={theme.colors?.borderButtonColor}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
          halfStar={
            <HalfStarIcon
              color={theme.colors?.primary}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressStars(0, 0, 3)}
        style={style.starCont}
      >
        <Text>Vary Good</Text>

        <Stars
          disabled
          half={true}
          default={hoverRating3}
          // update={handlePress}
          spacing={10}
          starSize={26}
          count={3}
          fullStar={
            <StarIcon
              color={theme.colors?.primary}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
          emptyStar={
            <StarIcon
              color={theme.colors?.borderButtonColor}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
          halfStar={
            <HalfStarIcon
              color={theme.colors?.primary}
              height={26}
              width={26}
              style={{ marginRight: 5 }}
            />
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default RatingBoxSelection;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  ratingCont: {
    // width: SCREEN_WIDTH - 60,
    // height: Scale(56),
    backgroundColor: theme.colors?.white,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "flex-start",
  },
  txtRateTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.white,
  },
  starRatingContainer: {
    flexDirection: "row",
  },
  starCont: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    width: SCREEN_WIDTH - 100,
    alignSelf: "center",
  },
  radioButton: {
    height: Scale(16),
    width: Scale(16),
  },
}));
