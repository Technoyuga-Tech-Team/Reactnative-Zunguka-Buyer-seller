import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeNavigationProps } from "../types/navigation";
import { Route } from "../constant/navigationConstants";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import styles from "rn-range-slider/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../components/ui/CustomHeader";
import HotBrandsListing from "../components/HotBrands/HotBrandsListing";
import { HotBrandaDataProps } from "../types/dashboard.types";
import { getData } from "../utils/asyncStorage";
import { BASE_URL, secureStoreKeys } from "../constant";
import { API } from "../constant/apiEndpoints";

const AllBrands: React.FC<HomeNavigationProps<Route.navAllBrand>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hotBrands, setHotBrands] = useState<HotBrandaDataProps[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllBrands(10, 1, true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getAllBrands = async (
    limit: number,
    page: number,
    refresh: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API.GET_BRANDS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("data", data);
      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setLoading(false);
        refresh
          ? setHotBrands([...data?.data?.data])
          : setHotBrands([...hotBrands, ...data?.data?.data]);

        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getAllBrands(10, page, false);
    }
  };

  const onRefresh = () => {
    setHotBrands([]);
    getAllBrands(10, 1, true);
  };

  const onPressHotBrands = (item: HotBrandaDataProps) => {
    navigation.navigate(Route.navSearchProduct, {
      mainCat: item.name,
      subCat: "",
    });
  };
  return (
    <View style={style.container}>
      <CustomHeader title="All Brands" />
      <View style={style.innerCont}>
        <HotBrandsListing
          HotBrandsData={hotBrands}
          onPressHotBrands={(item) => onPressHotBrands(item)}
          onEndReached={onEndReached}
          loading={loading}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={theme?.colors?.primary}
              // @ts-ignore
              colors={[theme?.colors?.primary]}
            />
          }
        />
      </View>
    </View>
  );
};

export default AllBrands;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background,
    paddingTop: props.insets.top,
  },
  innerCont: {
    flex: 1,
    paddingHorizontal: 20,
  },
}));
