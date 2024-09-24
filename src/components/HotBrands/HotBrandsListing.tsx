import React from "react";
import { FlatList, RefreshControlProps, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import HotBrandsItem from "./HotBrandsItem";
import { HotBrandaDataProps } from "../../types/dashboard.types";
import NoDataFound from "../ui/NoDataFound";

interface CategoryDataProps {
  HotBrandsData: HotBrandaDataProps[];
  onPressHotBrands: (item: any) => void;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  onEndReached?: () => void;
  loading?: boolean;
}

const HotBrandsListing: React.FC<CategoryDataProps> = ({
  HotBrandsData,
  onPressHotBrands,
  refreshControl,
  onEndReached,
  loading,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });

  const renderItem = ({
    item,
    index,
  }: {
    item: HotBrandaDataProps;
    index: number;
  }) => {
    return (
      <HotBrandsItem
        item={item}
        index={index}
        onPressHotBrands={() => onPressHotBrands(item)}
      />
    );
  };
  if (HotBrandsData.length > 0) {
    return (
      <FlatList
        data={HotBrandsData}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={style.container}
        renderItem={renderItem}
        columnWrapperStyle={style.columnWrapper}
        refreshControl={refreshControl}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    );
  } else {
    return <NoDataFound title="No Brands Available" isLoading={loading} />;
  }
};

export default HotBrandsListing;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
  },
  columnWrapper: {
    // flexDirection: "row",
    // alignItems: "center",
  },
}));
