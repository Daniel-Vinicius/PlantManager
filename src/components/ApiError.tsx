import React from "react";

import { StyleSheet, View, Text } from "react-native";

import LottieView from "lottie-react-native";

// https://lottiefiles.com/featured
import loadAnimation from "../assets/error.json";
import colors from "../styles/colors";

export function ApiError() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Internal Server Error</Text>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: colors.heading,
    padding: 10,
  },
  animation: {
    backgroundColor: "transparent",
    width: 300,
    height: 300,
  },
});
