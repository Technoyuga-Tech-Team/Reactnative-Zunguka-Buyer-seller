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

const Congratulations1: React.FC<
  HomeNavigationProps<Route.navCongratulations1>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const onPressDone = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.navDashboard }],
      })
    );
  };

  const onPressViewListing = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: Route.navSearchProduct, params: { mainCat: "", subCat: "" } },
        ],
      })
    );
  };
  return (
    <View style={style.container}>
      <View style={style.innerCont}>
        <RightRoundIcon color={theme?.colors?.green} />
        <Text style={style.txtCong}>Congratulations</Text>
        <Text style={style.txtDesc}>
          You have successfully made payment for purchase
        </Text>
        <Text style={style.txtDesc1}>
          Once the seller has shipped, you will receive a shipping notification
        </Text>
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
          title={"Purchase another item"}
          buttonWidth="half"
          width={SCREEN_WIDTH - 40}
          variant="secondary"
          type="outline"
        />
      </View>
    </View>
  );
};

export default Congratulations1;

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
    textAlign: "center",
    marginTop: 10,
  },
  txtDesc1: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    lineHeight: 16,
    marginTop: 5,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
  },
}));
