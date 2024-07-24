import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { SCREEN_WIDTH } from "../../../constant";
import CustomButton from "../CustomButton";
import RenderSortItemsList from "../RenderSortItemsList";
import PopupHeaderWithClose from "./PopupHeaderWithClose";

interface SortProduuctPopupProps {
  visiblePopup: boolean;
  togglePopup: () => void;
  onPressShowItems: (val: number | null) => void;
}

const SortProduuctPopup: React.FC<SortProduuctPopupProps> = ({
  visiblePopup,
  togglePopup,
  onPressShowItems,
}) => {
  const style = useStyle();
  const { theme } = useTheme();
  const [selected, setSelected] = useState<number | null>(null);
  const [sortData, setSortData] = useState([
    {
      title: "Best Match",
      selected: false,
      key: 1,
    },
    {
      title: "Lowest price to highest price",
      selected: false,
      key: 2,
    },
    {
      title: "Highest price to lowest price",
      selected: false,
      key: 3,
    },
    {
      title: "Newly listed",
      selected: true,
      key: 4,
    },
  ]);

  const onPressItem = (index: number, key: number) => {
    setSelected(key);
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
              onPress={() => onPressShowItems(selected)}
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
