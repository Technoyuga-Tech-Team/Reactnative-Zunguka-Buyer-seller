import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { Images } from "../assets/images";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Scale from "../utils/Scale";
import { HIT_SLOP2, SCREEN_WIDTH } from "../constant";
import SearchIcon from "./ui/svg/SearchIcon";
import MarqueeText from "react-native-marquee";
import RightRoundIcon from "./ui/svg/RightRoundIcon";
import { AppImage } from "./AppImage/AppImage";

interface HeaderHomeProps {
  name: string;
  onPressNotification: () => void;
  onPressSearch: () => void;
  notificationCount: number;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({
  name,
  onPressNotification,
  onPressSearch,
  notificationCount,
  onPressHowItWorkIcon,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <ImageBackground
      source={Images.HEADER_HOME_IMAGE}
      resizeMode="cover"
      style={style.imageHeader}
    >
      <View style={style.InnerCont}>
        <View style={style.nameCont}>
          <View style={style.nameInnerCont}>
            {/* <Text numberOfLines={1} style={style.txtName}>{`Hi ${name}!`}</Text> */}
            <MarqueeText
              style={style.txtName}
              speed={1}
              marqueeOnStart={true}
              loop={true}
              delay={1000}
            >
              {`Hi ${name}!`}
            </MarqueeText>
            <Text style={style.txtTitle}>
              Explore the world of hidden gems!
            </Text>
          </View>
          {/* <TouchableOpacity
            hitSlop={HIT_SLOP2}
            activeOpacity={1}
            style={style.HowItWorksCount}
            onPress={onPressHowItWorkIcon}
          >
            <AppImage
              style={{ height: 25, width: 25 }}
              source={Images.HOW_IT_WORKS_ICON}
              resizeMode="cover"
            />
          </TouchableOpacity> */}

          <TouchableOpacity
            hitSlop={HIT_SLOP2}
            activeOpacity={1}
            style={style.notificationCont}
            onPress={onPressNotification}
          >
            <RightRoundIcon
              color={theme?.colors?.white}
              height={Scale(60)}
              width={Scale(60)}
            />
            {notificationCount > 0 && (
              <View style={style.redDot}>
                <Text style={style.txtNotificationCount}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressSearch}
          style={style.searchCont}
        >
          <SearchIcon
            color={theme?.colors?.primary}
            style={style.searchIcon}
            height={18}
            width={18}
          />
          <Text style={style.txtSearch}>
            Search furniture, household items, etc
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HeaderHome;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  imageHeader: {
    height: Scale(193),
    width: SCREEN_WIDTH,
  },
  InnerCont: {
    flex: 1,
    paddingTop: props.insets.top,
    margin: 15,
    justifyContent: "flex-end",
  },
  notificationCont: {
    height: Scale(40),
    width: Scale(40),
    borderRadius: Scale(40 / 2),
    backgroundColor: theme?.colors?.pinkDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  HowItWorksCount: {
    height: Scale(50),
    width: Scale(50),
    borderRadius: Scale(50 / 2),
    backgroundColor: theme?.colors?.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  txtName: {
    fontSize: theme.fontSize?.fs28,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.white,
    letterSpacing: 0.36,
    lineHeight: 34,
    width: "90%",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
    lineHeight: 18,
    textTransform: "capitalize",
  },
  nameCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameInnerCont: { flex: 1 },
  txtSearch: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.grey11,
    height: Scale(18),
  },
  searchCont: {
    height: Scale(50),
    width: "100%",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme?.colors?.white,
    marginTop: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  redDot: {
    backgroundColor: theme.colors?.pinkDark,
    position: "absolute",
    right: -10,
    top: -5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
  },
  txtNotificationCount: {
    fontSize: theme.fontSize?.fs10,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.white,
  },
}));
