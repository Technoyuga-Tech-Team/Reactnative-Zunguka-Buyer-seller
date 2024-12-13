import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  View,
  ViewToken,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { AppImage } from "../../components/AppImage/AppImage";
import { Images } from "../../assets/images";
import CustomHeader from "../../components/ui/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import {
  HOW_IT_WORKS_ARRAY,
  SCREEN_WIDTH,
  WINDOW_HEIGHT,
} from "../../constant";

interface HowItWorksProps {}

const HowItWorks: React.FC<HowItWorksProps> = () => {
  const insets = useSafeAreaInsets();
  const width = SCREEN_WIDTH;
  const height = 250;

  const style = useStyles({ insets, width, height });

  const renderItem = ({ item, index }) => (
    <View>
      <View style={style.howItWorksFlexContainer}>
        <View style={style.howItWorkMainWrapper}>
          <View style={style.howItWorkMainWrapperInner}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontWeight: "bold" }}>
              {item.id}
            </Text>
          </View>
        </View>
        <Text style={style.title}>{item.value}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {HOW_IT_WORKS_ARRAY?.length !== index + 1 ? (
          <View style={style.verticalHeightLine}></View>
        ) : (
          <View style={{ width: 45 }}></View>
        )}
        <View style={style.descriptionText}>
          <Text>{item.desc}</Text>
        </View>
      </View>
    </View>
  );

  console.log("WINDOW_HEIGHT", WINDOW_HEIGHT);

  return (
    <View style={style.scrollCont}>
      <CustomHeader title="How It Works" />
      <ScrollView>
        <AppImage
          source={Images.HOW_IT_WORKS}
          resizeMode="contain"
          style={[style.howItWorksImage]}
        />

        <View style={style.listMainContainer}>
          <FlatList
            data={HOW_IT_WORKS_ARRAY} // The data array
            renderItem={renderItem} // Function to render each item
            keyExtractor={(item) => item.id} // Unique key for each item
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HowItWorks;

export const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollCont: {
    flex: 1,
    paddingTop: props.insets.top,
    backgroundColor: theme.colors?.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  howItWorksImage: {
    height: props?.height,
    width: props?.width,
    borderRadius: props?.radius,
  },
  howItWorksFlexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  howItWorkMainWrapper: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  listMainContainer: {
    padding: 20,
  },
  howItWorkMainWrapperInner: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  verticalHeightLine: {
    backgroundColor: "black",
    width: 2,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    color: "rgba(51, 51, 51, 1)",
    fontSize: 16,
  },
  descriptionText: {
    maeginLeft: 25,
    width: SCREEN_WIDTH - 90,
    color: "rgba(51, 51, 51, 1)",
  },
}));
