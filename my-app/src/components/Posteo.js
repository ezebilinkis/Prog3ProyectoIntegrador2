import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import {FontAwesome} from '@expo/vector-icons'

export default class Posteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: this.props.data.likes.includes(auth.currentUser.email),
      comentarios: this.props.data.comentarios.reverse(),
    };
  }
  componentDidMount(){
    if (this.state.comentarios.length > 4) {
      this.setState({
        comentarios: this.state.comentarios.slice(0,4)
      }, ()=>console.log(this.state.comentarios))
    }
    console.log(this.state.comentarios);
  }
  likes() {
    if (this.state.like) {
      db.collection('posts')
        .doc(this.props.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
        .then(() => {
          this.setState({
            like: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      db.collection('posts')
        .doc(this.props.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
        .then(() => {
          this.setState({
            like: true,
          });
        })
        .catch((err) => console.log(err));
    }
  }
  render() {
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Perfil', {email: this.props.data.owner})}}>
          <Text style={styles.ownerText}>{this.props.data.owner}</Text>
        </TouchableOpacity>
        
        <Image
          style={styles.imgCard}
          source={{
            uri: this.props.data.fotoUrl,
          }}
          resizeMode='contain'
        />
        <Text style={styles.descriptionText}>{this.props.data.descripcion}</Text>
        {
        this.state.like ?
        <TouchableOpacity onPress={() => this.likes()} style={styles.likeButton}>
          <FontAwesome name='heart' color='red' size={30}/>
          <Text style={styles.likeButtonText}>{this.props.data.likes.length}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => this.likes()} style={styles.likeButton}>
          <FontAwesome name='heart' color='red' size={30}/>
          <Text style={styles.likeButtonText}>{this.props.data.likes.length}</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Comments', { id: this.props.id })}
          style={styles.commentButton}
        >
          <Text style={styles.commentButtonText}>Comentarios: {this.props.data.comentarios.length}</Text>
        </TouchableOpacity>
        <Text style={styles.ownerText}>Ultimos comentarios: </Text>
      {
        this.state.comentarios.length > 0?
        <FlatList
            data={this.state.comentarios}
            keyExtractor={(item) => item.createdAt.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.ownerText}>{item.owner}</Text>
                <Text style={styles.ownerText}>{item.comentario}</Text>
              </View>
            )}
          />
        :
        <Text style={styles.ownerText}>Aun no se hicieron comentarios </Text>
      }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'black',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: '60%',
    alignSelf: 'center',
  },
  ownerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imgCard: {
    height: 150,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'center',
  },
  likeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  likeButtonText: {
    color: 'white',
  },
  commentButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  commentButtonText: {
    color: 'white',
  },
});
