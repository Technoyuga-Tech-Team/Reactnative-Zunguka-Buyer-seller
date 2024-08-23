import React from "react";
import { StatusBar, Text, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../../types/global.types";

const InternetConnectivityLabel = ({
  isConnected,
}: {
  isConnected: boolean | null;
}) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  if (isConnected) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"red"} barStyle={"dark-content"} />
        <View style={styles.topContainer}>
          <Text style={styles.label}>Internet connection lost</Text>
        </View>
      </View>
    );
  }
};

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.blackTrans,
    position: "absolute",
    top: props.insets.top,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1111,
  },
  topContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  visible: {
    flex: 1,
  },
  hidden: {
    flex: 1,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
}));

export default InternetConnectivityLabel;
