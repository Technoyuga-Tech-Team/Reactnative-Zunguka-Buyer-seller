import React from "react";
import { Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "../../components/ui/CustomButton";
import RightRoundIcon from "../../components/ui/svg/RightRoundIcon";
import { SCREEN_WIDTH } from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { CommonActions } from "@react-navigation/native";

const Congratulations: React.FC<
  HomeNavigationProps<Route.navCongratulations>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const { itemId } = route.params;

  const onPressDone = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: Route.navDashboard,
            state: {
              routes: [{ name: Route.navSell }],
            },
          },
        ],
      })
    );
  };

  const onPressViewListing = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.navProductDetails, params: { itemId: itemId } }],
      })
    );
  };
  return (
    <View style={style.container}>
      <View style={style.innerCont}>
        <RightRoundIcon color={theme?.colors?.green} />
        <Text style={style.txtCong}>Congratulations</Text>
        <Text style={style.txtDesc}>Your item is listed for sale</Text>
      </View>
      <View style={style.button}>
        <CustomButton
          onPress={onPressDone}
          title={"Done"}
          buttonWidth="full"
          variant="primary"
          type="solid"
        />
      </View>
      <View style={style.button}>
        <CustomButton
          onPress={onPressViewListing}
          title={"View listing"}
          buttonWidth="half"
          width={SCREEN_WIDTH - 40}
          variant="secondary"
          type="outline"
        />
      </View>
    </View>
  );
};

export default Congratulations;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingBottom: 20,
  },
  scrollCont: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  innerCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtCong: {
    fontSize: theme.fontSize?.fs22,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.green,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  txtDesc: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  button: {
    marginVertical: 10,
  },
}));
