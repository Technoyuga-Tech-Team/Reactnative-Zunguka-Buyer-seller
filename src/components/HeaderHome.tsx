import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { Images } from "../assets/images";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Scale from "../utils/Scale";
import { HIT_SLOP2, SCREEN_WIDTH } from "../constant";
import BellIcon from "./ui/svg/BellIcon";
import SearchIcon from "./ui/svg/SearchIcon";
import MarqueeText from "react-native-marquee";

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
          <TouchableOpacity
            hitSlop={HIT_SLOP2}
            activeOpacity={0.8}
            style={style.notificationCont}
            onPress={onPressNotification}
          >
            <BellIcon color={theme?.colors?.primaryVibrant} />
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
    height: Scale(32),
    width: Scale(32),
    borderRadius: Scale(32 / 2),
    backgroundColor: theme?.colors?.borderButtonColor,
    alignItems: "center",
    justifyContent: "center",
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
    height: Scale(18),
    width: Scale(18),
    borderRadius: Scale(18 / 2),
    backgroundColor: theme.colors?.pinkDark,
    // borderWidth: 1.5,
    // borderColor: theme.colors?.white,
    position: "absolute",
    right: -5,
    top: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  txtNotificationCount: {
    fontSize: theme.fontSize?.fs10,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.white,
  },
}));
