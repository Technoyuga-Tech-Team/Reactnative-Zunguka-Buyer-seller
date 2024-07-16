import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import { imagePickerProps } from "../../types/common.types";
import { AppImage } from "../AppImage/AppImage";
import { HIT_SLOP, SCREEN_WIDTH } from "../../constant";
import Scale from "../../utils/Scale";
import CloseIcon from "./svg/CloseIcon";
import PhotoPlusIcon from "./svg/PhotoPlusIcon";
import ImagePickerPopup from "./ImagePickerPopup";
import {
  getImageFromCamera,
  getImageFromGallary,
  requestCameraPermission,
} from "../../utils/ImagePickerCameraGallary";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setErrors } from "../../store/global/global.slice";

interface PickSellProductProps {
  images: imagePickerProps[];
  setImages: (val: imagePickerProps[]) => void;
}

const PickSellProduct: React.FC<PickSellProductProps> = ({
  images,
  setImages,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [selectedImageForDelete, setSelectedImageForDelete] =
    useState<string>("");

  useEffect(() => {
    if (selectedImageForDelete !== "") {
      const filterArr = images.filter((ele) => {
        return ele.name !== selectedImageForDelete;
      });
      setImages(filterArr);
      setSelectedImageForDelete("");
    }
  }, [selectedImageForDelete]);

  const onPressCloseIcon = (item: imagePickerProps) => {
    setSelectedImageForDelete(item.name);
  };
  const onPressFromCamera = async () => {
    togglePopup();
    setTimeout(async () => {
      if (Platform.OS === "android") {
        const hasPermission = await requestCameraPermission();
        if (hasPermission) {
          openPickerCameraImage();
        }
      } else {
        openPickerCameraImage();
      }
    }, 100);
  };

  const openPickerCameraImage = async () => {
    try {
      const imageObject = await getImageFromCamera();
      setImages([...images, imageObject]);
    } catch (error) {
      // Handle errors here if needed (e.g., display a user-friendly message)
      console.error("Error using getImageFromCamera:", error);
    }
  };

  const onPressFromGallary = async () => {
    togglePopup();
    setTimeout(async () => {
      try {
        const imageObject = await getImageFromGallary({ multiple: true });
        setImages([...images, ...imageObject]);
      } catch (error) {
        // Handle errors here if needed (e.g., display a user-friendly message)
        console.error("Error using getImageFromGallary:", error);
      }
    }, 100);
  };

  const togglePopup = () => {
    setVisible(!visible);
  };

  const onPressAddImage = () => {
    if (images.length >= 6) {
      dispatch(
        setErrors({
          message: "You can add Maximum 6 photos.",
          status: 0,
          statusCode: null,
        })
      );
    } else {
      setVisible(true);
    }
  };

  console.log("images", images);

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={onPressAddImage}
        activeOpacity={0.8}
        style={style.emptyPhotoCont}
      >
        <PhotoPlusIcon />
      </TouchableOpacity>

      <FlatList
        data={images}
        horizontal={false}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          flex: 1,
        }}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={style.itemCont}>
              <AppImage
                source={item.uri}
                style={style.imgCont}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => onPressCloseIcon(item)}
                hitSlop={HIT_SLOP}
                activeOpacity={0.6}
                style={style.closeCont}
              >
                <CloseIcon color={theme.colors?.black} height={14} width={14} />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <ImagePickerPopup
        visiblePopup={visible}
        togglePopup={togglePopup}
        onPressFromCamera={onPressFromCamera}
        onPressFromGallary={onPressFromGallary}
      />
    </View>
  );
};

export default PickSellProduct;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  horizontalCont: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  imgCont: {
    height: Scale(112),
    width: Scale((SCREEN_WIDTH - 60) / 3),
    borderRadius: Scale(8),
  },
  closeCont: {
    height: Scale(20),
    width: Scale(20),
    borderRadius: Scale(10),
    backgroundColor: theme.colors?.white,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 8,
    right: 8,
  },
  emptyPhotoCont: {
    height: Scale(112),
    width: Scale((SCREEN_WIDTH - 60) / 3),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme?.colors?.primary,
    borderStyle: "dashed",
    marginRight: 10,
    marginTop: 10,
  },
  itemCont: {
    height: Scale(112),
    width: Scale((SCREEN_WIDTH - 60) / 3),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
}));
