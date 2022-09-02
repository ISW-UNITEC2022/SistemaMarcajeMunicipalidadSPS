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
        headerTintColor: '#F2F2F2',
        headerLeftContainerStyle:{
          paddingLeft: 20,
        }
      }}
      initialRouteName="Login">
        
        <Stack.Screen  name="Login" component={Login}/>
        <Stack.Screen options={{headerShown: false}}  name="Menu" component={Menu}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;