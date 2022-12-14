import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Pressable,TouchableHighlight,Button,Alert,Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from "axios";
import {useNetInfo} from "@react-native-community/netinfo";
import LoginSinConexion from './Login';
import { AsyncStorage } from 'react-native';

//Boton para almacenar la marca de salida
export class BotonMarca2 extends React.Component {

  state={
    entrada:false,
    pressed:false,
    id:this.props.idEmpleado,
  }
//Obtiene las coordenadas con Location
  _getLocation = async() =>{
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if(status!=='granted'){
      console.log('PERMISSION NOT GRANTED!');

      this.setState({
        errorMessage:'PERMISSION NOT GRANTED!'
      });
    }

    const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
    return {
        latitud:location.coords.latitude,
        longitud:location.coords.longitude,
    };
  }

  enviarMarca=async()=>{
    console.log("Marcaje:");
    const location=await this._getLocation();

    console.log(location);
   
    //Almacenar la salida
    let today = new Date()
    let marca = {
      lat:location.latitud,
      lon:location.longitud,
      idempleado:this.state.id,
      tipo:false,
      date:today
    }

    await AsyncStorage.setItem('salidaoffline',JSON.stringify(marca),() =>{AsyncStorage.getItem('salidaoffline',(err,result) => {console.log(result)})})
    console.log("Se acaba de marcar la salida.");
    this.setState({pressed:true,});

  }
  
