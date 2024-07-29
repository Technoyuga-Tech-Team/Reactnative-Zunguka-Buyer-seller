import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import { CreditDebitCardNumber } from "../../utils";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import WaveIcon from "../ui/svg/WaveIcon";
import { Images } from "../../assets/images";
import { SCREEN_WIDTH } from "../../constant";

interface CardViewProps {
  source: any;
  cardName: string;
  expiryDate: string;
  cardNumber: string;
  upperTextColor?: string;
  bottomTextColor?: string;
  cardType?: string;
  isSelectd?: boolean;
}

const CardView: React.FC<CardViewProps> = ({
  source,
  cardName,
  expiryDate,
  cardNumber,
  upperTextColor,
  bottomTextColor,
  cardType,
  isSelectd,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const getCardImage = (cardType: string | undefined) => {
    switch (cardType) {
      case "visa":
        return Images.VISA;
      case "master-card":
        return Images.MC;
      case "mastercard":
        return Images.MC;
      case "american-express":
        return Images.AMEX;
      case "american express":
        return Images.AMEX;
      case "discover":
        return Images.DISCOVER;
      default:
        return Images.VISA;
    }
  };

  return (
    <ImageBackground source={source} style={style.imgCard}>
      <View style={style.innerCont}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSelectd && (
            <View
              style={{
                height: Scale(20),
                width: Scale(20),
                borderRadius: Scale(20 / 2),
                backgroundColor: theme.colors?.primary,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: Scale(10),
                  width: Scale(10),
                  borderRadius: Scale(10 / 2),
                  backgroundColor: theme.colors?.white,
                }}
              />
            </View>
          )}
          <Text style={[style.txtCreditCard, { color: upperTextColor }]}>
            Credit Card
          </Text>
        </View>
        <WaveIcon />
      </View>
      <View style={style.bottomViewonCard}>
        <View style={style.innerTopCont}>
          <Text style={[style.txtCardItems, { color: bottomTextColor }]}>
            {cardName || "Enter the name on card"}
          </Text>
          <Text style={[style.txtCardItems, { color: bottomTextColor }]}>
            {expiryDate || "__ /__"}
          </Text>
        </View>
        <View style={style.innerBottomCont}>
          <Text
            style={[
              style.txtCardItems,
              { marginTop: 10, color: bottomTextColor },
            ]}
          >
            {CreditDebitCardNumber(cardNumber) || "••••  ••••  ••••  8557"}
          </Text>
          <View style={[style.cardType]}>
            <AppImage
              source={getCardImage(cardType)}
              resizeMode="contain"
              style={{
                width: Scale(32),
                height: Scale(20),
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CardView;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  imgCard: {
    height: Scale(270),
    width: SCREEN_WIDTH,
    resizeMode: "contain",
  },
  txtCreditCard: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
  },
  bottomViewonCard: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 40,
    marginBottom: 30,
    width: "80%",
  },
  txtCardItems: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
  },
  innerCont: {
    marginHorizontal: 40,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerTopCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  innerBottomCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardType: {
    height: Scale(32),
    width: Scale(44),
    borderRadius: 4,
    backgroundColor: theme.colors?.white,
    alignItems: "center",
    justifyContent: "center",
  },
}));
