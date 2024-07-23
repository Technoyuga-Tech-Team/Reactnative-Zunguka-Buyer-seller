import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ui/CustomButton";
import ProfileAndName from "../../components/ui/Profile/ProfileAndName";
import LogoutPopup from "../../components/ui/popups/LogoutPopup";
import LogoutIcon from "../../components/ui/svg/LogoutIcon";
import {
  GOOGLE_WEB_CLIENT_ID,
  SCREEN_WIDTH,
  USER_DATA,
  secureStoreKeys,
} from "../../constant";
import { Route } from "../../constant/navigationConstants";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../store/authentication/authentication.thunks";
import { selectUserData } from "../../store/settings/settings.selectors";
import { ThemeProps } from "../../types/global.types";
import { HomeNavigationProps } from "../../types/navigation";
import Scale from "../../utils/Scale";
import { setData } from "../../utils/asyncStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileItem from "../../components/ui/Profile/ProfileItem";
import CreditcardIcon from "../../components/ui/svg/CreditcardIcon";
import MoneybillsIcon from "../../components/ui/svg/MoneybillsIcon";
import InfocircleIcon from "../../components/ui/svg/InfocircleIcon";
import DocslistIcon from "../../components/ui/svg/DocslistIcon";
import ProfileIcon from "../../components/ui/svg/ProfileIcon";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Profile: React.FC<HomeNavigationProps<Route.navProfile>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUserData);

  const [visible, setVisible] = useState(false);

  const [profilePicture, setProfilePicture] = useState<string>(
    userData?.profile_image
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      // scopes: ['https://www.googleapis.com/auth/user.phonenumbers.read'],
    });
  }, []);

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", async () => {
      setProfilePicture(userData?.profile_image);
    });

    return () => {
      unsubscribe();
    };
  }, [userData]);

  const togglePopup = () => {
    setVisible(!visible);
  };
  const onPressLogout = async () => {
    if (userData?.is_social == 1) {
      await GoogleSignin.signOut();
    }
    setVisible(false);
    // dispatch(logout());
    await setData(secureStoreKeys.JWT_TOKEN, null);
    await setData(USER_DATA, null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.navAuthentication }],
      })
    );
  };

  const onPressLogoutPopup = () => {
    setVisible(true);
  };
  const onPressMyProfile = () => {
    navigation.navigate(Route.navEditProfile);
  };
  const onPressCardDetails = () => {
    navigation.navigate(Route.navCardDetails, { from: "profile" });
  };
  const onPressTransactionHistroy = () => {};

  const Profile = profilePicture;
  return (
    <View style={style.container}>
      <StatusBar
        backgroundColor={theme.colors?.white}
        barStyle={"dark-content"}
      />
      <Text style={style.txtProfile}>Profile</Text>
      <View style={style.profileCont}>
        <ProfileAndName
          name={userData?.username}
          email={userData?.email}
          profileImage={Profile}
        />
      </View>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={style.scrollCont}
      >
        <ProfileItem
          name="My Profile"
          icon={<ProfileIcon color={theme.colors?.primary} />}
          onPress={onPressMyProfile}
        />
        <ProfileItem
          name="Card Details"
          icon={<CreditcardIcon color={theme.colors?.primary} />}
          onPress={onPressCardDetails}
        />
        <ProfileItem
          name="Transaction History"
          icon={<MoneybillsIcon color={theme.colors?.primary} />}
          onPress={onPressTransactionHistroy}
        />
        <ProfileItem
          name="About Us"
          icon={<InfocircleIcon color={theme.colors?.primary} />}
        />
        <ProfileItem
          name="Terms and Conditions"
          icon={<DocslistIcon color={theme.colors?.primary} />}
        />
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <CustomButton
          onPress={onPressLogoutPopup}
          title={"Logout"}
          buttonWidth="full"
          type="clear"
          icon={
            <LogoutIcon color={theme.colors?.red} style={{ marginRight: 5 }} />
          }
          containerStyle={style.btnLogout}
          buttonStyle={style.btnLogout1}
          titleStyle={style.txtTitleStyle}
        />
      </View>
      <LogoutPopup
        visiblePopup={visible}
        togglePopup={togglePopup}
        onPressLogout={onPressLogout}
      />
    </View>
  );
};

export default Profile;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets.top,
    paddingBottom: 100,
  },
  scrollCont: {
    flexGrow: 1,
  },
  profileCont: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  btnLogout: {
    backgroundColor: theme.colors?.white,
    width: "100%",
    height: Scale(56),
    borderRadius: Scale(56 / 2),
    borderColor: theme.colors?.red,
    borderWidth: 1,
  },
  btnLogout1: {
    width: "100%",
    height: Scale(56),
    borderRadius: Scale(56 / 2),
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitleStyle: {
    fontSize: theme.fontSize?.fs15,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.red,
  },
  bottomButton: {
    marginHorizontal: 20,
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
    width: SCREEN_WIDTH - 40,
  },
  txtProfile: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 20,
  },
}));
