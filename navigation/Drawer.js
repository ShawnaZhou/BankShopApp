import React from "react";
import { Home, Profile } from "../screens/index";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Order" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;

