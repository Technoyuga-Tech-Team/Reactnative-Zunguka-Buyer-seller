// start
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "../components/ui/CustomButton";
import CustomHeader from "../components/ui/CustomHeader";
import { CustomTxtInput } from "../components/ui/CustomTextInput";
import KeywordWithCloseIcon from "../components/ui/KeywordWithCloseIcon";
import { Route } from "../constant/navigationConstants";
import { LoadingState, ThemeProps } from "../types/global.types";
import { HomeNavigationProps } from "../types/navigation";
import { notifyMessage } from "../utils/notifyMessage";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  deleteSavedKeyword,
  userSavedKeyword,
} from "../store/userprofile/userprofile.thunk";
import { getData } from "../utils/asyncStorage";
import { BASE_URL, secureStoreKeys } from "../constant";
import { API } from "../constant/apiEndpoints";
import { useSelector } from "react-redux";
import { selectUserProfileLoading } from "../store/userprofile/userprofile.selectors";
import NoDataFound from "../components/ui/NoDataFound";
import InputFieldInfo from "../components/ui/InputFieldInfo";

const MySavedKeywords: React.FC<
  HomeNavigationProps<Route.navMySavedKeyword>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const userLoading = useSelector(selectUserProfileLoading);

  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedKeywords, setSavedKeywords] = useState<
    {
      keyword: string;
      id: number;
    }[]
  >([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetMySavedKeyword(10, 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const GetMySavedKeyword = async (limit: number, page: number) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API.LIST_SAVED_KEYWORD}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Handle the fetched data here
      if (data && data?.data?.length > 0) {
        setKeywords("");
        setSavedKeywords(data?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onPress = async (id: number) => {
    const newData = savedKeywords.filter((item) => item.id !== id);
    setSavedKeywords(newData);
    try {
      const result = await dispatch(deleteSavedKeyword({ id: id }));
      if (deleteSavedKeyword.fulfilled.match(result)) {
        if (result.payload?.status === 1) {
          console.log("response deleteSavedKeyword - - - ", result.payload);
        }
      } else {
        console.log("errror deleteSavedKeyword --->", result.payload);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onPressSave = async () => {
    if (keywords !== "") {
      const formData = new FormData();
      formData.append("keyword", keywords);
      const result = await dispatch(userSavedKeyword({ formData }));
      if (userSavedKeyword.fulfilled.match(result)) {
        if (result.payload.status === 1) {
          GetMySavedKeyword(10, 1);
        }
      } else {
        console.log("errror userSavedKeyword --->", result.payload);
      }
    } else {
      notifyMessage("Please insert keyword");
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader title="My Saved Keyword" />
      <KeyboardAwareScrollView contentContainerStyle={style.scrollContainer}>
        <View style={{ marginHorizontal: 20 }}>
          <CustomTxtInput
            placeholder="Enter your keywords"
            value={keywords}
            onChangeText={(val) => setKeywords(val)}
            keyboardType={"default"}
            returnKeyLabel="done"
            returnKeyType="done"
            onSubmitEditing={() => {
              onPressSave();
            }}
          />
          <InputFieldInfo
            text={
              "You will be notified when any product arrives which is match with your keywords."
            }
          />
        </View>

        <View style={style.keywordsContainer}>
          {savedKeywords && savedKeywords.length > 0 ? (
            savedKeywords.map((ele) => {
              return (
                <KeywordWithCloseIcon
                  name={ele.keyword}
                  onPress={() => onPress(ele.id)}
                />
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NoDataFound title="No keyword found" isLoading={loading} />
            </View>
          )}
        </View>
        <View style={style.btnCont}>
          <CustomButton
            loading={userLoading == LoadingState.CREATE}
            disabled={userLoading == LoadingState.CREATE}
            onPress={onPressSave}
            title={"Save"}
            buttonWidth="full"
            variant="primary"
            type="solid"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MySavedKeywords;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  btnCont: {
    marginVertical: 10,
  },
  keywordsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));
