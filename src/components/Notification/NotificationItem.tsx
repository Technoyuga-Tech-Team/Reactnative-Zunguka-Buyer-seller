import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import { GetNotificationDataList } from "../../types/notification.types";
import { Images } from "../../assets/images";

interface NotificationItemProps {
  item: GetNotificationDataList;
  onPressItem: () => void;
}
const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  onPressItem,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const time = moment(item?.created_at).fromNow();
  const profile = item.user.profile_image || Images.PLACEHOLDER_IMAGE;
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={style.container}>
        <View style={style.imgCont}>
          <AppImage source={profile} style={style.profile} resizeMode="cover" />
        </View>
        <View style={style.txtCont}>
          <Text style={style.txtTitle}>{item.message}</Text>
          <Text style={style.txtTime}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const useStyles = makeStyles((theme) => ({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imgCont: {
    alignItems: "flex-start",
    marginRight: 10,
    minHeight: Scale(65),
  },
  txtCont: {
    paddingBottom: 10,
    borderBottomColor: theme.colors?.borderButtonColor,
    borderBottomWidth: 1,
    flex: 1,
  },
  profile: {
    height: Scale(48),
    width: Scale(48),
    borderRadius: Scale(48 / 2),
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
  },
  txtTime: {
    fontSize: theme.fontSize?.fs12,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.black,
    marginTop: 10,
  },
}));
