import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
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

const TakeSelfie: React.FC<AuthNavigationProps<Route.navTakeSelfie>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const cameraRef = useRef<RNCamera>(null);
  const [capturing, setCapturing] = useState(false);

  const takePictureAsync = async () => {
    if (cameraRef.current && !capturing) {
      setCapturing(true);
      const options = { quality: 0.8 };
      const data = await cameraRef.current.takePictureAsync(options);
      if (data) {
        console.log("data", data);
        notifyMessage("Captured!");
      }
      setCapturing(false);
      // handle photo data
    }
  };
  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
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
    </>
  );
};

export default TakeSelfie;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background,
    // paddingTop: props.insets?.top,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
    alignItems: "center",
  },
  btnCapture: {
    height: Scale(80),
    width: Scale(80),
  },
}));
