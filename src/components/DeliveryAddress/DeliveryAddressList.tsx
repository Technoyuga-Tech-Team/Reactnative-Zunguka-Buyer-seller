import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import DeliveryAddressItem from "./DeliveryAddressItem";

interface DeliveryAddressListProps {
  onPressItem: (item: any) => void;
  onPressEdit: (item: any) => void;
  DeliveryAddressData: any;
  selectedAddress: any;
}

const DeliveryAddressList: React.FC<DeliveryAddressListProps> = ({
  onPressItem,
  onPressEdit,
  DeliveryAddressData,
  selectedAddress,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <DeliveryAddressItem
        item={item}
        isSelectedAddress={selectedAddress == item}
        onPressItem={() => onPressItem(item)}
        onPressEdit={() => onPressEdit(item)}
      />
    );
  };

  return (
    <FlatList
      data={DeliveryAddressData}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={style.container}
    />
  );
};

export default DeliveryAddressList;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
}));
