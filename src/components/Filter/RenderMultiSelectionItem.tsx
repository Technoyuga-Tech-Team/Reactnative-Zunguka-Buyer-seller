import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import CheckBoxSelection from "../ui/CheckBoxSelection";

interface RenderMultiSelectionItemProps {
  selectedItem: any[];
  data: any[];
  onSelect: (val: any) => void;
}

const RenderMultiSelectionItem: React.FC<RenderMultiSelectionItemProps> = ({
  selectedItem,
  data,
  onSelect,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const { theme } = useTheme();
  const [items, setItems] = useState<any[]>(selectedItem);

  const handleCheckboxChange = (ele: any) => {
    const isSelected = items.some((item) => item.itemName === ele.itemName);
    const updatedItems = isSelected
      ? items.filter((c) => c.itemName !== ele.itemName)
      : [...items, { itemName: ele.itemName, itemValue: ele.itemValue }];
    setItems(updatedItems);
    onSelect(updatedItems);
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      <TouchableOpacity activeOpacity={1}>
        {data?.map((ele) => {
          return (
            <CheckBoxSelection
              isChecked={items.some((item) => item.itemName === ele.itemName)}
              onPressCheckbox={() => handleCheckboxChange(ele)}
              itemValue={ele.itemValue}
              itemName={ele.itemName}
            />
          );
        })}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default RenderMultiSelectionItem;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
}));
