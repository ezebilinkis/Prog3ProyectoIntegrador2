import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class FormSearch extends Component {
    constructor(props){
        super(props)
    }

    evitarSubmit(event) {
        event.preventDefault();

    }

    consultar(consulta){
        this.props.actualizar(consulta);
        this.props.Filtro(consulta);

    }

    render() {
        return (
          <View>
            <TextInput
            style={styles.input}
            placeholder="Introduzca un email"
            name="búsqueda"
            consultar={(consulta) => this.consultar(consulta)}
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