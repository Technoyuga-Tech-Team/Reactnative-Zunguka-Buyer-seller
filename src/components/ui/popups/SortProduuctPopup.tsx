import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import CustomButton from "../CustomButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constant";
import PopupHeaderWithClose from "./PopupHeaderWithClose";
import RenderSortItemsList, { SortData } from "../RenderSortItemsList";

interface SortProduuctPopupProps {
  visiblePopup: boolean;
  togglePopup: () => void;
  onPressShowItems: () => void;
}

const SortProduuctPopup: React.FC<SortProduuctPopupProps> = ({
  visiblePopup,
  togglePopup,
  onPressShowItems,
}) => {
  const style = useStyle();
  const { theme } = useTheme();

  const [sortData, setSortData] = useState([
    {
      title: "Best Match",
      selected: false,
    },
    {
      title: "Lowest price to highest price",
      selected: false,
    },
    {
      title: "Highest price to lowest price",
      selected: false,
    },
    {
      title: "Newly listed",
      selected: true,
    },
  ]);

  const onPressItem = (index: number) => {
    setSortData(
      sortData.map((item, itemIndex) => ({
        ...item,
        selected: index === itemIndex,
      }))
    );
  };

  return (
    <Modal
      visible={visiblePopup}
      onRequestClose={togglePopup}
      style={style.modalCont}
      transparent={true}
      animationType="slide"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePopup}
        style={style.container}
      ></TouchableOpacity>
      <View style={style.container1}>
        <View style={style.innerCont}>
          <PopupHeaderWithClose title="Sort" onPressClose={togglePopup} />

          <RenderSortItemsList sortData={sortData} onPressItem={onPressItem} />

          <View style={style.buttonCont}>
            <CustomButton
              onPress={onPressShowItems}
              title={"Show Items"}
              buttonWidth="half"
              width={SCREEN_WIDTH - 100}
              variant="primary"
              type="solid"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SortProduuctPopup;

const useStyle = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors?.overlay,
    elevation: 1,
  },
  container1: {
    // flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalCont: {
    backgroundColor: "transparent",
  },
  innerCont: {
    height: "auto",
    width: "100%",
    backgroundColor: theme.colors?.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  txtLoginToZunguka: {
    fontSize: theme.fontSize?.fs22,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    marginTop: 10,
  },
  txtLoginToZunguka1: {
    fontSize: theme.fontSize?.fs18,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
    marginVertical: 20,
    textAlign: "center",
    width: "90%",
  },
  txtLoginToZungukaDesc: {
    fontSize: theme.fontSize?.fs17,
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
    marginTop: 20,
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
