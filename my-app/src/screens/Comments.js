import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import FormComentarios from '../components/FormComentarios';

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
          haycoments: false,
          id: this.props.route.params.id,
          datos: '',
          comentario: '',
          comentarios: []
        }
    }
    componentDidMount(){
        db.collection('posts').doc(this.state.id).onSnapshot((doc)=>this.setState(
          {datos: doc.data()}, 
          ()=>{
            if(this.state.datos.comentarios.length > 0){
            this.setState({
              haycoments: true,
              comentarios: this.state.datos.comentarios.reverse()
            })
          }

          }))
        
    }
    actualizarComentario(texto){
      this.setState({
        comentario : texto
      },()=> console.log(this.state.comentario))
    }
    onSubmit(){
        db
        .collection('posts')
        .doc(this.state.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: this.state.comentario
            })
        })
        this.setState({
          comentario: '',
        })
    }
render() {
    return (
      <ScrollView>
        {
          this.state.haycoments?
          <FlatList
                    data={this.state.comentarios}
                    keyExtractor = {(item)=> item.createdAt.toString()}
                    renderItem={({item})=> <View>
                        <Text>{item.owner}</Text>
                        <Text>{item.comentario}</Text>
                    </View> }
                />
          :
          <Text>Aun no hay comentarios, se el primero en comentar</Text>
        }
      <FormComentarios actuCom = {(texto)=>this.actualizarComentario(texto)} estCom = {this.state.comentario}/>
      <TouchableOpacity
              onPress={()=> this.onSubmit({
                  comentario: this.state.comentario,
              })}
            >
                <Text>
                    Publicar
                </Text>
            </TouchableOpacity> 
      </ScrollView>
    )
  }
}