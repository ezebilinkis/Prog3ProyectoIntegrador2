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
               <Text>Formulario</Text>
               <ScrollView >
            <View >
            <Text >consulta</Text>
            <TextInput
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