import React from "react";
import { Animated, Platform, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import Scale from "../../utils/Scale";
import CardView from "./CardView";
import { GetPaymentCardData } from "../../types/payment.types";
import TrashIcon from "../ui/svg/TrashIcon";
import { Images } from "../../assets/images";

const rowTranslateAnimatedValues: any = {};

interface CardListProps {
  cardData: GetPaymentCardData[];
  onPressDelete: (card_id: string) => void;
  onPressCard: (card_id: string) => void;
  selectedCard?: string;
  fromProfile?: boolean;
}

const CardList: React.FC<CardListProps> = ({
  cardData,
  onPressDelete,
  onPressCard,
  selectedCard,
  fromProfile,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  cardData.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: GetPaymentCardData;
    index: number;
  }) => {
    return (
      <Animated.View
        style={[
          {
            height: rowTranslateAnimatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 238],
            }),
          },
        ]}
      >
        <TouchableOpacity
          disabled={fromProfile}
          onPress={() => onPressCard(item.id)}
          activeOpacity={1}
          style={style.rowFront}
        >
          <CardView
            source={Images.CARD1}
            cardName={item.name}
            cardNumber={`••••  ••••  ••••  ${item.last4}`}
            expiryDate={`${item.exp_month} / ${item.exp_year
              .toString()
              .slice(2)}`}
            upperTextColor={theme.colors?.black}
            bottomTextColor={theme.colors?.white}
            cardType={item.brand.toLocaleLowerCase()}
            isSelectd={selectedCard === item.id}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderHiddenItem = ({ item }: { item: GetPaymentCardData }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressDelete(item.id)}
        style={style.rowBack}
      >
        <View style={[style.backRightBtn, style.backRightBtnRight]}>
          <TrashIcon />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <SwipeListView
        disableRightSwipe
        data={cardData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-80}
        useNativeDriver={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: Platform.OS === "ios" ? 15 : 0,
            }}
          />
        )}
      />
    </View>
  );
};

export default CardList;
const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    height: Scale(270),
    width: SCREEN_WIDTH,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 75,
    backgroundColor: theme.colors?.transparent,
  },
  backRightBtnRight: {
    right: 5,
  },
}));
