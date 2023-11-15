import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import FormSearch from '../components/FormSearch';
import { db, auth } from '../firebase/config';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            backup: [],
            consulta: '',
        };
    }

componentDidMount() {
  db.collection('users').onSnapshot((docs) => {
    let usuarios = [];
    docs.forEach((doc) => {
      usuarios.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    this.setState({
      usuarios: usuarios,
      backup: usuarios,
    });
  });
}

Filtro(name) {
  let usuariosFiltrados = this.state.backup.filter((elm) =>
    elm.data.name.toLowerCase().includes(name.toLowerCase())
  );
  this.setState({
    usuarios: usuariosFiltrados,
  });
}

actualizar(input) {
  this.setState({
    consulta: input,
  });
    }
mostrarPerfil(){
  owner == auth.currentUser.email ?
  this.props.navigation.navigate('Profile')
  :
  this.props.navigation.navigate('ProfileOtros',{user: owner})
}
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Buscá usuarios!</Text>

                <FormSearch
                    Filtro={(name) => this.Filtro(name)}
                    actualizar={(consulta) => this.actualizar(consulta)}
                />
                {this.state.consulta != '' ? (
                    this.state.usuariosEncontrados.length != 0 ? (
                        <FlatList
                            data={this.state.usuarios}
                            renderItem={({ item }) => (
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity onPress={() => this.irAlPerfil(item.data.owner)}>
                                    <Text style={styles.itemText}>{item.data.name}</Text>
                                    <Text style={styles.itemText}>{item.data.owner}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    ) : (
                        <Text style={styles.letraBuscador}>no corresponde a un usuario existente</Text>
                    )
                ) : (
                    <Text style={styles.letraBuscador}>Aquí apareceran los resultados de búsqueda</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    tituloBuscador: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 20,
    },
    letraBuscador: {
        fontSize: 20,
        margin: 13,
        color:'white'
    },
});
