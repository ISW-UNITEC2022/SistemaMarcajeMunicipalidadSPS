import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, AppRegistry ,View,Button,FlatListItemSeparator,Dimensions,FlatList,Image,TextInput,TouchableOpacity, Alert } from 'react-native';
import axios from "axios";

const Login = ({navigation}) => {
const[correo,setCorreo]=useState();
const[password,setPassword]=useState();
const Auth= (Correo,Contraseña) =>{
axios.post('https://proyecto-isw1.herokuapp.com/api/empleados/auth', {
  correo: Correo,
  password: Contraseña,
}).then(response => {
  Alert.alert(
    "Bienvenido",
    'Bienvenido ' +response.data.nombre + " " + response.data.apellido ,[{text: "OK"}])
    navigation.navigate('Menu',{correo:Correo,
      nombre:response.data.nombre,
      id:response.data.idempleado,
      hora_entrada:response.data.horaentrada,
      hora_salida:response.data.horasalida,
      apellido:response.data.apellido})
}).catch(error => {
  console.log(error)
  Alert.alert(
  "Correo o contraseña incorrecta",
  "Verifica los datos ingresados incorrectamente",[{text: "OK"}])
}) 
}

  return (
    <View style={styles.container}>
       <View style={styles.shape_conatiner}>
     <View style={[styles.square,{
      backgroundColor: '#02732A'
     }]}/>
     <View style={[styles.square,{
      backgroundColor: '#F2B705'
     }]}/>
     <View style={[styles.square,{
      backgroundColor: '#BF0404'
     }]}/>
  
     </View>

     <Image
          style={{
            resizeMode: 'contain',
            height: 150,
            width: 121,
            left: 228,  
            top: 32,
          }}
        source = {require('../assets/logo.png')}
      />
      <View style={styles.botton}></View>
     
      <View style={styles.content}>
            <Text style={styles.texto}> Iniciar Sesión </Text>
            
            <TextInput  style={styles.input}
            placeholder='Correo electrónico' placeholderTextColor={"#fff"} onChangeText={(val)=>setCorreo(val)}></TextInput>
              <TextInput secureTextEntry={true}  style={styles.input}
            placeholder='Contraseña'  placeholderTextColor={"#fff"} onChangeText={(val)=>setPassword(val)} ></TextInput>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => Auth(correo,password)} >
              <Text style={styles.textbutton}> Ingresar </Text>
              </TouchableOpacity>

      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape_conatiner:{
    height: 20,
    width: 125,
    backgroundColor: '#013613',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  square:{
    height: 20,
    width: 125,
  },
  botton:{
    height: 50,
    top: 610,
    width: 380,
    backgroundColor: '#013613',
  },
  content:{
    flex:2,
    alignContent:'center',
    
  },
  texto:{
    color:'#1F3821',
    fontSize: 36,
    left:61,
    height: 49,
    width: 240,
    top:18,
    fontWeight:'bold'
  },

  buttonContainer:{
    top:50,
    backgroundColor:'#02732A',
    width:270,
    height:47,
    left:46,
    marginTop:33,
    borderRadius:10,
    textAlign:'center',
  },

  input: {
    left:45,
    top:50,
    fontSize:18,
    width:270,
    height:45,
    marginBottom:33,
    backgroundColor:'#80E673',
    textAlign:'center',
    borderRadius:10,
  },
  
  textbutton:{
    fontSize:24,
    top:10,
    color:'#F2F2F2',
    textAlign:'center',
    fontWeight:'bold'
  }
  

});

export default Login;