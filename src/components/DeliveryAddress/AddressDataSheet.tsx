import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { makeStyles, useTheme } from "react-native-elements";
import { ThemeProps } from "../../types/global.types";
import CloseIcon from "../ui/svg/CloseIcon";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { setAdjustPan, setAdjustResize } from "rn-android-keyboard-adjust";

export interface CustomBottomSheetProps extends BottomSheetProps {
  title: string;
  handleClosePress: () => void;
}

export const AddressDataSheet = React.forwardRef<
  BottomSheet,
  CustomBottomSheetProps
>(({ ...props }, ref) => {
  const style = useStyles();
  const { theme } = useTheme();

  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => <BottomSheetBackdrop {...props} />,
    []
  );

  useEffect(() => {
    setAdjustResize();
    return () => {
      setAdjustPan();
    };
  }, []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: theme?.colors?.transparent }}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustPan"
      {...props}
    >
      <View style={style.headerBs}>
        <Text style={style.txtHeaderTitle}>{props.title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={props.handleClosePress}>
          <CloseIcon color={theme?.colors?.black} height={18} width={18} />
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={style.contentContainer}
      >
        <>{props.children}</>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default AddressDataSheet;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: theme?.colors?.white,
  },
  headerBs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  txtHeaderTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.bold,
    color: theme.colors?.black,
  },
}));
