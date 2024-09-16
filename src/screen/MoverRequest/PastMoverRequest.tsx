import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { HomeNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectPackageStatusLoading } from "../../store/PackageStatus/packageStatus.selectors";
import { selectMoverBookingLoading } from "../../store/MoverBooking/moverBooking.selectors";
import { getUserData, UserData } from "../../types/user.types";
import { moverPackageStatusDetails } from "../../store/PackageStatus/packageStatus.thunk";
import { API } from "../../constant/apiEndpoints";
import { fetch } from "../../store/fetch";
import { setMoverInfo } from "../../store/settings/settings.slice";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { addRating } from "../../store/MoverBooking/moverBooking.thunk";
import { setSuccess } from "../../store/global/global.slice";
import CustomHeader from "../../components/ui/CustomHeader";
import PackageList from "../../components/packages/PackageList";
import RatingPopup from "../../components/ui/popups/RatingPopup";

const PastMoverRequest: React.FC<
  HomeNavigationProps<Route.navPastMoverRequest>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const loading = useSelector(selectPackageStatusLoading);
  const isLoading = useSelector(selectMoverBookingLoading);

  const [compeltedData, setCompeltedData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [moverData, setMoverData] = useState<UserData>({});
  const [mover_id, setMover_id] = useState("");
  const [packageDetailsId, setPackageDetailsId] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [visibleRatePopup, setVisibleRatePopup] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", async () => {
      setCompeltedData([]);
      getCompletedData(10, 1);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getCompletedData = async (limit: number, offset: number) => {
    const result = await dispatch(
      moverPackageStatusDetails({
        status: "endjob",
        limit,
        offset,
      })
    );
    if (moverPackageStatusDetails.fulfilled.match(result)) {
      if (result.payload.status == 1) {
        let data =
          offset == 1
            ? result.payload.data.data
            : [...compeltedData, ...result.payload.data.data];
        setCompeltedData(data);
        setTotalPage(result.payload.data.totalPages);
        setPage(result.payload.data.currentPage + 1);
      }
    } else {
      console.log("errror job history --->", result.payload);
    }
  };

  const onPressItem = () => {
    // navigation.navigate(Route.navVisitProfile, { item });
  };
  const onPressRating = async (item: any) => {
    // navigation.navigate(Route.navVisitProfile, { item });
    setMoverData(item.mover);
    setMover_id(item.mover_id);
    setPackageDetailsId(item.id);
    setUserLoading(true);
    setVisibleRatePopup(true);

    const { data: moverData } = await fetch<getUserData>({
      url: `${API.ME}/${item.mover_id}`,
      method: "GET",
    });

    if (moverData && moverData.status == 1) {
      dispatch(setMoverInfo(moverData?.user));
      setUserLoading(false);
    } else {
      setUserLoading(false);
    }
  };

  const onEndReached = () => {
    if (page <= totalPage && loading !== LoadingState.CREATE) {
      getCompletedData(10, page);
    }
  };

  const togglePopup = () => {
    setVisibleRatePopup(!visibleRatePopup);
  };
  const onPressConfirmSendReview = async (rate: number, comment: string) => {
    const result = await dispatch(
      addRating({
        mover_id: mover_id,
        rate: rate,
        comment: comment,
        package_details_id: packageDetailsId,
      })
    );
    if (addRating.fulfilled.match(result)) {
      if (result.payload.status == 1) {
        dispatch(setSuccess(result.payload.message));
        setCompeltedData([]);
        setTotalPage(0);
        setPage(0);
        getCompletedData(10, 1);
        togglePopup();
      }
    } else {
      console.log("errror addRating --->", result.payload);
    }
  };

  const onRefresh = () => {
    setCompeltedData([]);
    setTotalPage(0);
    setPage(0);
    getCompletedData(10, 1);
  };

  console.log("compeltedData", JSON.stringify(compeltedData));

  return (
    <View style={style.scrollCont}>
      <PackageList
        isCompleted={true}
        onPress={onPressItem}
        onPressRating={onPressRating}
        isLoading={loading && loading === LoadingState.CREATE}
        data={compeltedData}
        onEndReached={onEndReached}
        fromJobHistory={true}
        refreshControl={
          <RefreshControl
            refreshing={loading == LoadingState.CREATE}
            onRefresh={onRefresh}
          />
        }
      />
      <RatingPopup
        visiblePopup={visibleRatePopup}
        togglePopup={togglePopup}
        isLoading={
          userLoading || (isLoading && isLoading === LoadingState.CREATE)
        }
        moverData={moverData}
        onPressConfirmSendReview={onPressConfirmSendReview}
      />
    </View>
  );
};

export default PastMoverRequest;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollCont: {
    flex: 1,
    // backgroundColor: theme.colors?.background,
  },
}));
