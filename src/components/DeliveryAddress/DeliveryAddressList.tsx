import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import DeliveryAddressItem from "./DeliveryAddressItem";
import { DeliveryAddressDataProps } from "../../types/payment.types";
import NoDataFound from "../ui/NoDataFound";

interface DeliveryAddressListProps {
  onPressItem: (item: any) => void;
  onPressEdit: (item: any) => void;
  DeliveryAddressData: DeliveryAddressDataProps[];
  selectedAddress: number | null;
  isLoading: boolean;
  onEndReached: () => void;
}

const DeliveryAddressList: React.FC<DeliveryAddressListProps> = ({
  onPressItem,
  onPressEdit,
  DeliveryAddressData,
  selectedAddress,
  isLoading,
  onEndReached,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: DeliveryAddressDataProps }) => {
    return (
      <DeliveryAddressItem
        item={item}
        isSelectedAddress={selectedAddress == item.id}
        onPressItem={() => onPressItem(item)}
        onPressEdit={() => onPressEdit(item)}
      />
    );
  };

  return (
    <>
      {DeliveryAddressData?.length > 0 ? (
        <FlatList
          data={DeliveryAddressData}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={style.container}
          onMomentumScrollEnd={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator color={theme.colors?.primary} />
            ) : null
          }
        />
      ) : (
        <NoDataFound title="No Address found!" isLoading={isLoading} />
      )}
    </>
  );
};

export default DeliveryAddressList;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
}));
