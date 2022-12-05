
import { useEffect, useState } from 'react'
import Logo from '../../../assets/Logo C3i Oficial.png'
import {Document, Page, View, Text, Image, PDFViewer, StyleSheet} from "@react-pdf/renderer";

const getMes=(mes)=>{
  switch(mes){
    case 1:
      return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
      default:
        return '---';
  }
}

const styles = StyleSheet.create({
  em:{
    fontStyle: 'bold'
  }, 
    table: {
    width: '90vw',
    height:'auto',
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 12
  },
  tableRow:{
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
  }
}) 

const detectarF_C=(fila, filaD)=>{
  if(fila===filaD)
    return true;
  else  
    return false;
}

const Table = ({children, th}) => (
  <View style={styles.table}>
    {children.map((row, ind) =>
      <View key={ind} style={[styles.tableRow, th && ind === 0 ? styles.em: {}]}>
        {row.map((cell, j) =>
          <View key={j} style={[styles.cell, {width:'100%', height: 'auto', backgroundColor: detectarF_C(ind,0)?'#078C03':'', borderBottom:1, borderLeft:1, borderTop:detectarF_C(ind,0)?1:0, borderRight:detectarF_C(j,8)?1:0}]}>
            {
              typeof(cell) === 'string' || typeof(cell) === 'number' ? 
              <Text style={{marginBottom:6, marginTop:6, marginLeft:3, color: detectarF_C(ind,0)?'#FFFFFF':''}}>{cell}</Text> : cell
            }
          </View>
        )}
      </View>
    )}
  </View>
)

const Reporte_MarcasIncompletas_D = ({mesI, mesF, dataT}) =>(

  <Document>
  <Page size="A2">
  <Image src={Logo} style={{ height: '10vh', width: '20vw', marginLeft: '4vw' }} />
  <View>
  
  <View style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  }}><Text>Dirección C3i Municipalidad de San Pedro Sula</Text>
  </View>
  </View>
  <View style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  }}><Text>Formato de Reportes de Marcas Incompletas</Text>
  </View>

  <View id='contenedorR' style={{width: '90vw', marginLeft: '4vw', marginTop: '2vh'}}>
    <Text>
      A continuación se presenta un reporte completo de las asistencias
      incompletas dentro de la aplicación por el equipo de “Los Amigos de la
      Municipalidad”, con un reporte completo de datos personales y fechas
      de dichos mes {getMes(mesI)} y {getMes(mesF)}.
    </Text>
  </View>
    
  <View style={{alignItems: 'center', fontSize: '12px'}}><Table th children={dataT} /></View>

  </Page>
</Document>
  
)

const Reporte_MarcasIncompletas_PDF = () =>{

  let data =  window.location.search.substring(1); 
    let split = data.split('&');
    let mesI = split[0];
    let mesF = split[1];

    if(mesI.length===0)
      mesI='1';

    if(mesF.length===0)
      mesF='1';

    const [Tasks, setTasks] = useState([])

    const loadTasks = async () => {
      const response = await fetch(
        'https://proyecto-isw-dev.herokuapp.com/api/reportes/incompleto',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "mesInicial": {
              "month": mesI,
              "year": 2022
            },
              "mesFinal": {
              "month": mesF,
              "year": 2022
            }
          }),
        }
      )
    const data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const generarD = () => {

    let dataT = [];
    dataT[0] = [
      'No° Identidad',
      'Nombre Completo',
      'Departamento',
      'Distrito',
      'Fecha',
      'Entrada',
      'Salida',
      'Latitud',
      'Longitud',
    ]

    for (let i = 1; i <= Tasks.length; i++) {
      dataT[i] = [
        Tasks[i - 1].idempleado,
        Tasks[i - 1].nombre + ' ' + Tasks[i - 1].apellido,
        Tasks[i - 1].departamento,
        Tasks[i - 1].distrito,
        Tasks[i - 1].fecha,
        Tasks[i - 1].entrada,
        Tasks[i - 1].salida,
        Tasks[i - 1].latitud,
        Tasks[i - 1].longitud,
      ]
    }

    return dataT;
  }

  let dataT=generarD();

    return (
      <div>
          <PDFViewer style={{width: "100%", height: "90vh"}}>
          <Document>
    <Page size="A2">
    <Image src={Logo} style={{ height: '10vh', width: '20vw', marginLeft: '4vw' }} />
    <View>
    
    <View style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }}><Text>Dirección C3i Municipalidad de San Pedro Sula</Text>
    </View>
    </View>
    <View style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }}><Text>Formato de Reportes de Marcas Incompletas</Text>
    </View>

    <View id='contenedorR' style={{width: 'auto', marginLeft: '4vw', marginTop: '2vh'}}>
      <Text>
      A continuación se presenta un reporte completo de las asistencias marcadas dentro de 
      la aplicación por el equipo de “Los Amigos de la Municipalidad”, con un reporte completo
      de datos personales y fechas de dichos marcajes entre el mes {getMes(parseInt(mesI,10))} y {getMes(parseInt(mesF,10))}.
      </Text>
    </View>
      
    <View style={{alignItems: 'center', fontSize: '12px'}}><Table th children={dataT} /></View>

    </Page>
  </Document>
          </PDFViewer>
        
      </div>
    )
  }

export {Reporte_MarcasIncompletas_D, Reporte_MarcasIncompletas_PDF};