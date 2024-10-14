import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, StatusBar, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import PickupsListing from "../../components/PickupsListing";
import CustomHeader from "../../components/ui/CustomHeader";
import NoDataFound from "../../components/ui/NoDataFound";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectMoverBookingLoading } from "../../store/MoverBooking/moverBooking.selectors";
import { moverRequestedDetails } from "../../store/MoverBooking/moverBooking.thunk";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import Scale from "../../utils/Scale";
import { socket, socketEvent } from "../../utils/socket";

const OngoingMoverRequest: React.FC<
  HomeNavigationProps<Route.navOngoingMoverRequest>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const loading = useSelector(selectMoverBookingLoading);

  const [requestData, setRequestData] = useState<any[]>([]);
  console.log("requestData", requestData);
  useEffect(() => {
    socket.on(socketEvent.COMPLETED_TASK, (task) => {
      console.log("task - - - - - -- - - ", task);
      if (task.item_id) {
        let data = [...requestData];
        console.log("requestData", requestData);
        data?.length > 0 &&
          data.map((ele) => {
            if (ele.id == task.item_id) {
              return (ele.status = "completed");
            }
          });
        console.log("data - - - - - - ", data);
        setRequestData(data);
      }
    });
  }, [requestData]);

  useEffect(() => {
    getMoverRequestedData();

    let unsubscribe = navigation.addListener("focus", async () => {
      getMoverRequestedData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getMoverRequestedData = async () => {
    const result = await dispatch(
      moverRequestedDetails({
        status: "all",
      })
    );
    if (moverRequestedDetails.fulfilled.match(result)) {
      if (result.payload.status == 1) {
        setRequestData(result.payload.data);
      }
    } else {
      if (result.payload?.status == 0) {
        setRequestData([]);
      }
      console.log("errror moverRequestedDetails --->", result.payload);
    }
  };

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: Route.navDashboard,
              state: {
                routes: [{ name: Route.navProfile }],
              },
            },
          ],
        })
      );
    }
  };

  const onPressItem = (item: any) => {
    // if (item.status === "completed") {
    navigation.navigate(Route.navDeliveryDetails1, {
      package_details_id: item.id,
      from: "buyer-seller",
    });
  };

  const onRefresh = () => {
    getMoverRequestedData();
  };

  const onPressChat = (item: any) => {
    navigation.navigate(Route.navChatroom, {
      receiver_id: `${item?.userid}`,
      product_id: `${item?.product_id}`,
    });
  };

  return (
    <>
      <View style={style.container}>
        {/* {loading && loading === LoadingState.CREATE && <Loading />} */}
        <StatusBar
          backgroundColor={theme.colors?.primary}
          barStyle={"light-content"}
        />
        {/* <CustomHeader
          title="Mover Request Page"
          isOutsideBack={true}
          onPressBackBtn={onPressBack}
          backgroundColor={theme.colors?.primary}
          textColor={theme.colors?.white}
        /> */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={loading === LoadingState.CREATE}
              onRefresh={onRefresh}
              tintColor={theme?.colors?.primary}
            />
          }
        >
          {requestData?.length > 0 && loading !== LoadingState.CREATE ? (
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <PickupsListing
                data={requestData}
                onPress={onPressItem}
                fromRequestPage={true}
                onPressChat={onPressChat}
              />
            </View>
          ) : (
            <NoDataFound
              title="No request found!"
              isLoading={loading === LoadingState.CREATE}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default OngoingMoverRequest;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    // backgroundColor: theme.colors?.background,
  },
  scrollcont: { paddingHorizontal: 20, flexGrow: 1 },
  headerCont: {
    backgroundColor: theme.colors?.primary,
    height: Scale(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
}));
