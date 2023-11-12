import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../firebase/config';

export default class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
    };
  }

  loguearUsuario(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.navigation.navigate('TabNavigation');
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Inicia sesión en mi app</Text>
          <TextInput
            style={styles.input}
            placeholder="Dinos tu email"
            keyboardType="email-address"
            value={this.state.mail}
            onChangeText={(text) => this.setState({ mail: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Dinos tu password"
            keyboardType="default"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
          >
            <Text style={styles.textBtn}>Iniciar sesión</Text>
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
});
