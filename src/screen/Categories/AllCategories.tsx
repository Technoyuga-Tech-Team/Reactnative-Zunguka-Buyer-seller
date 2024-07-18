import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";
import CustomHeader from "../../components/ui/CustomHeader";
import { useCategories } from "../../hooks/useCategories";
import { CategoriesDataProps } from "../../types/dashboard.types";
import ExpandableView from "../../components/ExpandableView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NoDataFound from "../../components/ui/NoDataFound";
import CategoriesListWithExpand from "./CategoriesListWithExpand";

const AllCategories: React.FC<HomeNavigationProps<Route.navAllCategories>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const { data: categoriesData, isFetching } = useCategories();

  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);

  const [expand, setExpand] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (categoriesData?.data?.data) {
      setCategories(categoriesData?.data?.data);
    }
  }, [categoriesData]);

  const onExpand = (id: number) => {
    setExpand(null);
    expand == id ? setExpand(null) : setExpand(id);
  };

  const onPressCategory = (
    subCatId: number,
    subName: string,
    parantCatId: number,
    parantName: string
  ) => {
    setSubCategoryId(subCatId);
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Categories" />
      <KeyboardAwareScrollView contentContainerStyle={style.scrollCont}>
        <CategoriesListWithExpand
          categoriesData={categories}
          onExpand={onExpand}
          expand={expand}
          showRadio={false}
          isLoading={isFetching}
          onPressCategory={(sub, subName, parant, parantName) =>
            onPressCategory(sub, subName, parant, parantName)
          }
          subCategoryId={subCategoryId}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AllCategories;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background,
    paddingTop: props.insets.top,
  },
  scrollCont: {
    flexGrow: 1,
  },
  itemCont: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  txtItemTitle: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 2,
    letterSpacing: 0.8,
    textTransform: "capitalize",
    textAlign: "left",
  },
}));
