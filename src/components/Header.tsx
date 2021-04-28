import React from "react";

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

import { Feather } from "@expo/vector-icons";

import { useUser } from "../contexts/User";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user, changeImage } = useUser();

  const { image, name } = user;
  async function uploadImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(
      true
    );
    if (status !== "granted") {
      Alert.alert("É preciso aceitar as permissões para trocar a foto. 😥");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (result.cancelled === true) {
      return;
    }

    if (!result.cancelled && result.uri) {
      await AsyncStorage.setItem("@plantmanager:image", result.uri);
      changeImage(result.uri);
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{title ? title : "Olá,"}</Text>
        <Text style={styles.userName}>{subtitle ? subtitle : name}</Text>
      </View>
      <TouchableHighlight onPress={uploadImage} style={styles.image}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imageUploadContainer}>
            <Feather name="upload" size={40} style={styles.imageUpload} />
          </View>
        )}
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
  imageUpload: {
    color: colors.white,
    zIndex: 11,
  },
  imageUploadContainer: {
    height: 70,
    width: 70,
    borderRadius: 40,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  image: {
    borderRadius: 40,
    height: 70,
    width: 70,
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
