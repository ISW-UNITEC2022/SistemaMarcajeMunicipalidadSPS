import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView,Text, View, TouchableOpacity,Pressable,TouchableHighlight,Button,Alert,Image} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from "axios";

export class TuplaMarca extends React.Component {

  s_color="#202020";
  state={
    h_entrada:this.props.h_entrada,
    h_salida:this.props.h_salida,
    fecha:this.props.fecha,
  }

  componentDidMount(){
  }

  render(){

    return (
    <View>
      <TouchableOpacity disabled={true} style={styles.tupla}>
        <Text style={{color:this.s_color}}>{this.state.fecha}</Text>
        <Text>        |      </Text>
        <Text style={{color:this.s_color}}>{this.state.h_entrada}</Text>
        <Text>        |         </Text>
        <Text style={{color:this.s_color}}>{this.state.h_salida}</Text>
      </TouchableOpacity>
    </View>
   );
  }
}

const Historial = ({route,navigation}) => {

  const idEmpleado=route.params.id;
  const horario=route.params.data;


  const widthArr = [110, 110, 110,];
  const x={h_entrada:"7:00",h_salida:"17:00",fecha:"15/9/2022"};
  horario.map((d)=>{
      if(d.horaentrada==null){d.horaentrada=" N/A        ";};
      if(d.horasalida==null){d.horasalida=" N/A        ";};
  });
    const data = horario
    console.log(horario)


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
  return(
    <View style={[styles.container]}>
      <View style={styles.container}>
      <Text>
      </Text>
      <Text style={[{fontSize:24,fontWeight:'bold'}]}>
        Historial
      </Text>
      <TouchableOpacity disabled={true} style={styles.header}>
          <Text>      Fecha</Text>
          <Text>     </Text>
          <Text>      H. de Entrada</Text>
          <Text>     </Text>
          <Text>H. de Salida</Text>
        </TouchableOpacity>
      <ScrollView style={styles.dataWrapper} horizontal={false}>
                {
                  data.map((d) => (
                    <TuplaMarca h_entrada={d.horaentrada} h_salida={d.horasalida} fecha={d.fecha}></TuplaMarca>
                  ))
                }
      </ScrollView>
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
    height:27,
    width:40,
    resizeMode:"contain",
    color:"#F2B705"
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
  tupla:{
    //Touchable: #DBDBDB
    //Letra: #202020
    backgroundColor:'#DBDBDB',
    fontSize:'30px',
    alignItems:'center',
    height: 90,
    width:350,
    justifyContent: 'center',
    borderRadius:5,
    marginTop:3,
    flexDirection:"row",
    color:"#202020",
  },
  header:{
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    height: 30,
    width:350,
    justifyContent: 'center',
    borderRadius:5,
    marginTop:3,
    flexDirection:"row"
  }

});

export default Historial;