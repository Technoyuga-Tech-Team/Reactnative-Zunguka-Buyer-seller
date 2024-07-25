import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { AuthNavigationProps } from "../../types/navigation";
import { Route } from "../../constant/navigationConstants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { RNCamera } from "react-native-camera";
import { Images } from "../../assets/images";
import { SCREEN_WIDTH, SCREEN_HEIGHT, HIT_SLOP2 } from "../../constant";
import { AppImage } from "../../components/AppImage/AppImage";
import Scale from "../../utils/Scale";
import { notifyMessage } from "../../utils/notifyMessage";
import CustomHeader from "../../components/ui/CustomHeader";
import ProfileImage from "../../components/ui/Profile/ProfileImage";
import {
  getImageFromCamera,
  requestCameraPermission,
} from "../../utils/ImagePickerCameraGallary";
import { imagePickerProps } from "../../types/common.types";
import CustomButton from "../../components/ui/CustomButton";
import { getRandomFileName, getUrlExtension } from "../../utils";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setErrors } from "../../store/global/global.slice";

const TakeSelfie: React.FC<AuthNavigationProps<Route.navTakeSelfie>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const cameraRef = useRef<RNCamera>(null);
  const [capturing, setCapturing] = useState(false);

  const [showCamera, setShowCamera] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [profileImage, setProfileImage] = useState<imagePickerProps>({
    name: "",
    type: "",
    uri: "",
  });

  const takePictureAsync = async () => {
    if (cameraRef.current && !capturing) {
      setCapturing(true);
      const options = { quality: 0.8 };
      const data = await cameraRef.current.takePictureAsync(options);
      if (data) {
        console.log("data", data);
        setProfilePicture(data.uri);

        const imageObject = {
          name: `${getRandomFileName()}.${getUrlExtension(data.uri)}`,
          type: "image/jpg",
          uri: data.uri,
        };

        setProfileImage(imageObject);
        notifyMessage("Captured!");
        setShowCamera(false);
      }
      setCapturing(false);
      // handle photo data
    }
  };

  const onPressCamera = () => {
    setShowCamera(true);
  };

  return (
    <View style={style.container}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <CustomHeader title="Take Selfie" />
      {showCamera ? (
        <View style={style.cameraCont}>
          <RNCamera
            ref={cameraRef}
            style={style.camera}
            type={RNCamera.Constants.Type.front}
          />
          <ImageBackground
            style={{
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
              position: "absolute",
              // bottom: 0,
            }}
            source={Images.SELFIE_BG_IMAGE}
          />

          <View style={style.buttonContainer}>
            <Text style={style.txtFace}>Keep your face within the oval</Text>
            <TouchableOpacity
              hitSlop={HIT_SLOP2}
              onPress={takePictureAsync}
              disabled={capturing}
              activeOpacity={0.8}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppImage
                source={Images.CAPTURE_BTN_IMAGE}
                style={style.btnCapture}
              />
              {capturing && (
                <ActivityIndicator
                  color={theme?.colors?.black}
                  style={{ position: "absolute", alignSelf: "center" }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, paddingBottom: insets.bottom + 10 }}>
          <View style={{ marginTop: 50, flex: 1 }}>
            <ProfileImage
              profileImage={profilePicture}
              onPressCamera={onPressCamera}
              imageStyle={style.profileImage}
            />
            <Text style={style.txtFace}>
              kindly click picture of your face for verify kyc
            </Text>
          </View>
          <CustomButton
            onPress={() => {
              if (profilePicture !== "") {
              } else {
                dispatch(
                  setErrors({
                    message: "Please take the selfie",
                    status: 0,
                    statusCode: null,
                  })
                );
              }
            }}
            title={"Continue"}
            buttonWidth="full"
            variant="primary"
            type="solid"
            // disabled={!isValid || loading === LoadingState.CREATE}
            // loading={loading === LoadingState.CREATE}
          />
        </View>
      )}
    </View>
  );
};

export default TakeSelfie;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    paddingTop: props.insets?.top,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: props.insets.bottom + 10,
    alignSelf: "center",
    alignItems: "center",
  },
  btnCapture: {
    height: Scale(80),
    width: Scale(80),
  },
  cameraCont: {
    flex: 1,
  },
  txtFace: {
    fontSize: theme.fontSize?.fs14,
    fontFamily: theme.fontFamily?.medium,
    color: theme.colors?.black,
    marginVertical: 10,
    textAlign: "center",
  },
  profileImage: {
    height: Scale(180),
    width: Scale(180),
    borderRadius: Scale(180 / 2),
  },
}));
