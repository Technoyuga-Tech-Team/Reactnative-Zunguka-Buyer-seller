import React, { useEffect, useMemo, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../../types/global.types";
import Scale from "../../../utils/Scale";
import RatingBox from "../RatingBox";
import { CustomTxtInput } from "../CustomTextInput";
import CustomButton from "../CustomButton";
import RateItem from "../Items/RateItems";
import { Route } from "../../../constant/navigationConstants";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "../../../constant";
import InputFieldInfo from "../InputFieldInfo";

interface RatingItemPopupProps {
  visiblePopup: boolean;
  togglePopup: () => void;
  isLoading: boolean;
  onPressConfirmSendReview: (rate: number, comment: string) => void;
  popupLabel?: string;
  onPressMessage?: () => void;
  onPressUpdateReviewStatus?: () => void;
}

const RatingItemPopup: React.FC<RatingItemPopupProps> = ({
  visiblePopup,
  togglePopup,
  onPressConfirmSendReview,
  isLoading,
  popupLabel,
  onPressMessage,
  onPressUpdateReviewStatus,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({ insets });
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [currentRating, setCurrentRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [checkRatingForBuyerReview, setCheckRatingForBuyerReview] = useState(
    visiblePopup?.is_buyer
  );

  useEffect(() => {
    if (checkRatingForBuyerReview) {
      setCurrentRating(parseFloat(visiblePopup?.buyer_rating?.rate) || 0);
      setComment(visiblePopup?.buyer_rating?.rated_message || "");
    } else {
      setCurrentRating(parseFloat(visiblePopup?.seller_rating?.rate) || 0);
      setComment(visiblePopup?.seller_rating?.rated_message || "");
    }
  }, []);

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
  };

  const onChangeComment = (val: string) => {
    setComment(val);
  };

  const isModalVisible = visiblePopup ? true : false;
  const checkReviewRatingIsDisabled = visiblePopup?.is_buyer
    ? visiblePopup?.buyer_rating
      ? true
      : false
    : visiblePopup?.seller_rating
    ? true
    : false;

  console.log(
    "checkReviewRatingIsDisabled =======",
    checkReviewRatingIsDisabled
  );

  const checkForPopupLabel = useMemo(() => {
    let popupMainLabel;

    if (visiblePopup?.buyer_rating || visiblePopup?.seller_rating) {
      return (popupMainLabel = "View Rating");
    }

    if (!visiblePopup?.buyer_rating && !visiblePopup?.seller_rating) {
      if (visiblePopup?.is_buyer) {
        return (popupMainLabel = "Rate seller item");
      } else {
        return (popupMainLabel = "Rate buyer item");
      }
    }
  }, [visiblePopup]);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={togglePopup}
      style={style.modalCont}
      transparent={true}
      animationType="slide"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePopup}
        style={style.container}
      ></TouchableOpacity>
      <View style={style.container1}>
        <TouchableOpacity onPress={togglePopup} activeOpacity={1} />
        <KeyboardAwareScrollView contentContainerStyle={style.innerCont}>
          <Text style={style.txtTitle}>{checkForPopupLabel}</Text>
          <RateItem item={visiblePopup} onPressMessage={onPressMessage} />
          <RatingBox
            disabled={checkReviewRatingIsDisabled}
            rating={currentRating}
            onRatingChange={handleRatingChange}
          />
          <View style={{ flex: 1 }}>
            <CustomTxtInput
              placeholder="Write your comment"
              returnKeyType="done"
              returnKeyLabel="done"
              keyboardType={"default"}
              textInputStyle={style.txtDesc}
              style={style.textInput}
              multiline={true}
              textAlignVertical="top"
              onChangeText={onChangeComment}
              editable={!checkReviewRatingIsDisabled}
              value={comment}
            />
          </View>
          {visiblePopup?.is_buyer && (
            <InputFieldInfo
              text={`Feel free to put your honest review. The seller will not be able to view your review.\nSeller will get notified, you received the review for abc Item.\nJust a notification, not able to view the Review.`}
            />
          )}

          <View style={{ marginVertical: 10, paddingBottom: insets.bottom }}>
            {visiblePopup?.buyer_rating &&
            visiblePopup?.seller_rating ? null : !!visiblePopup?.is_buyer ? (
              <View style={{ marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    !visiblePopup?.buyer_rating &&
                      onPressConfirmSendReview(currentRating, comment);
                  }}
                  title={
                    !visiblePopup?.buyer_rating
                      ? "Rate Seller Now"
                      : !visiblePopup?.seller_rating
                      ? "Seller not rate yet"
                      : "View Rate"
                  }
                  buttonWidth="full"
                  variant="primary"
                  type="solid"
                />
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    visiblePopup?.buyer_rating &&
                      !visiblePopup?.seller_rating &&
                      onPressConfirmSendReview(currentRating, comment);
                  }}
                  title={
                    !visiblePopup?.buyer_rating
                      ? "Buyer not ret yet"
                      : visiblePopup?.seller_rating
                      ? "View Rating"
                      : "Rate Buyer Now"
                  }
                  buttonWidth="full"
                  variant="primary"
                  type="solid"
                />
              </View>
            )}
            {/* {!!item?.is_buyer ? (
              <CustomButton
                onPress={() =>
                  !visiblePopup?.buyer_rating &&
                  onPressConfirmSendReview(currentRating, comment)
                }
                title={
                  !visiblePopup?.buyer_rating
                    ? "Rate Seller Now"
                    : !visiblePopup?.seller_rating
                    ? "Seller not rate yet"
                    : "View Rate"
                }
                buttonWidth="full"
                variant="primary"
                type="solid"
                disabled={comment == "" || currentRating <= 0 || isLoading}
                loading={isLoading}
              />
            ) : (
              <CustomButton
                onPress={() =>
                  !visiblePopup?.rated_by_buyer &&
                  onPressConfirmSendReview(currentRating, comment)
                }
                title={
                  !visiblePopup?.buyer_rating
                    ? "Rate Seller Now"
                    : !visiblePopup?.seller_rating
                    ? "Seller not rate yet"
                    : "View Rate"
                }
                buttonWidth="full"
                variant="primary"
                type="solid"
                disabled={comment == "" || currentRating <= 0 || isLoading}
                loading={isLoading}
              />
            )} */}
          </View>

          {/* {!visiblePopup?.is_buyer &&
            visiblePopup?.rated_approved_by_seller != null && (
              <View
                style={{ marginVertical: 10, paddingBottom: insets.bottom }}
              >
                <CustomButton
                  title={
                    visiblePopup?.rated_approved_by_seller == 1
                      ? "Verified"
                      : "Rejected"
                  }
                  buttonWidth="full"
                  variant="primary"
                  backgroundColor={
                    visiblePopup?.rated_approved_by_seller == 1
                      ? theme.colors?.success
                      : theme.colors.error
                  }
                  type="solid"
                />
              </View>
            )} */}
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default RatingItemPopup;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors?.overlay,
    paddingTop: props.insets.top + 20,
  },
  container1: {
    // flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 11,
  },
  innerCont: {
    flexGrow: 1,
    backgroundColor: theme.colors?.white,
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  modalCont: {
    backgroundColor: "transparent",
  },
  txtTitle: {
    fontSize: theme?.fontSize?.fs17,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    textAlign: "center",
  },
  txtTitle1: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 10,
  },
  txtDesc: {
    height: Scale(123),
    backgroundColor: theme?.colors?.borderButtonColor,
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  textInput: {
    height: Scale(110),
    width: "100%",
    color: theme.colors?.textPrimary,
    fontFamily: theme.fontFamily?.regular,
    fontSize: theme.fontSize?.fs13,
    letterSpacing: -0.08,
  },
}));
