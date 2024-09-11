import { View, Text, Modal } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "react-native-elements";

import { TouchableWithoutFeedback } from "react-native";
import Scale from "../../../utils/Scale";
import FrameIcon from "../svg/FrameIcon";
import CustomButton from "../CustomButton";
import { SCREEN_WIDTH } from "../../../constant";

interface DeliveryConfirmationPopupProps {
  visiblePopup: boolean;
  togglePopup: () => void;
  onPressOkay: () => void;
}

const DeliveryConfirmationPopup: React.FC<DeliveryConfirmationPopupProps> = ({
  visiblePopup,
  togglePopup,
  onPressOkay,
}) => {
  const style = useStyle();
  const { theme } = useTheme();

  return (
    <Modal
      visible={visiblePopup}
      onRequestClose={togglePopup}
      onDismiss={togglePopup}
      style={style.modalCont}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback>
        <View style={style.container}>
          <View style={style.innerCont}>
            <View style={style.iconCont}>
              <FrameIcon />
              <Text style={style.txtLoginToAnypost}>
                Your package delivered successfully
              </Text>
            </View>
            <View style={style.buttonCont}>
              <CustomButton
                onPress={onPressOkay}
                title={"Okay"}
                buttonWidth="half"
                width={SCREEN_WIDTH - 100}
                variant="primary"
                type="solid"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeliveryConfirmationPopup;

const useStyle = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors?.overlay,
  },
  modalCont: {
    backgroundColor: "transparent",
  },
  innerCont: {
    height: Scale(300),
    width: "90%",
    backgroundColor: theme.colors?.white,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  txtLoginToAnypost: {
    fontSize: theme.fontSize?.fs18,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    marginTop: 20,
    textAlign: "center",
  },
  txtLoginToAnypostDesc: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.medium,
    textAlign: "center",
    color: theme.colors?.secondaryText,
    lineHeight: 20,
    marginTop: 10,
  },
  buttonCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonRightMargin: {
    marginRight: 10,
  },
  buttonLeftMargin: {
    marginLeft: 10,
  },
  iconCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
