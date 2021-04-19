import React, { useState } from "react";

import { Text, SafeAreaView, Image, StyleSheet } from "react-native";

import wateringImg from "../assets/watering.png";
import { Button } from "../components/Button";

import colors from "../styles/colors";

export function Welcome() {
  const [title, setTitle] = useState("fácil");

  function handleChangeTitle(titleParameter: string) {
    if (titleParameter === title) {
      return;
    }

    setTitle(titleParameter);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {"\n"}
        suas plantas {"\n"}
        de forma {title}
      </Text>

      <Image source={wateringImg} style={styles.image} />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <Button title=">" onPress={() => handleChangeTitle("simples")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    width: 292,
    height: 284,
  },
});
