import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../assets/images";
import { HIT_SLOP, PRDUCT_EMPTY_CELLS, SCREEN_WIDTH } from "../../constant";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setErrors } from "../../store/global/global.slice";
import { imagePickerProps } from "../../types/common.types";
import { ThemeProps } from "../../types/global.types";
import {
  getImageFromCamera,
  getImageFromGallary,
  requestCameraPermission,
} from "../../utils/ImagePickerCameraGallary";
import Scale from "../../utils/Scale";
import { AppImage } from "../AppImage/AppImage";
import ImagePickerPopup from "./ImagePickerPopup";
import CloseIcon from "./svg/CloseIcon";

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
      const imageObject = await getImageFromCamera({});
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

  return (
    <View style={style.container}>
      <View style={style.innerCont}>
        {PRDUCT_EMPTY_CELLS.map((ele, index) => {
          const source =
            images?.length > index
              ? images[index]?.uri
              : Images.EMPTY_PRODUCT_IMAGE;
          const isHaveImage = images?.length > index ? true : false;
          return (
            <View style={[style.itemCont]}>
              {isHaveImage ? (
                <AppImage
                  source={source}
                  style={style.imgCont}
                  resizeMode={isHaveImage ? "cover" : "contain"}
                  zoomViewDisable={false}
                />
              ) : (
                <TouchableOpacity activeOpacity={0.8} onPress={onPressAddImage}>
                  <AppImage
                    source={source}
                    style={style.imgCont}
                    resizeMode={isHaveImage ? "cover" : "contain"}
                  />
                </TouchableOpacity>
              )}

              {isHaveImage && (
                <TouchableOpacity
                  onPress={() => onPressCloseIcon(images[index])}
                  hitSlop={HIT_SLOP}
                  activeOpacity={0.6}
                  style={style.closeCont}
                >
                  <CloseIcon
                    color={theme.colors?.black}
                    height={14}
                    width={14}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

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
    // marginRight: 10,
    marginTop: 20,
  },
  itemCont: {
    height: Scale(112),
    width: Scale((SCREEN_WIDTH - 60) / 3),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // marginRight: 10,
  },
  innerCont: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
