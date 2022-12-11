import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from "../screens/Menu";
import Login from "../screens/Login";
import Historial from "../screens/Historial";
import MenuOffline from "../screens/MenuOffline";
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
        headerTintColor: '#02732A',
        headerLeftContainerStyle:{
          paddingLeft: 20,
        }
      }}
      initialRouteName="Login">
        
        <Stack.Screen  name="Login" component={Login}/>
        <Stack.Screen options={{headerShown: false}}  name="Menu" component={Menu}/>
        <Stack.Screen  name="Historial" component={Historial}/>
        <Stack.Screen name="MenuOffline" component={MenuOffline}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;