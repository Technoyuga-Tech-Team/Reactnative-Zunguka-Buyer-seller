import React, { useState } from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// @ts-ignore
import Stars from "react-native-stars";
import { ThemeProps } from "../../types/global.types";
import { SCREEN_WIDTH } from "../../constant";
import Scale from "../../utils/Scale";
import StarIcon from "./svg/StarIcon";
import HalfStarIcon from "./svg/HalfStarIcon";

const RatingBox = ({
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

  const [hoverRating, setHoverRating] = useState<number>(0);

  const handlePress = (newRating: number) => {
    setHoverRating(newRating);
    onRatingChange && onRatingChange(newRating);
  };

  return (
    <View>
      {onlyStar ? (
        <View style={{ flexDirection: "row" }}>
          <Stars
            display={rating}
            spacing={0}
            count={5}
            starSize={14}
            fullStar={
              <StarIcon
                color={theme.colors?.primary}
                height={14}
                width={14}
                style={{ marginRight: 5 }}
              />
            }
            emptyStar={
              <StarIcon
                color={theme.colors?.borderButtonColor}
                height={14}
                width={14}
                style={{ marginRight: 5 }}
              />
            }
          />
        </View>
      ) : (
        <View style={style.ratingCont}>
          <Stars
            half={true}
            default={1}
            update={handlePress}
            spacing={4}
            starSize={26}
            count={5}
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
                height={14}
                width={14}
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
        </View>
      )}
    </View>
  );
};

export default RatingBox;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  ratingCont: {
    width: SCREEN_WIDTH - 60,
    height: Scale(56),
    backgroundColor: theme.colors?.white,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txtRateTitle: {
    fontSize: theme.fontSize?.fs17,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.white,
  },
  starRatingContainer: {
    flexDirection: "row",
  },
}));
