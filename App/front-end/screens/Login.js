import { StatusBar } from 'expo-status-bar';
import {useNetInfo} from "@react-native-community/netinfo";
import React, {Component, useState} from 'react';
import { StyleSheet, Text, AppRegistry ,View,Button,FlatListItemSeparator,Dimensions,FlatList,Image,TextInput,TouchableOpacity, Alert } from 'react-native';
import axios from "axios";
import { element } from 'prop-types';
import { json, useNavigate } from 'react-router-dom';
import MenuOffline from './MenuOffline';
import { CheckBox } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';


export class LoginSinConexion extends React.Component{
  //Ir al menu fuera de conexión

  goToOfflineMenu = () => {
    console.log(value)
    this.props.navigate.navigate('MenuOffline')
  }

   getUsuario = async () =>{ 
    try {
      const valor = await AsyncStorage.getItem('usuarioguardado')
      
      if(valor !== null){
        let parse = JSON.parse(valor)
        console.log(parse.nombre)
        this.props.navigate.navigate('MenuOffline',{correo:parse.nombre,nombre:parse.nombre,id:parse.id,hora_entrada:parse.horaentrada,hora_salida:parse.horasalida,apellido:parse.apellido})
      }
    }catch(e){

    }


  }  

  render(){
    return(
      <View style={[styles.container]}>
        <Image source={require('../assets/sin_conexion.png')} style={styles.warning_img}>
 
        </Image>
          <TouchableOpacity disabled={true} style={styles.warning}>
              <Text style={styles.warning_txt}>
                No hay una conexión disponible. Intente conectarse o realice su marca de manera offline. 
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offline_btn} onPress={()=>this.getUsuario()}>
            <Text style={styles.textbutton}>Hacer marcas fuera de línea</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const Login = ({navigation}) => {

const navigate=navigation;
const netInfo = useNetInfo();
const[correo,setCorreo]=useState();
const[password,setPassword]=useState();
const[usuariopred,setUsuario]=useState(true);
const[value,setValue]=useState('');

const Auth= (Correo,Contraseña) =>{
axios.post('https://proyecto-isw1.herokuapp.com/api/empleados/auth', {
  correo: Correo,
  password: Contraseña,
}).then(response => {
  if(usuariopred){
    let usuario_objecto = { 
      nombre:response.data.nombre,
      id:response.data.idempleado,
      hora_entrada:response.data.horaentrada,
      hora_salida:response.data.horasalida,
      apellido:response.data.apellido,
    }
    AsyncStorage.setItem('usuarioguardado',JSON.stringify(usuario_objecto),() =>{AsyncStorage.getItem('usuarioguardado',(err,result) => {console.log(result)})})

  }

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
   netInfo.isConnected?
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

     <Image source={require('../assets/logo.png')} style={styles.logo} />

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
      <CheckBox  containerStyle={styles.checkbutton} checkedColor={"#02732A"}
            title="Usuario Predeterminado"
            checked={usuariopred}
            onPress={()=>setUsuario(!usuariopred)}
            />
    </View>:<LoginSinConexion navigate={navigate}></LoginSinConexion>
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
  warning:{
    height: 180,
    width: 290,
    backgroundColor: '#BF0404',
    flexDirection: 'row',
    justifyContent:'center',
    flex:-1,
    borderRadius:5,
  },
  square:{
    height: 20,
    width: 125,
  },
  logo:{
  resizeMode: 'contain',
  height: 150,
  width: 121,
  left: 120,  
  top: 32,
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
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  texto:{
    color:'#1F3821',
    fontSize: 33,
    height: 49,
    width: 240,
    top:110,
    fontWeight:'bold',
    textAlign:'center',
    left:10,
  },

  buttonContainer:{
    top:150,
    backgroundColor:'#02732A',
    width:270,
    height:47,
    marginTop:33,
    borderRadius:10,
    textAlign:'center',
  },

  input: {
    top:140,
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
  },
  checkbutton:{
    borderWidth: 1,        
    backgroundColor: '#f2f2f2', 
    borderColor: '#f2f2f2',   
  },
  warning_txt:{
    fontSize:20,
    top:0,
    color:'#F2F2F2',
    textAlign:'center',
    fontWeight:'normal',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  warning_img:{
  height: 125,
  width: 125,
  left: 0,  
  top: 0,
  },

  offline_btn:{
    top:100,
    backgroundColor:'#02732A',
    width:270,
    height:100,
    marginTop:30,
    borderRadius:10,
    textAlign:'center',
  },

});
export default Login;