  marcar = () =>{
    Alert.alert(
      "",
      "Desea guardar su marca de salida dentro de su dispositivo? Tendrá que enviarla desde el menú online más tarde.",
      [
        {
          text: "Sí",
          onPress: () => {  
            this.enviarMarca();},
          style: "No"
        },
        { text: "No", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  componentDidMount(){

    getMarca = async () =>{ 
      try {
        const value = await AsyncStorage.getItem('salidaoffline')
        if( value !== null){
          //si hay marca de salida entonces se deshabilita el boton
          this.setState({
            pressed:true,
          });
        }
      }catch(e){
  
      }
    } 
    getMarca()
    //Aquí hay que verificar si hay marcas de entrada de hoy en el almacenamiento local
    //Si es así, pasar el boton a deshabilitado.
  }
  render(){

    return (
    <View >
      {this.state.pressed?
      <TouchableOpacity disabled={true} onPress={()=>this.marcar()} style={[styles.button, styles.gray]}  >
        <View>
        <Text style={styles.textStyle}>Marcar Salida</Text>
        </View>
      </TouchableOpacity>:
      <TouchableOpacity onPress={()=>this.marcar()} style={[styles.button, styles.yellow]}  >
      <View>
      <Text style={styles.textStyle}>Marcar Salida</Text>
      </View>
    </TouchableOpacity>
  }
      <StatusBar style="auto" />
    </View>
    
   );
  }
}

//Boton para almacenar la marca de entrada
export class BotonMarca3 extends React.Component {

  state={
    entrada:true,
    pressed:false,
    id:this.props.idEmpleado,
  }
//Obtiene las coordenadas con Location
  _getLocation = async() =>{
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if(status!=='granted'){
      console.log('PERMISSION NOT GRANTED!');

      this.setState({
        errorMessage:'PERMISSION NOT GRANTED!'
      });
    }

    const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
    return {
        latitud:location.coords.latitude,
        longitud:location.coords.longitude,
    };
  }

  enviarMarca=async()=>{
    console.log("Marcaje:");
    const location=await this._getLocation();
    console.log(location);
    
    let today = new Date()

    let marca = {
      lat:location.latitud,
      lon:location.longitud,
      idempleado:this.state.id,
      tipo:true,
      date:today
    }

    await AsyncStorage.setItem('entradaoffline',JSON.stringify(marca),() =>{AsyncStorage.getItem('entradaoffline',(err,result) => {console.log(result)})})
    console.log("Se acaba de marcar la entrada.");
    this.setState({pressed:true,});
  }
  
  marcar = () =>{
    Alert.alert(
      "",
      "Desea guardar su marca de salida dentro de su dispositivo? Tendrá que enviarla desde el menú online más tarde.",
      [
        {
          text: "Sí",
          onPress: () => {  
            this.enviarMarca();},
          style: "No"
        },
        { text: "No", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  componentDidMount(){
    getMarca = async () =>{ 
      try {
        const value = await AsyncStorage.getItem('entradaoffline')
        if( value !== null){
          //si hay marca de entrada entonces se deshabilita el boton
          this.setState({
            pressed:true,
          });
        }
      }catch(e){
  
      }
  
    }  


    getMarca()
    //Aquí hay que verificar si hay marcas de entrada de hoy en el almacenamiento local
    //Si es así, pasar el boton a deshabilitado.
  }

  render(){

    return (
    <View>
      {this.state.pressed?
      <TouchableOpacity disabled={true} onPress={()=>this.marcar()} style={[styles.button, styles.gray]}  >
        <View>
          <Text style={styles.textStyle}>Marcar Entrada</Text>
        </View>
      </TouchableOpacity>:
      <TouchableOpacity onPress={()=>this.marcar()} style={[styles.button, styles.yellow]}  >
      <View>
        <Text style={styles.textStyle}>Marcar Entrada</Text>
      </View>
    </TouchableOpacity>
  }
      <StatusBar style="auto" />
    </View>
   );
  }
}



const MenuOffline = ({route,navigation}) => {

  const netInfo=useNetInfo();
  const {correo,nombre,id,hora_entrada,hora_salida,apellido} =route.params
  
	const cerrarsesion = () =>{Alert.alert(	
    "",	
    "Desea cerrar sesión?",	
    [	
      {	
        text: "Sí",	
        onPress: () =>  navigation.navigate('Login'),	
      },	
      { text: "No", onPress: () => console.log("OK Pressed") }	
    ]	
    );	
  }

  borrarMarca = () =>{
    console.log("borrarMarca()");
    borrarMarcaOffline('salidaoffline');
  }

  const borrarMarcaOffline = async(key) => {
    console.log('borrarMarcaOffline('+'\''+key+'\')')
    try{
        AsyncStorage.removeItem('entradaoffline');
        AsyncStorage.removeItem('salidaoffline');
    }
    catch(error){
        console.log(error)
    }
};


  const getmarcae = async () =>{ 
    try {
      const value = await AsyncStorage.getItem('usuarioguardado')
      console.log("entrada")
      if( value !== null){
        let parse = JSON.parse(value).
        console.log(parse)

      }
    }catch(e){

    }


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
     <View style={styles.containerbut}>
    <TouchableOpacity style={styles.imgbutton}    onPress={() => getmarcae()} >	
    <Image source={require('../assets/cerrar.png')}  style={styles.cerrar} />
    </TouchableOpacity>
    </View>
  <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />

    <BotonMarca3 idEmpleado={id}></BotonMarca3>
    <BotonMarca2 idEmpleado={id}></BotonMarca2>
    <TouchableOpacity disabled={false} style={styles.horario} onPress={()=>this.borrarMarca()}>
      <Text style={[styles.textStyle,{fontSize:20}]}A>{nombre} {apellido}</Text>
      <Text style={[styles.textStyle,{fontSize:20}]}>{id}</Text>
    </TouchableOpacity>
  </View>
  </View>
  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerbut: {
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'flex-start',
    },
    shape_conatiner:{
      height: 20,
      width: 125,
      backgroundColor: '#013613',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'flex-start',
    },
    textlog: {	
      fontSize: 16,	
      left:115,	
      top:-30,	
      fontWeight: 'bold',	
      letterSpacing: 0.25,	
      color: '#BF0404'	
    },
    logout: {	
      alignItems: 'left',	
      justifyContent: 'left',	
      backgroundColor: '#BF0404',	
      left:10	
    },
    square:{
      height: 20,
      width: 125,
    },
    botton:{
      height: 50,
      top: 610,
      width: 380,
    },
    content:{
      flex:2,
      alignContent:'center',
      
    },
    cerrar:{
      height:40,
      width:40,
      resizeMode:"contain",
      color:"#F2B705",
      left:-130,	
      top:-30,	
    },
    historial:{
      height:40,
      width:40,
      resizeMode:"contain",
      color:"#F2B705",
      left:130,	
      top:-30,	
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
      borderRadius:10
    },
    
    textbutton:{
      fontSize:24,
      top:10,
      color:'#F2F2F2',
      textAlign:'center',
      fontWeight:'bold'
    },
    imgbutton:{
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:5,
      marginTop:39,
    },
    button:{
      alignItems:'center',
      height: 60,
      width:255,
      justifyContent: 'center',
      borderRadius:5,
      marginTop:39,
    },
    green:{
      backgroundColor:'#969696'
    },
    yellow:{
      backgroundColor:'#F2B705',
      fontSize:'30px'
    },
    textStyle:{
      //fontFamily:'open-sans',
      fontSize:26,
      color:'white',
      fontWeight:'bold'
    },
    logo:{
      height:143,
      width:210,
    },
    horario:{
      height:104,
      width:255,
      backgroundColor:'#078C03',
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:5,
      marginTop:39
    },
    gray:{
      backgroundColor:'#757575',
      fontSize:'30px'
    }
  
  });
  
export default MenuOffline;