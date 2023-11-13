import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import FormPost from '../components/FormPost';
export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
          descripcion: ''
        }
    }

actualizarDescripcion(texto){
  console.log('se hizo');
  this.setState({
    descripcion : texto
  })
}


render() {
    return (
      <View>  
        <FormPost actuDesc = {(texto)=> this.actualizarDescripcion(texto) } />
      </View>
    )
  }
}

