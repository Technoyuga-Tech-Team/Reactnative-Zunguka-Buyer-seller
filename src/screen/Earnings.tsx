import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Route } from "../constant/navigationConstants";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  BASE_URL,
  HIT_SLOP2,
  SCREEN_WIDTH,
  secureStoreKeys,
} from "../constant";
import { ThemeProps } from "../types/global.types";

import { Images } from "../assets/images";
import PackageList from "../components/packages/PackageList";
import CustomButton from "../components/ui/CustomButton";
import LeftIcon from "../components/ui/svg/LeftIcon";
import PayoutHistory from "../components/ui/svg/PayoutHistory";
import { API } from "../constant/apiEndpoints";
import { HomeNavigationProps } from "../types/navigation";
import { getData } from "../utils/asyncStorage";
import Scale from "../utils/Scale";

const Earnings: React.FC<HomeNavigationProps<Route.navEarnings>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [myEarningData, setMyEarningData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMyEarningData(10, 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setTranslucent(true);
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getMyEarningData = async (limit: number, offset: number) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API.GET_MY_EARNING}/${limit}/${offset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("data", data?.data?.total_earning);
      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setLoading(false);
        setMyEarningData([...myEarningData, ...data?.data?.data]);
        setTotalEarning(data?.data?.total_earning);
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

  const onPressWithdraw = () => {
    navigation.navigate(Route.navWithdraw, {
      earning: parseFloat(`${totalEarning}`).toFixed(2),
    });
  };

  const onEndReached = () => {
    if (page <= totalPage && !loading) {
      getMyEarningData(10, page);
    }
  };

  const onPressShowPayoutHistory = () => {
    // navigation.navigate(Route.navPayoutHistory);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={Images.HEADER_HOME_IMAGE}
        style={style.imgContainer}
      >
        <StatusBar
          translucent={true}
          backgroundColor={theme.colors?.transparent}
          barStyle={"dark-content"}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={HIT_SLOP2}
            onPress={onPressBack}
          >
            <LeftIcon color={theme.colors?.white} height={18} width={18} />
          </TouchableOpacity>
          <Text style={style.txtTitle}>{"My Earnings"}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={HIT_SLOP2}
            onPress={onPressShowPayoutHistory}
          >
            <PayoutHistory color={theme.colors?.white} height={18} width={18} />
          </TouchableOpacity>
        </View>
        <View style={style.firstCont}>
          <View style={style.firstInnerCont}>
            <View>
              <Text style={style.txtEarning}>
                ${parseFloat(`${totalEarning}`).toFixed(2)}
              </Text>
              <Text style={style.txtBalance}>Balance</Text>
            </View>
            <CustomButton
              disabled={totalEarning == 0}
              onPress={onPressWithdraw}
              title={"Withdraw"}
              buttonWidth="half"
              variant="primary"
              type="solid"
              containerStyle={style.btnApply}
              titleStyle={style.txtBtnTitle}
              width={SCREEN_WIDTH / 2 - 30}
              backgroundColor={theme?.colors?.primary}
            />
          </View>
        </View>
      </ImageBackground>

      <View style={style.secondCont}>
        <PackageList
          data={myEarningData}
          isCompleted={true}
          isFromMover={true}
          onPress={() => {}}
          onPressRating={() => {}}
          onEndReached={onEndReached}
          isLoading={loading}
        />
      </View>
    </View>
  );
};

export default Earnings;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
  },
  imgContainer: {
    height: Scale(195),
    width: SCREEN_WIDTH,
    paddingTop: props.insets.top,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs20,
    color: theme.colors?.white,
    fontFamily: theme.fontFamily?.medium,
  },
  txtTitle1: {
    fontSize: theme.fontSize?.fs18,
    color: theme.colors?.white,
    fontFamily: theme.fontFamily?.medium,
  },
  btnApply: {
    backgroundColor: theme.colors?.primary,
    height: Scale(40),
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  txtBtnTitle: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.white,
  },
  txtEarning: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.primary,
  },
  txtBalance: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    lineHeight: theme.fontSize?.fs16,
    marginTop: 3,
    letterSpacing: 0.5,
  },
  firstCont: {
    paddingHorizontal: 20,
  },
  firstInnerCont: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors?.white,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  txtToday: {
    alignSelf: "center",
    fontSize: theme.fontSize?.fs12,
    color: theme.colors?.primaryText,
  },
  packageCont: { marginTop: 20, flex: 1 },
  secondCont: {
    flex: 1,
  },
  round: {
    height: Scale(40),
    width: Scale(40),
    borderRadius: Scale(20),
    backgroundColor: theme.colors?.white,
    alignItems: "center",
    justifyContent: "center",
  },
}));
