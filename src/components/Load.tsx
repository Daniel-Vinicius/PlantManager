import React, { useState } from "react";

import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

// https://lottiefiles.com/featured
import loadAnimation from "../assets/load.json";

import { ApiError } from "../components/ApiError";

export function Load() {
  const [timeoutLoading, setTimeoutLoading] = useState(false);

  setTimeout(() => {
    setTimeoutLoading(true);
  }, 10000);

  if (timeoutLoading) {
    return <ApiError />;
  }

  return (
    <View style={styles.container}>
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
  animation: {
    backgroundColor: "transparent",
    width: 200,
    height: 200,
  },
});
