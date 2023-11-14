import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import FormComentarios from '../components/FormComentarios';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haycoments: false,
      id: this.props.route.params.id,
      datos: '',
      comentario: '',
      comentarios: [],
    };
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.state.id)
      .onSnapshot((doc) =>
        this.setState(
          { datos: doc.data() },
          () => {
            if (this.state.datos.comentarios.length > 0) {
              this.setState({
                haycoments: true,
                comentarios: this.state.datos.comentarios.reverse(),
              });
            }
          }
        )
      );
  }

  actualizarComentario(texto) {
    this.setState(
      {
        comentario: texto,
      },
      () => console.log(this.state.comentario)
    );
  }

  onSubmit() {
    db.collection('posts')
      .doc(this.state.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          comentario: this.state.comentario,
        }),
      });
    this.setState({
      comentario: '',
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.haycoments ? (
          <FlatList
            data={this.state.comentarios}
            keyExtractor={(item) => item.createdAt.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentOwner}>{item.owner}</Text>
                <Text style={styles.commentText}>{item.comentario}</Text>
              </View>
            )}
          />
        ) : (
          <Text>Aun no hay comentarios, sé el primero en comentar</Text>
        )}
        <FormComentarios
          actuCom={(texto) => this.actualizarComentario(texto)}
          estCom={this.state.comentario}
        />
        {
          this.state.comentario == ''?
          <></>
          :
          <TouchableOpacity
          style={styles.publishButton}
          onPress={() => this.onSubmit()}
        >
          <Text style={styles.publishButtonText}>Publicar</Text>
        </TouchableOpacity>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  commentContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  commentOwner: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  publishButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  publishButtonText: {
    color: 'white',
  },
});
