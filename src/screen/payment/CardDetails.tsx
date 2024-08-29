import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CardList from "../../components/Payment/CardList";
import CustomButton from "../../components/ui/CustomButton";
import CustomHeader from "../../components/ui/CustomHeader";
import NoDataFound from "../../components/ui/NoDataFound";
import AddRoundedIcon from "../../components/ui/svg/AddRoundedIcon";
import PayDepositeIcon from "../../components/ui/svg/PayDepositeIcon";
import { BASE_URL, HAS_NOTCH, secureStoreKeys } from "../../constant";
import { API } from "../../constant/apiEndpoints";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectPaymentCardLoading } from "../../store/PaymentCard/paymentCard.selectors";
import { LoadingState, ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import { GetPaymentCardData } from "../../types/payment.types";
import { getData } from "../../utils/asyncStorage";

const CardDetails: React.FC<HomeNavigationProps<Route.navCardDetails>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const loading = useSelector(selectPaymentCardLoading);

  const fromProfile = route?.params?.from === "profile";

  const [cardData, setCardData] = useState<GetPaymentCardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // getSavedCards(10, 1, true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getSavedCards = async (
    limit: number,
    page: number,
    refresh: boolean
  ) => {
    const token = await getData(secureStoreKeys.JWT_TOKEN);
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}${API.LIST_CARD}/${limit}/${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("data", data);
      // Handle the fetched data here
      if (data && data?.data?.data?.length > 0) {
        setLoader(false);
        refresh
          ? setCardData([...data?.data?.data])
          : setCardData([...cardData, ...data?.data?.data]);

        setTotalPage(data?.data?.totalPages);
        setPage(page + 1);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  const onPressAddNewCard = () => {
    navigation.navigate(Route.navAddCard);
  };

  const onPressDelete = async (id: string) => {
    // if (cardData?.length > 0) {
    //   let filterdata = cardData.filter((ele) => ele.id !== id);
    //   setCardData(filterdata);
    //   const result = await dispatch(deletePaymentCard({ card_id: id }));
    //   if (deletePaymentCard.fulfilled.match(result)) {
    //     if (result.payload?.status === 1) {
    //       refetch().then();
    //     }
    //   } else {
    //     console.log("errror deleteProduct --->", result.payload);
    //   }
    // }
  };

  const onPressCard = (id: string) => {
    if (selectedCard === id) {
      setSelectedCard("");
    } else {
      setSelectedCard(id);
    }
  };

  const makePayment = async () => {
    // if (mover_payment) {
    //   makePaymentForMover();
    // } else {
    //   makePaymentForProduct();
    // }
  };

  const makePaymentForProduct = async () => {
    // try {
    //   const result = await dispatch(
    //     MakePayment({
    //       mode_of_payment: "card",
    //       item_id: `${Item.product_id}`,
    //       card_id: selectedCard,
    //     })
    //   );
    //   if (MakePayment.fulfilled.match(result)) {
    //     if (result.payload?.status === 1) {
    //       dispatch(setSuccess(result.payload?.message));
    //       navigation.dispatch(
    //         CommonActions.reset({
    //           index: 0,
    //           routes: [{ name: Route.navModeOfDelivery }],
    //         })
    //       );
    //       dispatch(setSaveOrderId(result.payload?.data.id));
    //     }
    //   } else {
    //     console.log("errror MakePayment --->", result.payload);
    //   }
    // } catch (error) {
    //   console.log("errror MakePayment --->", error);
    // }
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Card Details" />
      <View style={{ flex: 1 }}>
        {cardData?.length > 0 ? (
          <CardList
            cardData={cardData}
            onPressDelete={(id) => onPressDelete(id)}
            onPressCard={(id) => onPressCard(id)}
            selectedCard={selectedCard}
            fromProfile={fromProfile}
          />
        ) : (
          <>
            <NoDataFound title={"No cards found!"} isLoading={loader} />
          </>
        )}
      </View>
      <View style={style.bottomCont}>
        <CustomButton
          disabled={loading === LoadingState.CREATE}
          loading={loading === LoadingState.CREATE}
          onPress={selectedCard ? makePayment : onPressAddNewCard}
          icon={
            selectedCard ? (
              <PayDepositeIcon
                color={theme.colors?.white}
                style={{ marginRight: 5 }}
              />
            ) : (
              <AddRoundedIcon
                color={theme.colors?.white}
                style={{ marginRight: 5 }}
              />
            )
          }
          title={selectedCard ? "Make payment" : "Add New Card"}
          buttonWidth="full"
          variant="primary"
          type="solid"
        />
      </View>
    </View>
  );
};

export default CardDetails;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: props.insets.top,
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  backBtnCont: {
    marginVertical: 30,
  },
  txtVerificationSentCode: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.secondaryText,
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingTop: props.insets.top,
    // paddingHorizontal: 20,
    backgroundColor: theme.colors?.background,
  },
  bottomCont: {
    paddingBottom:
      Platform.OS === "ios"
        ? HAS_NOTCH
          ? props.insets.bottom
          : props.insets.bottom + 10
        : props.insets.bottom + 10,
  },
  txtDidntReceiveCode: {
    color: theme.colors?.secondaryText,
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    alignSelf: "center",
    marginBottom: 20,
  },
  txtResendCode: {
    color: theme.colors?.black,
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    textDecorationLine: "underline",
  },
  error: {
    marginTop: 5,
    fontSize: theme.fontSize?.fs12,
    color: theme.colors?.error,
  },
  iconCont: { alignSelf: "center", marginVertical: 30 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noDataCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtNoData: {
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
  },
}));
