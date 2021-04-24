import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";

import { PlantSave } from "../pages/PlantSave";

import AuthRoutes from "./tab.routes";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  const [userHelp, setUserHelp] = useState(false);

  AsyncStorage.getItem("@plantmanager:help").then((help) => {
    setUserHelp(Boolean(help));
  });

  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      {!userHelp && <stackRoutes.Screen name="Welcome" component={Welcome} />}
      {!userHelp && (
        <stackRoutes.Screen
          name="UserIdentification"
          component={UserIdentification}
        />
      )}
      {!userHelp && (
        <stackRoutes.Screen name="Confirmation" component={Confirmation} />
      )}
      <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
      <stackRoutes.Screen name="PlantSave" component={PlantSave} />
      <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;
