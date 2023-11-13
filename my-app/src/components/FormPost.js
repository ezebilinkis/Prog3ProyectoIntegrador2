import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../firebase/config';

export default class FormPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        descripcion: ''
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Cargar Posteo</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripcion del post"
            keyboardType="email-address"
            value={this.props.estadoDescripcion}
            onChangeText={(descripcion)=> this.props.actuDesc(descripcion)}
          />
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

});