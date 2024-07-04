import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";

interface AllCategoriesListingProps {
  CategoryData: any[];
  isLoading: boolean;
  onEndReached: () => void;
  onPress: (item: any) => void;
}

const AllCategoriesListing: React.FC<AllCategoriesListingProps> = ({
  isLoading,
  CategoryData,
  onEndReached,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: any }) => {
    const product_image = item?.icon;
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        activeOpacity={0.9}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 5,
          marginTop: 10,
        }}
      >
        <AppImage
          source={product_image}
          style={style.productImage}
          resizeMode="cover"
        />
        <Text style={style.txtName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={CategoryData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        onMomentumScrollEnd={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? <ActivityIndicator color={theme.colors?.primary} /> : null
        }
      />
    </View>
  );
};

export default AllCategoriesListing;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  productImage: {
    height: Scale(160),
    width: Scale(175),
    borderRadius: 5,
  },
  txtName: {
    fontSize: theme.fontSize?.fs16,
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.regular,
    lineHeight: 21,
  },
}));
