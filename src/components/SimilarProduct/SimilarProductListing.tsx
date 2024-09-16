import React from "react";
import { FlatList } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import SimilarProductItem from "./SimilarProductItem";
import { similarDataProps } from "../../types/product.types";

interface SimilarProductListingProps {
  similarProductData: similarDataProps[] | undefined;
  onPressProduct: (id: any) => void;
}

const SimilarProductListing: React.FC<SimilarProductListingProps> = ({
  similarProductData,
  onPressProduct,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const renderItem = ({ item }: { item: similarDataProps }) => {
    return (
      <SimilarProductItem
        item={item}
        onPressProduct={() => onPressProduct(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={similarProductData}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      contentContainerStyle={style.container}
      renderItem={renderItem}
    />
  );
};

export default SimilarProductListing;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
}));
