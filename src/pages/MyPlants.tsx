import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text, Image, FlatList } from "react-native";

import { loadPlants, PlantsProps } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterDropImg from "../assets/waterdrop.png";

import { Header } from "../components/Header";
import { PlantCardSecundary } from "../components/PlantCardSecundary";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterd(`Regue sua ${plantsStorage[0].name} daqui a ${nextTime}`);

      setMyPlants(plantsStorage || [{} as PlantsProps]);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas" />

      <View style={styles.spotlight}>
        <Image style={styles.spotlightImage} source={waterDropImg} />

        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas Regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PlantCardSecundary data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },

  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
