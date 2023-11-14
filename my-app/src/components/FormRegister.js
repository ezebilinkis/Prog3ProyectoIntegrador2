import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      password: '',
      minibio: '',
    };
  }

  registrarUsuario(name, email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) =>
        db.collection('users').add({
            owner: this.state.mail,
            createdAt: Date.now(),
            name: this.state.name,
            minibio: this.state.minibio,
            fotoPerfil: ''
          })
      )
      .then((resp) => this.props.navigation.navigate('AgregarFoto',{docId: resp.id}))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Regístrate en mi app</Text>
          <TextInput
            style={styles.input}
            placeholder="Dinos tu nombre"
            keyboardType="default"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Dinos tu email"
            keyboardType="email-address"
            value={this.state.mail}
            onChangeText={(text) => this.setState({ mail: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Crea una bio"
            value={this.state.minibio}
            onChangeText={(text) => this.setState({ minibio: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Dinos tu password"
            keyboardType="default"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />

          <Text style={styles.textLink}>
            ¿Tienes una cuenta?
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              Loguéate aquí!
            </TouchableOpacity>
          </Text>

          <TouchableOpacity
            onPress={() =>
              this.registrarUsuario(this.state.name, this.state.mail, this.state.password)
            }
            style={styles.btn}
          >
            <Text style={styles.textBtn}>¡Regístrame ahora!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 24,
    padding: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: 'purple',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  textBtn: {
    color: 'white',
    fontSize: 18,
  },
  textLink: {
    marginBottom: 24,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FormRegister;
