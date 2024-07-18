import React, { useEffect, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import CustomButton from "../../components/ui/CustomButton";
import { PRODUCTS, SCREEN_WIDTH } from "../../constant";
import ProductListing from "../../components/Product/ProductListing";
import { Route } from "../../constant/navigationConstants";
import { HomeNavigationProps } from "../../types/navigation";
import { useGetProducts } from "../../hooks/useGetProducts";
import { ProductDataProps } from "../../types/product.types";

const Sell: React.FC<HomeNavigationProps<Route.navSell>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);

  const {
    data: productsData,
    refetch,
    isLoading,
    isError,
  } = useGetProducts("my", `${10}`, `${page}`, { enabled: false });

  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch().then();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isError && productsData?.data?.data) {
      setProducts([...products, ...productsData?.data?.data]);
      setTotalPage(productsData?.data?.totalPages);
      setPage(page + 1);
    }
  }, [productsData]);

  const onPressProduct = () => {
    navigation.navigate(Route.navProductDetails);
  };

  const onPressCreateListing = () => {
    navigation.navigate(Route.navAddNewProduct);
  };

  const onEndReached = () => {
    if (page <= totalPage && !loader) {
      refetch().then();
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.txtTitle}>Selling</Text>
      <View style={style.button}>
        <CustomButton
          onPress={onPressCreateListing}
          title={"Create new listing"}
          buttonWidth="half"
          width={SCREEN_WIDTH - 40}
          variant="secondary"
          type="outline"
        />
      </View>
      <ProductListing
        isLoading={loader}
        productData={products}
        onPress={onPressProduct}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default Sell;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  txtTitle: {
    color: theme.colors?.black,
    fontFamily: theme.fontFamily?.bold,
    fontSize: theme.fontSize?.fs20,
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    marginVertical: 15,
  },
}));
