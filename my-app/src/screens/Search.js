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
          <View>
            <FormularioSearch actuConsulta={(texto)=>this.actualizarConsulta(texto)}/>
            {
              this.state.consulta == ''?
              <View>

              <Text>Busqueda</Text>
              
              </View>
              
              :
            <ScrollView>
               <Text>Formulario</Text>
               
               <FlatList
                data={this.state.usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View >
                <Text >Nombre de usuario: {item.data.name}</Text>
                <Text >Minibio: {item.data.minibio}</Text>
                <Text >Email: {item.data.owner}</Text>
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
  img:{
    width: 300
  }
})