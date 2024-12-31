import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { CategoriesDataProps } from "../../types/dashboard.types";
import ExpandableView from "../../components/ExpandableView";
import NoDataFound from "../../components/ui/NoDataFound";
import { makeStyles } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppImage } from "../../components/AppImage/AppImage";
import Scale from "../../utils/Scale";
import { Images } from "../../assets/images";
import { SCREEN_WIDTH } from "../../constant";

interface CategoriesListWithExpandProps {
  categoriesData: CategoriesDataProps[];
  onExpand: (catId: number) => void;
  expand: number | null;
  onPressCategory: (
    subCatId: number,
    subCatName: string,
    parantCatId: number,
    parantCatName: string
  ) => void;
  isLoading: boolean;
  subCategoryId: number | null;
  showRadio?: boolean;
}

const CategoriesListWithExpand: React.FC<CategoriesListWithExpandProps> = ({
  categoriesData,
  onExpand,
  expand,
  onPressCategory,
  isLoading,
  subCategoryId,
  showRadio = true,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  return (
    <ScrollView>
      <View style={style.container}>
        {categoriesData?.length > 0 && !isLoading ? (
          categoriesData.map((item) => {
            return (
              <ExpandableView
                title={item?.name}
                isExpanded={item?.isExpanded || false}
                onExpand={() => onExpand(item.id)}
                children={
                  <View>
                    {item?.subcategory?.length > 0 &&
                      item?.subcategory?.map((sub) => {
                        const btn =
                          sub?.id == subCategoryId
                            ? Images.CHECKED_RADIO
                            : Images.UNCHECKED_RADIO;

                        return sub?.subcategory?.length ? (
                          <View style={{ width: SCREEN_WIDTH - 20 }}>
                            <ExpandableView
                              title={sub?.name}
                              isExpanded={sub?.isExpanded || false}
                              onExpand={() => onExpand(item.id, sub?.id)}
                              children={sub?.subcategory?.map((s) => {
                                const btn =
                                  s?.id == subCategoryId
                                    ? Images.CHECKED_RADIO
                                    : Images.UNCHECKED_RADIO;

                                return (
                                  <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() =>
                                      onPressCategory(
                                        s.id,
                                        s.name,
                                        s.parent_id,
                                        item?.name
                                      )
                                    }
                                    style={[style.itemCont]}
                                  >
                                    {showRadio && (
                                      <AppImage
                                        source={btn}
                                        style={style.radioButton}
                                        resizeMode="cover"
                                      />
                                    )}
                                    <Text style={style.txtItemTitle}>
                                      {showRadio ? "" : "-"} {s.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            />
                          </View>
                        ) : (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() =>
                              onPressCategory(
                                sub.id,
                                sub.name,
                                sub.parent_id,
                                item?.name
                              )
                            }
                            style={style.itemCont}
                          >
                            {showRadio && (
                              <AppImage
                                source={btn}
                                style={style.radioButton}
                                resizeMode="cover"
                              />
                            )}
                            <Text style={style.txtItemTitle}>
                              {showRadio ? "" : "-"} {sub.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                }
              />
            );
          })
        ) : (
          <NoDataFound title="No categories found!" isLoading={isLoading} />
        )}
      </View>
    </ScrollView>
  );
};

export default CategoriesListWithExpand;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background,
  },
  scrollCont: {
    flexGrow: 1,
  },
  itemCont: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txtItemTitle: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 2,
    letterSpacing: 0.8,
    textTransform: "capitalize",
    textAlign: "left",
    marginLeft: 10,
  },
  radioButton: {
    height: Scale(16),
    width: Scale(16),
  },
}));
