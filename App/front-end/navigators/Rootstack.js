import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from "../screens/Menu";
import Login from "../screens/Login";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
            backgroundColor:"transparent"
        },
        headerTransparent:true,
        headerTitle:'',
        headerTintColor:"#02732A"
      }}
      initialRouteName="Login">
        
        <Stack.Screen  name="Login" component={Login}/>
        <Stack.Screen  name="Menu" component={Menu}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;