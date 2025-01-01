import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/ui/CustomHeader";
import { Route } from "../../constant/navigationConstants";
import { useCategories } from "../../hooks/useCategories";
import { CategoriesDataProps } from "../../types/dashboard.types";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import CategoriesListWithExpand from "./CategoriesListWithExpand";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setSearchValueforCategory } from "../../store/settings/settings.slice";
import { createStringForCategorySelection } from "../../utils";

const AllCategories: React.FC<HomeNavigationProps<Route.navAllCategories>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const { data: categoriesData, isFetching } = useCategories();

  const [categories, setCategories] = useState<CategoriesDataProps[]>([]);

  const [expand, setExpand] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (categoriesData?.data?.data) {
      setCategories(categoriesData?.data?.data);
    }
  }, [categoriesData]);

  const onExpand = (id: number, subId: number) => {
    setSubCategoryId("");
    const finalData = categories?.map((c) => {
      return {
        ...c,
        isExpanded:
          c?.id === id && !subId
            ? c?.isExpanded
              ? false
              : true
            : c?.id === id
            ? c?.isExpanded
              ? true
              : false
            : false,
        subcategory: c?.subcategory?.length
          ? c?.subcategory?.map((sub) => {
              return {
                ...sub,
                isExpanded:
                  sub?.id === subId ? (sub?.isExpanded ? false : true) : false,
              };
            })
          : [],
      };
    });
    setCategories(finalData);
    // setExpand(null);
    // expand == id ? setExpand(null) : setExpand(id);
  };

  const onPressCategory = (
    subCatId: number,
    subName: string,
    parantCatId: number,
    parantName: string
  ) => {
    let subCategoryName = subName;

    const findCategoryName = categories?.find((c) => c?.isExpanded);
    const findSubCategory = findCategoryName?.subcategory?.find(
      (s) => s?.isExpanded
    );

    if (findSubCategory) {
      subCategoryName = `${findSubCategory?.name} ${subName}`;
    }

    navigation.navigate(Route.navSearchProduct, {
      mainCat: parantName,
      subCat: subCategoryName,
    });
    dispatch(setSearchValueforCategory(subCategoryName));
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
