import { View, Text } from "react-native";
import React from "react";
import { makeStyles } from "react-native-elements";
import CustomButton from "./CustomButton";

interface LoginToZungukaProps {
  onPressLogin: () => void;
}

const LoginToZunguka: React.FC<LoginToZungukaProps> = ({ onPressLogin }) => {
  const style = useStyles();

  return (
    <View style={style.guestUserCont}>
      <Text style={style.txtTitle}>Login to Zunguka</Text>
      <Text style={style.txtTitle1}>Start Sell and Buy Products...</Text>
      <CustomButton
        onPress={onPressLogin}
        title={"Login"}
        buttonWidth="full"
        variant="primary"
        type="solid"
      />
    </View>
  );
};

export default LoginToZunguka;

const useStyles = makeStyles((theme) => ({
  guestUserCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
  },
  txtTitle1: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    paddingVertical: 10,
  },
}));
