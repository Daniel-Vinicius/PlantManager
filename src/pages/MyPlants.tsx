import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text, Image, FlatList, Alert } from "react-native";

import { loadPlants, PlantProps, removePlant } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterDropImg from "../assets/waterdrop.png";

import { Header } from "../components/Header";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/Load";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldPlants) =>
              oldPlants.filter((item) => item.id !== plant.id)
            );

            if (myPlants[0].id === plant.id && myPlants[1]) {
              const nextTime = formatDistance(
                new Date(myPlants[1].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
              );

              setNextWaterd(
                `Regue sua ${myPlants[1].name} daqui a ${nextTime}`
              );
              return;
            }

            if (myPlants[0].id === plant.id && !myPlants[1]) {
              setNextWaterd(`Você ainda não tem plantas. 😥`);
              setMyPlants([]);
              return;
            }
          } catch (error) {
            Alert.alert("Não foi possível remover! 😥");
            console.log(error);
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlants();

      if (!plantsStorage[0]) {
        setMyPlants([]);
        setNextWaterd(`Você ainda não tem plantas. 😥`);
        setLoading(false);
        return;
      }

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterd(`Regue sua ${plantsStorage[0].name} daqui a ${nextTime}`);

      setMyPlants(plantsStorage);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

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
          renderItem={({ item }) => (
            <PlantCardSecundary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
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
