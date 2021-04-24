import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "../styles/colors";

import { MaterialIcons } from "@expo/vector-icons";

import { PlantSelect } from "../pages/PlantSelect";
import { MyPlants } from "../pages/MyPlants";

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.body_light,
      labelPosition: "beside-icon",
      style: {
        borderTopWidth: 0,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        height: 88,
      },
    }}
  >
    <AppTab.Screen
      name="Nova Planta"
      component={PlantSelect}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
        ),
      }}
    />

    <AppTab.Screen
      name="Minhas Plantinhas"
      component={MyPlants}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </AppTab.Navigator>
);

export default AuthRoutes;
