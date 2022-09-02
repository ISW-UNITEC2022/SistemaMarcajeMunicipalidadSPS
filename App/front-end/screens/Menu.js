import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Presable,TouchableHighlight,Button,Alert,Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from "axios";

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
    axios.get('https://proyecto-isw1.herokuapp.com/api/marcaje/'+this.state.correo+'?tipo=false', {
    }).then(response => {
      console.log(response);
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
      console.log(response);
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




const Menu = ({route,navigation}) => {

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
     <Pressable style={styles.button}   onPress={() => cerrarsesion()} >	
      <Text style={styles.textlog}>CERRAR SESIÓN</Text>	
    </Pressable>
  <View style={styles.container}>
    <Image source={require('../src/assets/logo.png')} style={styles.logo} />
    <BotonMarca1 correo={correo} idEmpleado={id}></BotonMarca1>  
    <BotonMarca correo={correo} idEmpleado={id}></BotonMarca>
    <TouchableOpacity disabled={true} style={styles.horario}>
      <Text style={[styles.textStyle,{fontSize:20}]}A>Horario de Trabajo</Text>
      <Text style={[styles.textStyle,{fontSize:22}]}A>{nombre} {apellido}</Text>
      <Text style={[styles.textStyle,{fontSize:24}]}>{hora_entrada2} - {hora_salida2}</Text>
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

export default Menu;