import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Images } from "../../assets/images";
import { AppImage } from "../AppImage/AppImage";
import { determineCardType, getCardImage } from "../../utils";
import Scale from "../../utils/Scale";
import { makeStyles, useTheme } from "react-native-elements";

interface SelectCardViewProsp {
  cards: any;
  onPressCard: (ind: number) => void;
}

const SelectCardView: React.FC<SelectCardViewProsp> = ({
  cards,
  onPressCard,
}) => {
  const style = useStyle();
  const { theme } = useTheme();
  return (
    <View>
      {cards.map((ele: { selected: any; cardNumber: string }, ind: any) => {
        const btn = ele?.selected
          ? Images.CHECKED_RADIO
          : Images.UNCHECKED_RADIO;
        return (
          <TouchableOpacity
            onPress={() => onPressCard(ind)}
            activeOpacity={0.8}
            style={style.itemCont}
          >
            <View style={style.innerCont}>
              <AppImage
                source={getCardImage(determineCardType(ele.cardNumber))}
                resizeMode="contain"
                style={style.image}
              />
              <Text>
                {determineCardType(ele.cardNumber)} ****
                {ele.cardNumber.slice(-4)}
              </Text>
            </View>
            <AppImage
              source={btn}
              style={style.radioButton}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectCardView;

const useStyle = makeStyles((theme) => ({
  itemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  innerCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: Scale(32),
    height: Scale(20),
    marginHorizontal: 10,
  },
  radioButton: {
    height: Scale(20),
    width: Scale(20),
  },
}));
