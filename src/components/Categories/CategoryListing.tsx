import React from "react";
import { FlatList } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import CategoryItem from "./CategoryItem";
import { CategoriesDataProps } from "../../types/dashboard.types";

interface CategoryDataProps {
  CategoryData: CategoriesDataProps[];
  onPressCategory: (item: any) => void;
}

const CategoryListing: React.FC<CategoryDataProps> = ({
  CategoryData,
  onPressCategory,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const renderItem = ({ item }: { item: CategoriesDataProps }) => {
    return (
      <CategoryItem item={item} onPressCategory={() => onPressCategory(item)} />
    );
  };

  return (
    <FlatList
      data={CategoryData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      contentContainerStyle={style.container}
      renderItem={renderItem}
    />
  );
};

export default CategoryListing;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
}));
