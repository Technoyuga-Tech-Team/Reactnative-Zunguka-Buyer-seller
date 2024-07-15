import React from "react";
import { FlatList, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductItem from "./ProductItem";

interface ProductDataProps {
  productData: any[];
  onPress: (itemId: number) => void;
}

const ProductListing: React.FC<ProductDataProps> = ({
  productData,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const renderItem = ({ item }: { item: any }) => {
    return <ProductItem item={item} onPress={() => onPress(item.id)} />;
  };

  const ItemSeparator = () => {
    return <View style={style.border} />;
  };
  return (
    <FlatList
      data={productData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      contentContainerStyle={style.container}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default ProductListing;

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  border: {
    height: 1,
    backgroundColor: theme?.colors?.border,
    width: "100%",
    marginVertical: 10,
  },
}));
