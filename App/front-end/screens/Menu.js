import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Pressable,TouchableHighlight,Button,Alert,Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from "axios";
import {useNetInfo} from "@react-native-community/netinfo";
import LoginSinConexion from './Login';
import { AsyncStorage } from 'react-native';

//Boton Salida
export class BotonMarca extends React.Component {

  state={
    entrada:true,
    pressed:false,
    correo:this.props.correo,
    id:this.props.idEmpleado,
  }

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
    axios.post('https://proyecto-isw1.herokuapp.com/api/marcaje', {
      lat:location.latitud,
      lon:location.longitud,
      idempleado:this.state.id,
      tipo:false,
    }).then(response => {
      console.log(response.status);
      this.setState({
        pressed:true,
        
      })
      Alert.alert(
        "",
        "Ha marcado su salida con éxito.",
        [
          { text: "Ok", onPress: () => console.log("OK Pressed") }
        ]
      );
    }).catch(error => {
      console.log("Error:"+error)
      console.log(error.response.data);
      if(error.response.data.status==409){
        Alert.alert(
          "",
          "Ya marcó su salida hoy.",
          [
            { text: "Ok", onPress: () => console.log("OK Pressed") }
          ]
        );
        if(error.response.data.status==401){
          Alert.alert(
            "",
            "No ha marcado su entrada el dia de hoy.",
            [
              { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      }
    });
  }
  
  marcar = () =>{
    Alert.alert(
      "",
      "Desea su marcar su salida dentro del sistema?",
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
    console.log("Correo: "+this.state.correo);
    axios.get('https://proyecto-isw1.herokuapp.com/api/marcaje/'+this.state.correo+'?tipo=false', {
    }).then(response => {
     
      if(response.data.marcado){
      this.setState({
        pressed:true,
      });}
    }).catch(error => {
      console.log("Error:"+error)
      console.log(error.response.data);
      if(error.response.data.status==409){
        Alert.alert(
          "",
          "Ya marcó su salida hoy.",
          [
            { text: "Ok", onPress: () => console.log("OK Pressed") }
          ]
        );
      if(error.response.data.status==401){
          Alert.alert(
            "",
            "No ha marcado su entrada el dia de hoy.",
            [
              { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      }
    });
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

//Boton Entrada
export class BotonMarca1 extends React.Component {
  
  state={
    entrada:true,
    pressed:false,
    correo:this.props.correo,
    id:this.props.idEmpleado,
  }

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
    axios.post('https://proyecto-isw1.herokuapp.com/api/marcaje', {
      lat:location.latitud,
      lon:location.longitud,
      idempleado:this.state.id,
      tipo:true,
    }).then(response => {
      console.log(response.status);
      this.setState({
        pressed:true,
      })
      Alert.alert(
        "",
        "Ha marcado su entrada con éxito.",
        [
          { text: "Ok", onPress: () => console.log("OK Pressed") }
        ]
      );
    }).catch(error => {
      console.log("Error:"+error)
      console.log(error.response.data);
      if(error.response.data.status==409){
        Alert.alert(
          "",
          "Ya marcó su entrada hoy.",
          [
            { text: "Ok", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    });
  }
  
  marcar = () =>{
    Alert.alert(
      "",
      "Desea su marcar su entrada dentro del sistema?",
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
    console.log("Correo: "+this.state.correo);
    axios.get('https://proyecto-isw1.herokuapp.com/api/marcaje/'+this.state.correo+'?tipo=true', {
    }).then(response => {

      if(response.data.marcado){
      this.setState({
        pressed:true,
      });}
    }).catch(error => {
      console.log("Error:"+error)
      console.log(error.response.data);
      if(error.response.data.status==409){
        Alert.alert(
          "",
          "Ya marcó su entrada hoy.",
          [
            { text: "Ok", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    });
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

export class EnviarMarcasOfflineBtn extends React.Component{

  
  state={
    active:true,
    
  }

  enviarMarca=async(marca)=>{
    let parse=JSON.parse(marca);
    console.log("Props:"+marca);
    console.log("Objeto:"+parse);
    console.log("ID:"+parse.idempleado);
    console.log("lat:"+parse.latitud);
    console.log("lon:"+parse.longitud);
    console.log("date:"+parse.date);
    console.log("Tipo:"+parse.tipo);
    axios.post('https://proyecto-isw1.herokuapp.com/api/marcaje', {
      lat:parse.lat,
      lon:parse.lon,
      idempleado:parse.idempleado,
      tipo:parse.tipo,
      fecha:parse.date,
    }).then(response => {
      console.log(response.status);
      Alert.alert(
        "",
        "Se ha enviado su marca con éxito.",
        [
          { text: "Ok", onPress: () => console.log("OK Pressed") }
        ]
      );
      //Borrar la marca después de enviarla
      !parse.tipo?this.borrarMarcaOffline('salidaoffline'):this.borrarMarcaOffline('entradaoffline');
      ///////////////////////////////////////
    }).catch(error => {
      console.log("Error:"+error)
      console.log(error.response.data);
      if(error.response.data.status==409){
        Alert.alert(
          "",
          "Ya marcó su salida hoy.",
          [
            { text: "Ok", onPress: () => console.log("OK Pressed") }
          ]
        );
        if(error.response.data.status==401){
          Alert.alert(
            "",
            "No ha marcado su entrada el dia de hoy.",
            [
              { text: "Ok", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      }
    });
  }

  evaluarEntrada(marcaEntrada){
  }

  evaluarSalida(marcaSalida){

  }

  leerMarcas = async () => {
    console.log("leerMarcas!")
    try {
      const marcaEntrada= await AsyncStorage.getItem('entradaoffline');
      const marcaE=marcaEntrada;
      const marcaSalida= await AsyncStorage.getItem('salidaoffline');
      const marcaS=marcaSalida;
      if (marcaEntrada !== null) {
        // Hay una marca de entrada
        console.log(marcaE);
        await this.enviarMarca(marcaE);
      }
      if (marcaSalida !== null) {
        // Hay una marca de salida
        console.log(marcaSalida);
        await this.enviarMarca(marcaS);
      }
      if (marcaSalida == null && marcaEntrada == null) {
        Alert.alert(
          "",
          "No tiene marcas pendientes.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    //BORRAR LAS MARCAS DESPUES DE QUE HAN SIDO ENVIADAS

  };

  componentDidMount(){
   //this.evaluarEntrada(marcaEntrada);
  //this.evaluarSalida(marcaSalida);
  }

  borrarMarca = (llave) =>{
    console.log("borrarMarca()");
    borrarMarcaOffline(llave);
  }

  borrarMarcaOffline = async(key) => {
    console.log('borrarMarcaOffline('+'\''+key+'\')')
    try{
        await AsyncStorage.removeItem(key);
    }
    catch(error){
        console.log(error)
    }
};

  render(){
    return(
    <TouchableOpacity style={[styles.imgbutton]} onPress={()=>this.leerMarcas()}>
      
      <Image source={require('../assets/enviarMarca.png')}  style={styles.enviar} />
       
    </TouchableOpacity>
    );
  }
}

const Menu = ({route,navigation}) => {

  const netInfo=useNetInfo();
  const {correo,nombre,id,hora_entrada,hora_salida,apellido} =route.params;
  var hora_entrada2=hora_entrada.slice(0,5);
  var hora_salida2=hora_salida.slice(0,5);


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

  const historial = () =>{  
    
    var dataH=[]
    
    //Obtiene un arreglo de las marcas de los últimos 30 dias
    axios.get('https://proyecto-isw1.herokuapp.com/api/empleados/historial/'+id,{
    }).then(response => {
    dataH=response.data
    //El arreglo anterior es enviado a la pantalla Historial junto con la ID del usuario
      navigation.navigate('Historial',{
        id:id,
        data:dataH})

    }).catch(error => {
      console.log(error)
    }) 
   
    
    }


    const getUsuario = async () =>{ 
      try {
        const value = await AsyncStorage.getItem('usuarioguardado')
        console.log(value)
        if( value !== null){
          let parse = JSON.parse(value).
          console.log(parse)

        }
      }catch(e){
  
      }
  
  
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
     <View style={styles.containerbut}>
    <TouchableOpacity style={styles.imgbutton}    onPress={() => cerrarsesion()} >	
    <Image source={require('../assets/cerrar.png')}  style={styles.cerrar} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.imgbutton}    onPress={() => historial()} >	
    <Image source={require('../assets/historial.png')}  style={styles.historial} />
    </TouchableOpacity>
    </View>
  <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
    
    <BotonMarca1 correo={correo} idEmpleado={id}></BotonMarca1>  
    <BotonMarca correo={correo} idEmpleado={id}></BotonMarca>
    <EnviarMarcasOfflineBtn active={false}></EnviarMarcasOfflineBtn>
    <TouchableOpacity disabled={true} style={styles.horario}>
      <Text style={[styles.textStyle,{fontSize:20}]}A>Horario de Trabajo</Text>
      <Text style={[styles.textStyle,{fontSize:22}]}A>{nombre} {apellido}</Text>
      <Text style={[styles.textStyle,{fontSize:24}]}>{hora_entrada2} - {hora_salida2}</Text>
    </TouchableOpacity>
  </View>
  </View>:
  <View>
    <View style={styles.containerbut}>
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
     </View>
  <View style={[styles.container,styles.offlinegap]}>
    <Image source={require('../assets/sin_conexion.png')} style={styles.warning_img}></Image>
    <TouchableOpacity disabled={true} style={[styles.small_warning]}>
      
      <Text style={[styles.warning_txt]}>No hay una conexión disponible.</Text>
       
    </TouchableOpacity>
    <TouchableOpacity style={[styles.buttonOffline]} onPress={()=>cerrarsesion()}>
      
      <Text style={[styles.active,styles.marcasOfflineTxtActive]}>Regresar a Iniciar Sesión</Text>
       
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
  offlinegap:{
    marginTop:300,
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
  enviar:{
    height:40,
    width:40,
    resizeMode:"contain",
    color:"#F2B705",
    left:155,	
    top:-470,	
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
  },
  marcasOfflineTxtActive:{
    textDecorationLine:'underline',
    fontSize:15,
    color:'#3f8c3f'
  },
  marcasOfflineTxtInactive:{
    textDecorationLine:'underline',
    fontSize:15,
    color:'#778c72'
  },
  active:{
    borderColor:'#3f8c3f',
    borderWidth:1,
    borderRadius:5,
    height:30,
    justifyContent:'center'
  },
  buttonOffline:{
    alignItems:'center',
    height: 60,
    width:255,
    justifyContent: 'center',
    borderRadius:5,
    marginTop:0,
  },
  warning_img:{
    height: 125,
    width: 125,
    left: 0,  
    top: 0,
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
      alignContent: 'center',},
      small_warning:{
        height: 60,
        width: 290,
        backgroundColor: '#BF0404',
        flexDirection: 'row',
        justifyContent:'center',
        borderRadius:5,
      },

});

export default Menu;