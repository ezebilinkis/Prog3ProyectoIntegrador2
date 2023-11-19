import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import FormularioSearch from '../components/FormSearch';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          usuarios: [],
          usuariosBc: [],
          consulta: ''
        }
    }
  componentDidMount(){
    db.collection('users').onSnapshot((docs)=>{
      let listadoUsuarios=[];
      docs.forEach((doc)=>{
        listadoUsuarios.push({id: doc.id, data: doc.data()})
      })
      this.setState({usuarios:listadoUsuarios, usuariosBc: listadoUsuarios}, ()=>console.log(this.state.usuarios))
    })
    
  }

  actualizarConsulta(texto){
    this.setState({
      consulta: texto
    }, ()=>{
      let usuarios = this.state.usuariosBc.filter((elm)=> elm.data.name.toLowerCase().includes(texto.toLowerCase()))
      this.setState({usuarios: usuarios})

    })
  }




    render() {
        return (
          <View style= {styles.formContainer}>
            <FormularioSearch actuConsulta={(texto)=>this.actualizarConsulta(texto)}/>
            {
              this.state.consulta == ''?
              <View>

              <Text style= {styles.busquedaText}>Busqueda</Text>
              
              </View>
              
              :
            <ScrollView>
               <Text style = {styles.searchText}>Formulario</Text>
               
               <FlatList
                data={this.state.usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View >
                <Text  style = {styles.formText}>Nombre de usuario: {item.data.name}</Text>
                <Text  style = {styles.formText}>Minibio: {item.data.minibio}</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Perfil', {email: item.data.owner})}}>
                    <Text style = {styles.formText}>Email: {item.data.owner}</Text>
                </TouchableOpacity>
                {item.data.fotoPerfil == '' ? (
                <></>
                ) : (
                <Image source={{ uri: item.data.fotoPerfil }} style={styles.img} />
                )}
              </View>
              )}
              />
            </ScrollView>
          }
          </View>
          
        );
    }
}

let styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: '60%',
    alignSelf: 'center',
  },
  img:{
    width: 300
  },
  formText:{
    fontSize: 14,
    color: 'grey',
    textAlign: 'center', 
    padding: 10,

  },
  searchText:{   fontWeight: 'bold',
  fontSize: 16,
  textTransform: 'uppercase', 
  color: 'black',
  textAlign: 'center', 
  padding: 10,
  fontFamily: 'Monserrat'},

  busquedaText:{
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center', 
    padding: 10,
    fontFamily: 'Monserrat'
  }

})