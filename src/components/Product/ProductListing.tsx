import React, { forwardRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControlProps,
  Text,
  TouchableOpacity,
  View,
  FlatListProps,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductItem from "./ProductItem";
import { ProductDataProps } from "../../types/product.types";
import NoDataFound from "../ui/NoDataFound";
import DownArrowIcon from "../ui/svg/DownArrowIcon";

interface ProductProps extends FlatListProps<any> {
  productData: ProductDataProps[];
  onPress: (itemId: number, item: ProductDataProps) => void;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  onEndReached?: () => void;
  isLoading?: boolean;
  showLoadMore?: boolean;
  fromClosedItem?: boolean;
  fromPurchase?: boolean;
  onPressHireMover?: (itemId: number, item: ProductDataProps) => void;
  ref?: React.Ref<FlatList | null>;
  packageIndex?: number;
}

export const ProductListing = React.forwardRef<FlatList, ProductProps>(
  (
    {
      productData,
      onPress,
      refreshControl,
      onEndReached,
      isLoading,
      showLoadMore,
      fromClosedItem = false,
      fromPurchase = false,
      onPressHireMover,
      packageIndex,
      displayLabel,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const style = useStyles({ insets });
    const { theme } = useTheme();
    const renderItem = ({
      item,
      index,
    }: {
      item: ProductDataProps;
      index: number;
    }) => {
      return (
        <ProductItem
          item={item}
          displayLabel={displayLabel}
          showBorder={index == packageIndex}
          fromClosedItem={fromClosedItem}
          fromPurchase={fromPurchase}
          onPress={() => onPress(item.id, item)}
          onPressHireMover={() =>
            onPressHireMover && onPressHireMover(item.id, item)
          }
        />
      );
    };

    const ItemSeparator = () => {
      return <View style={style.border} />;
    };

    const Footer = () => {
      if (showLoadMore) {
        return (
          <TouchableOpacity
            onPress={onEndReached}
            activeOpacity={0.8}
            style={style.moreCont}
          >
            {isLoading ? (
              <ActivityIndicator color={theme?.colors?.primary} />
            ) : (
              <>
                <Text style={style.txtSeeMore}>see more</Text>
                <DownArrowIcon
                  color={theme?.colors?.primary}
                  height={16}
                  width={16}
                />
              </>
            )}
          </TouchableOpacity>
        );
      }
      return <></>;
    };

    return (
      <>
        {productData?.length > 0 ? (
          <FlatList
            ref={ref}
            data={productData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_item, index) => index.toString()}
            contentContainerStyle={style.container}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            refreshControl={refreshControl}
            onEndReachedThreshold={0.1}
            initialNumToRender={10}
            ListFooterComponent={Footer}
          />
        ) : (
          <NoDataFound title="No Items found!" isLoading={isLoading} />
        )}
      </>
    );
  }
);

// const ProductListing: React.FC<ProductProps> = ({
//   productData,
//   onPress,
//   refreshControl,
//   onEndReached,
//   isLoading,
//   showLoadMore,
//   fromClosedItem = false,
//   onPressHireMover,
//   ref,
//   packageIndex,
// }) => {
//   const insets = useSafeAreaInsets();
//   const style = useStyles({ insets });
//   const { theme } = useTheme();

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: ProductDataProps;
//     index: number;
//   }) => {
//     return (
//       <ProductItem
//         item={item}
//         showBorder={index == packageIndex}
//         fromClosedItem={fromClosedItem}
//         onPress={() => onPress(item.id, item)}
//         onPressHireMover={() =>
//           onPressHireMover && onPressHireMover(item.id, item)
//         }
//       />
//     );
//   };

//   const ItemSeparator = () => {
//     return <View style={style.border} />;
//   };

//   const Footer = () => {
//     if (showLoadMore) {
//       return (
//         <TouchableOpacity
//           onPress={onEndReached}
//           activeOpacity={0.8}
//           style={style.moreCont}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={theme?.colors?.primary} />
//           ) : (
//             <>
//               <Text style={style.txtSeeMore}>see more</Text>
//               <DownArrowIcon
//                 color={theme?.colors?.primary}
//                 height={16}
//                 width={16}
//               />
//             </>
//           )}
//         </TouchableOpacity>
//       );
//     }
//     return <></>;
//   };

//   console.log("ref - - ", ref);
//   return (
//     <>
//       {productData?.length > 0 ? (
//         <FlatList
//           ref={ref}
//           data={productData}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={(_item, index) => index.toString()}
//           contentContainerStyle={style.container}
//           renderItem={renderItem}
//           ItemSeparatorComponent={ItemSeparator}
//           refreshControl={refreshControl}
//           onEndReachedThreshold={0.1}
//           initialNumToRender={10}
//           ListFooterComponent={Footer}
//         />
//       ) : (
//         <NoDataFound title="No Items found!" isLoading={isLoading} />
//       )}
//     </>
//   );
// };

export default ProductListing;

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    paddingBottom: 100,
    marginTop: 10,
  },
  border: {
    height: 1,
    backgroundColor: theme?.colors?.border,
    width: "100%",
    marginVertical: 10,
  },
  txtSeeMore: {
    color: theme.colors?.secondaryText,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs13,
    marginBottom: 5,
  },
  moreCont: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
}));
