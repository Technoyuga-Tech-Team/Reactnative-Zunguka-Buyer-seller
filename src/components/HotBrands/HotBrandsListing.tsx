import React from "react";
import { FlatList } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import HotBrandsItem from "./HotBrandsItem";

interface CategoryDataProps {
  HotBrandsData: any;
  onPressHotBrands: (item: any) => void;
}

const HotBrandsListing: React.FC<CategoryDataProps> = ({
  HotBrandsData,
  onPressHotBrands,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const renderItem = ({ item }: { item: any }) => {
    return (
      <HotBrandsItem
        item={item}
        onPressHotBrands={() => onPressHotBrands(item)}
      />
    );
  };

  return (
    <FlatList
      data={HotBrandsData}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      contentContainerStyle={style.container}
      renderItem={renderItem}
    />
  );
};

export default HotBrandsListing;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
}));
