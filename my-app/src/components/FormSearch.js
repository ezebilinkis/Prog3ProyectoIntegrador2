import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class FormularioSearch extends Component {
    constructor(props) {
        super(props);
        
    }




    render() {
        return (
            <View>
               <Text style= {styles.searchText}>Formulario</Text>
               <ScrollView >
            <View >
            <Text style= {styles.searchText}>consulta</Text>
            <TextInput style= {styles.formText}
            placeholder="Descripcion del post"
            keyboardType="email-address"
            value={this.props.estadoDescripcion}
            onChangeText={(descripcion)=> this.props.actuConsulta(descripcion)}
          />
        </View>
      </ScrollView>
            </View>
        );
    }
}
let styles = StyleSheet.create({
 

    searchText:{   fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center', 
    padding: 10,
    fontFamily: 'Monserrat'},

    formText:{
        fontSize: 14,
        color: 'grey',
        textAlign: 'center', 
        padding: 10,
    
      },

  
  })