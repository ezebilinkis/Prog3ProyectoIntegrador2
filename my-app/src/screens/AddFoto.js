import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MyImagePicker from '../components/MyImagePicker';
import { db } from '../firebase/config';

export default class AgregarFoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotoDePerfil: '',
    };
  }

  actualizarEstadoFotoDePerfil(url) {
    this.setState({
      fotoDePerfil: url,
    });
  }

  actualizarDoc() {
    console.log(this.props.route.params.docId);
    db.collection('users')
      .doc(this.props.route.params.docId)
      .update({
        fotoPerfil: this.state.fotoDePerfil,
      })
      .then((resp) => {
        this.props.navigation.navigate('Home');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Agregar foto de perfil</Text>
        <MyImagePicker
          actualizarEstadoFotoDePerfil={(url) => this.actualizarEstadoFotoDePerfil(url)}
        />
        {this.state.fotoDePerfil !== '' ? (
          <TouchableOpacity style={styles.button} onPress={() => this.actualizarDoc()}>
            <Text style={styles.buttonText}>Añadir foto de Perfil</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.skipText}>Omitir este paso</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  skipText: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
});
