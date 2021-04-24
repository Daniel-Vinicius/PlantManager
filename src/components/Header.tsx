import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import userImg from "../assets/daniel.jpg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [userName, setUserName] = useState<string>();
  const [image, setImage] = useState("");

  async function uploadImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(
      true
    );
    if (status !== "granted") {
      Alert.alert("É preciso aceitar as permissões para trocar a foto. 😥");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

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
      <TouchableHighlight onPress={uploadImage} style={styles.image}>
        <Image
          source={{ uri: image ? image : "../assets/daniel.jpg" }}
          style={styles.image}
        />
      </TouchableHighlight>
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
