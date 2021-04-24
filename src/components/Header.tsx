import React, { useEffect, useState } from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userImg from "../assets/daniel.jpg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const name = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(name || "");
    }

    loadStorageUserName();
  }, [userName]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{title ? title : "Olá,"}</Text>
        <Text style={styles.userName}>{subtitle ? subtitle : userName}</Text>
      </View>
      <Image source={userImg} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
