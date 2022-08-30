import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TouchableHighlight,Button,Alert,Image} from 'react-native';

export class BotonMarca extends React.Component {
  state={
    entrada:false,
    pressed:false
  }

  marcar = () =>{
    Alert.alert(
      "",
      "Desea su marcar su salida dentro del sistema?",
      [
        {
          text: "Sí",
          onPress: () => 
          this.setState({
            pressed:true,
          }),
          style: "No"
        },
        { text: "No", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  componentDidMount(){
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

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    alignItems:'center',
    height: 80,
    width:280,
    justifyContent: 'center',
    borderRadius:10,
    margin:50,
    marginTop: 75,
    alignItems: 'center'

  },
  green:{
    backgroundColor:'green'
  },
  yellow:{
    backgroundColor:'yellow'
  }
});

export class BotonMarca1 extends React.Component {


  state={
    entrada:true,
    pressed:false
  }

  marcar = () =>{
    Alert.alert(
      "",
      "Desea su marcar su entrada dentro del sistema?",
      [
        {
          text: "Sí",
          onPress: () => 
          this.setState({
            pressed:true,
          }),
          style: "No"
        },
        { text: "No", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  componentDidMount(){
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

const styles4 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    alignItems:'center',
    height: 80,
    width:280,
    justifyContent: 'center',
    borderRadius:5,
  },
  green:{
    backgroundColor:'#969696'
  },
  yellow:{
    backgroundColor:'#FFEF05',
    fontSize:'30px'
  }
});

const Menu = ({navigation}) => {
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
  <View style={styles.container}>
    <Image source={require('../src/assets/logo.png')} style={styles.logo} />
    <BotonMarca1 state={false}></BotonMarca1>  
    <BotonMarca state={true}></BotonMarca>
    <TouchableOpacity disabled={true} style={styles.horario}>
      <Text style={[styles.textStyle,{fontSize:20}]}>Horario de Trabajo</Text>
      <Text style={[styles.textStyle,{fontSize:24}]}>8:00am - 5:00pm</Text>
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
    backgroundColor:'#252525',
    fontSize:'30px'
  }

});

export default Menu;