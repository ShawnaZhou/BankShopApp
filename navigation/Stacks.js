import React from "react";
import { Auth, Login, Register } from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import MyDrawer from "./Drawer";

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator initialRouteName="auth">
      <Stack.Screen
        options={{ headerShown: false }}
        name="auth"
        component={Auth}
      />
      <Stack.Screen options={{ title: "" }} name="login" component={Login} />
      <Stack.Screen
        options={{ title: "注册" }}
        name="register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="tabs"
        component={Tabs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="drawer"
        component={MyDrawer}
      />
    </Stack.Navigator>
  );
};

export default Stacks;

