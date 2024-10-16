import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductListing from "../../components/Product/ProductListing";
import CustomButton from "../../components/ui/CustomButton";
import { BASE_URL, SCREEN_WIDTH, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { ProductDataProps } from "../../types/product.types";
import { getData } from "../../utils/asyncStorage";

const Sell: React.FC<HomeNavigationProps<Route.navSell>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [products, setProducts] = useState<ProductDataProps[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMyProductProducts(10, 1, true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getMyProductProducts = async (
    limit: number,
    page: number,
    refresh: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_PRODUCTS}/all/my/${limit}/${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setLoader(false);
        refresh
          ? setProducts([...data?.data?.data])
          : setProducts([...products, ...data?.data?.data]);
        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
      } else {
        setProducts([]);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  const onPressProduct = (itemId: number, item: ProductDataProps) => {
    if (item.status == "Archived") {
      navigation.navigate(Route.navArchivedProductDetails, { item: item });
    } else {
      navigation.navigate(Route.navProductDetails, { itemId: itemId });
    }
  };

  const onPressCreateListing = () => {
    navigation.navigate(Route.navAddNewProduct, { product_id: null });
  };

  const onEndReached = () => {
    if (page <= totalPage && !loader) {
      getMyProductProducts(10, page, false);
    }
  };
  const onRefresh = () => {
    getMyProductProducts(10, 1, true);
  };

  console.log("products", JSON.stringify(products));

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
        showLoadMore={page <= totalPage}
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={onRefresh}
            tintColor={theme?.colors?.primary}
            // @ts-ignore
            colors={[theme?.colors?.primary]}
          />
        }
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
