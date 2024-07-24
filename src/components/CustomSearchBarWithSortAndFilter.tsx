import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../types/global.types";
import BackIcon from "./ui/svg/BackIcon";
import LeftIcon from "./ui/svg/LeftIcon";
import SearchIcon from "./ui/svg/SearchIcon";
import Scale from "../utils/Scale";
import SortIcon from "./ui/svg/SortIcon";
import FilterIcon from "./ui/svg/FilterIcon";
import { HIT_SLOP } from "../constant";

interface CustomSearchBarWithSortAndFilterProps {
  onPressSort: () => void;
  onPressFilter: () => void;
  onPressBack: () => void;
  search: string;
  onChangeText: (val: string) => void;
  disabledButton?: boolean;
}

const CustomSearchBarWithSortAndFilter: React.FC<
  CustomSearchBarWithSortAndFilterProps
> = ({
  onPressSort,
  onPressFilter,
  onPressBack,
  search,
  onChangeText,
  disabledButton,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={style.innerCont}>
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          activeOpacity={0.8}
          onPress={onPressBack}
        >
          <LeftIcon
            color={theme?.colors?.black}
            style={{ marginHorizontal: 20 }}
          />
        </TouchableOpacity>
        <View style={style.searchCont}>
          <SearchIcon
            color={theme?.colors?.primary}
            height={20}
            width={20}
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            placeholder="Search furniture, household items, etc"
            placeholderTextColor={theme?.colors?.secondaryText}
            style={style.textInput}
            value={search}
            onChangeText={onChangeText}
            selectionColor={theme?.colors?.primary}
          />
        </View>
      </View>
      <View style={style.sortAndFilterCont}>
        <TouchableOpacity
          disabled={!disabledButton}
          activeOpacity={0.8}
          onPress={onPressSort}
          style={style.iconCont}
        >
          <SortIcon />
          <Text style={style.txtFilterAndSort}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!disabledButton}
          activeOpacity={0.8}
          onPress={onPressFilter}
          style={style.iconCont}
        >
          <FilterIcon />
          <Text style={style.txtFilterAndSort}>Filter</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomSearchBarWithSortAndFilter;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    marginTop: 20,
    borderBottomColor: theme?.colors?.border,
    borderBottomWidth: 1,
  },
  textInput: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: theme?.colors?.black,
    height: Scale(40),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: Scale(40),
    flex: 1,
    backgroundColor: theme?.colors?.backgroundLight1,
    borderRadius: 4,
  },
  innerCont: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  sortAndFilterCont: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  txtFilterAndSort: {
    fontSize: theme.fontSize?.fs13,
    fontFamily: theme.fontFamily?.regular,
    color: "#664B1B",
    marginLeft: 5,
  },
  iconCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    paddingVertical: 15,
    paddingLeft: 10,
  },
}));
