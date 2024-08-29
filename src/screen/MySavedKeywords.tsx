import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import CustomHeader from "../components/ui/CustomHeader";
import { HomeNavigationProps } from "../types/navigation";
import { Route } from "../constant/navigationConstants";
import { CustomTxtInput } from "../components/ui/CustomTextInput";
import CustomButton from "../components/ui/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CloseIcon from "../components/ui/svg/CloseIcon";
import { HIT_SLOP } from "../constant";

const MySavedKeywords: React.FC<
  HomeNavigationProps<Route.navMySavedKeyword>
> = () => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [keywords, setKeywords] = useState("");

  const [savedKeywords, setSavedKeywords] = useState([
    {
      id: 1,
      name: "Iphone",
    },
    {
      id: 2,
      name: "Samsung",
    },
    {
      id: 3,
      name: "Oneplus",
    },
    {
      id: 4,
      name: "Galaxy ultra 5g",
    },
  ]);

  return (
    <View style={style.container}>
      <CustomHeader title="My Saved Keyword" />
      <KeyboardAwareScrollView contentContainerStyle={style.scrollContainer}>
        <View style={{ marginHorizontal: 20 }}>
          <CustomTxtInput
            placeholder="Enter your keywords"
            returnKeyType="done"
            returnKeyLabel="done"
            keyboardType={"default"}
            onChangeText={(val) => setKeywords(val)}
            value={keywords}
          />
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {savedKeywords.map((ele) => {
            return (
              <View
                style={{
                  height: 40,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: theme?.colors?.borderButtonColor,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginHorizontal: 5,
                  overflow: "hidden",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Text>{ele.name}</Text>
                <TouchableOpacity
                  hitSlop={HIT_SLOP}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: theme?.colors?.borderButtonColor,
                    marginLeft: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CloseIcon
                    color={theme?.colors?.black}
                    height={15}
                    width={15}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={style.btnCont}>
          <CustomButton
            onPress={() => {}}
            title={"Login"}
            buttonWidth="full"
            variant="primary"
            type="solid"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MySavedKeywords;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  btnCont: {
    marginVertical: 10,
  },
}));
