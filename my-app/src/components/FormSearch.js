import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
  }

  evitarSubmit(evento) {
    evento.preventDefault()
  }

  actualizar(texto) {
    this.props.actualizar(texto)
    this.props.Filtro(texto)
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Búsqueda"
          name="busqueda"
          onChangeText={(text) => this.actualizar(text)}
        />
        <TouchableOpacity 
        style={styles.btn}
        onPress={(event) => this.evitarSubmit(event)}>
            <Text style = {styles.textBtn} >Buscar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'white',
        margin: 20,
        height : '50px',
        width: '500px',
        alignSelf: 'center'
    },
    btn:{
        backgroundColor:'black',
        padding:25,
        margin: '16px'
    },
    textBtn:{
        color:'white',
        alignSelf: 'center',
        fontSize: 'large'
    },
    textLink:{
        marginBottom:24,

        fontSize:'50px',
        margin: '16px',
        textAlign: 'center',
        color: '#black'
    },
    container:{
        flex:1, 
        justifyContent: 'center',
        backgroundColor: '#FFF0F5'
      },
      textNoBoton: {
        color:'white',
        alignSelf: 'center',
        fontSize: 'large',
        backgroundColor:'#D8BFD8',
        padding:25
      }

})