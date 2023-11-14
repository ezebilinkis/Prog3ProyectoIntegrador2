import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import FormSearch from '../components/FormSearch';
import { db, auth } from '../firebase/config';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuariosEncontrados: [],
            backup: [],
            consulta: '',
        };
    }

    componentDidMount() {
        db.collection('users')
            .onSnapshot((docs) => {
                let listaUsuarios = [];
                docs.forEach((doc) => {
                    listaUsuarios.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    usuariosEncontrados: listaUsuarios,
                    backup: listaUsuarios,
                });
            });
    }

    Filtro(name) {
        let usuariosFiltrados = this.state.backup.filter((elm) =>
            elm.data.name.toLowerCase().includes(name.toLowerCase())
        );
        this.setState({
            usuariosEncontrados: usuariosFiltrados,
        });
    }

    actualizar(input) {
        this.setState({
            consulta: input,
        });
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
                            data={this.state.usuariosEncontrados}
                            renderItem={({ item }) => (
                                <View style={styles.itemContainer}>
                                  <Text style={styles.itemText}></Text> {/*no se que poner*/}
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={styles.letraBuscador}>{this.state.consulta} no existe</Text>
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
