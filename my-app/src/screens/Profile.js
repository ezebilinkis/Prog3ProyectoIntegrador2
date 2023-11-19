import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, Alert, Modal } from 'react-native';
import { auth, db } from '../firebase/config';
import Posteo from '../components/Posteo';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    usuarios: [],
    posteo: [],
    esUserLogueado: false,
    modalVisible: false,
    postToDelete: null,
  };
}

componentDidMount() {
  db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
    let perfil = [];
    docs.forEach((doc) => {
      perfil.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    this.setState({
      usuarios: perfil,
    }, () => console.log(this.state.usuarios));
  });

  db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
    let post = [];
    docs.forEach((doc) => {
      post.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    this.setState({
      posteo: post,
    }, () => console.log(this.state.posteo));
  });
}

logout() {
  auth.signOut();
  this.props.navigation.navigate('Login');
}

borrarPosteo(item) {
  db.collection('posts').doc(item.id).delete()
  .then(() => alert('El posteo fue eliminado correctamente'));
}

confirmarBorrarPosteo(item) {
  this.setState({ modalVisible: true, postToDelete: item });
}

realizarBorrarPosteo() {
  this.borrarPosteo(this.state.postToDelete);
  this.setState({ modalVisible: false, postToDelete: null });
}

cancelarBorrarPosteo() {
  this.setState({ modalVisible: false, postToDelete: null });
}

render() {
  return (



      <ScrollView style={styles.profileContainer}>
        <Text style={styles.miPerfilTxt}>Perfil</Text>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.datosMiPerfilTxt}>Nombre de usuario: {item.data.name}</Text>
              <Text style={styles.datosMiPerfilTxt}>Minibio: {item.data.minibio}</Text>
              <Text style={styles.datosMiPerfilTxt}>Email: {item.data.owner}</Text>
      
              {item.data.fotoPerfil == '' ? (
                <></>
              ) : (
                <Image source={{ uri: item.data.fotoPerfil }} style={styles.img} />
              )}
              <Text style={styles.datosMiPerfilTxt}>Cantidad de posteos: {this.state.posteo.length}</Text>
            </View>
          )}
        />

        <View>
          <TouchableOpacity style={styles.signoutBtn} onPress={() => this.logout()}>
            <Text style={styles.signoutBtnText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

      <ScrollView>
        <FlatList
          data={this.state.posteo}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Posteo navigation={this.props.navigation} data={item.data} id={item.id} />
              <TouchableOpacity onPress={() => this.confirmarBorrarPosteo(item)}>
                <Text style= {styles.borrarPosteo}>Borrar Posteo</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
      <Modal 
      animationType="slide" 
      transparent={true}  
      visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Estás seguro de que quieres eliminar este posteo?
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.realizarBorrarPosteo()}
            >
              <Text style={styles.textStyle}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.cancelarBorrarPosteo()}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>

  );
}
}

const styles = StyleSheet.create({
    profileContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: '60%',
    alignSelf: 'center',
  },
  signoutBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    alignSelf: 'center',
  },
  signoutBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  miPerfilTxt: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Monserrat',
    padding: 10,


  },
  datosMiPerfilTxt: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Monserrat',
    padding: 10,

  },
  img: {
    height: 300,
    width: 300,
  },
  container: {
    alignSelf: 'center',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  borrarPosteo:{
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Monserrat',
    padding: 10,
    fontWeight: 'bold',
  }
});
