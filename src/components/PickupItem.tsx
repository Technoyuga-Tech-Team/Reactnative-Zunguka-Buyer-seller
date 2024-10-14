import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FullTheme, makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../types/global.types";
import Scale from "../utils/Scale";
import PickupDeliveryCont from "./PickupDeliveryCont";
import { HIT_SLOP2, RWF } from "../constant";
import ChatFillIcon from "./ui/svg/ChatFillIcon";

interface PickupItemProps {
  item: any;
  onPress: () => void;
  fromRequestPage?: boolean;
  isfromMover?: boolean;
  onPressShowDetails: () => void;
  onPressChat?: () => void;
}

const getStatusStrings = (status: string) => {
  console.log("status", status);
  return status === "pending"
    ? "Request Pending"
    : status === "startjob"
    ? "Ongoing Job"
    : status === "completed"
    ? "Delivery location"
    : status === "confirmed"
    ? "yet to start job"
    : "";
};

const PickupItem: React.FC<PickupItemProps> = ({
  item,
  onPress,
  fromRequestPage,
  isfromMover,
  onPressShowDetails,
  onPressChat,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const navigation = useNavigation();

  const time = moment(item?.createdAt).fromNow();

  const getColors = (status: string, theme: Partial<FullTheme>) => {
    return status === "confirmed"
      ? theme.colors?.primary
      : status === "startjob"
      ? theme.colors?.green
      : status === "completed"
      ? theme.colors?.secondaryText
      : theme.colors?.pinkDark;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        style.container,
        { borderColor: getColors(item.status, theme), borderWidth: 1 },
      ]}
    >
      <View
        style={[
          style.topCont,
          { backgroundColor: getColors(item.status, theme) },
        ]}
      >
        <Text style={style.txtDate}>{time}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item?.username && (
            <Text style={style.txtUsername}>{item?.username} - </Text>
          )}
          <Text style={style.txtDate}>
            {RWF} {Number(item?.price).toFixed(2)}
          </Text>
        </View>
      </View>
      <PickupDeliveryCont
        pickupAddress={item.pickup_point_address}
        deliveryAddress={item.delivery_point_address}
      />
      <View style={style.bottomCont}>
        {isfromMover ? (
          <TouchableOpacity onPress={onPressShowDetails} activeOpacity={0.8}>
            <Text
              style={[
                style.txtProductType,
                {
                  color: theme?.colors?.black,
                  fontSize: theme?.fontSize?.fs14,
                  fontFamily: theme?.fontFamily?.bold,
                },
              ]}
            >
              {"View Order Details"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={onPressChat}
              hitSlop={HIT_SLOP2}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <ChatFillIcon
                color={theme.colors?.greyedColor}
                height={22}
                width={22}
              />
              <Text style={style.txtProductType}>- {item.item_name}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              style.txtProductType,
              {
                color: getColors(item.status, theme),
              },
            ]}
          >
            {getStatusStrings(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PickupItem;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: theme.colors?.white,
    overflow: "hidden",
  },
  topCont: {
    height: Scale(35),
    borderTopLeftRadius: Scale(8),
    borderTopRightRadius: Scale(8),
    backgroundColor: theme.colors?.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  txtDate: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.white,
  },
  txtUsername: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.white,
  },
  txtProductType: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.greyedColor,
  },
  bottomCont: {
    height: Scale(35),
    borderBottomLeftRadius: Scale(8),
    borderBottomRightRadius: Scale(8),
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: theme.colors?.borderButtonColor,
    borderTopWidth: 1,
  },
  shadow: {
    shadowColor: theme.colors?.blackTrans,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // height: Scale(140),
  },
}));
