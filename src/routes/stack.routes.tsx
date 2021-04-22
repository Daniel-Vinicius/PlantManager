import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../styles/colors";

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { UserConfirmation } from "../pages/UserConfirmation";
import { PlantSelect } from "../pages/PlantSelect";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <stackRoutes.Screen name="UserConfirmation" component={UserConfirmation} />
    <stackRoutes.Screen name="PlantSelect" component={PlantSelect} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
