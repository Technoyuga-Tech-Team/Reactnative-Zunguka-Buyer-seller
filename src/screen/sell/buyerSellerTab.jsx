import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-elements";

const buyerSellerArray = [
  { id: 1, name: "Seller" },
  { id: 2, name: "Buyer" },
];

function BuyerSellerTabView({
  setSelectedBuyerSellerTab,
  selectedBuyerSellerTab,
  data,
}) {
  const { theme } = useTheme();

  return (
    <>
      <View style={[styles.tabContainerWrapper]}>
        {data?.map((b, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedBuyerSellerTab(b.id)}
              style={[
                styles.tabContainerWrapperInner,
                {
                  borderTopLeftRadius: index == 0 ? 8 : 0,
                  borderBottomLeftRadius: index == 0 ? 8 : 0,
                  borderTopRightRadius: index == 1 ? 8 : 0,
                  borderBottomRightRadius: index == 1 ? 8 : 0,
                  backgroundColor:
                    selectedBuyerSellerTab !== b?.id
                      ? theme.colors?.primaryLightest
                      : theme.colors?.primary,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedBuyerSellerTab === b?.id
                      ? theme.colors?.white
                      : theme.colors?.primary,
                }}
              >
                {b?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

export default BuyerSellerTabView;

const styles = StyleSheet.create({
  tabContainerWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    marginBottom: -10,
    paddingRight: 20,
  },
  tabContainerWrapperInner: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
  },
});
