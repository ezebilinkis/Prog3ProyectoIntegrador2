import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase';

export default class Posteo extends Component {
    constructor(props){
        super(props)
        this.state ={
            like: this.props.data.likes.includes(auth.currentUser.email)
        }
    }
    
  likes(){
    if(this.state.like){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                like: false
            })
        })
        .catch((err) => console.log(err))
    }
    else{
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then((resp) =>{
                this.setState({
                    like: true
                })
            })
            .catch((err) => console.log(err))
    }
    }
    
  render(){
    return (
        <View>
            <Text>{this.props.data.owner}</Text>
            <Image
                style={styles.imgCard}
                source={
                    {
                        uri: this.props.data.fotoUrl
                    }
                }
                resizeMode='contain'
            />
            <Text>{this.props.data.descripcion}</Text>
            <TouchableOpacity onPress={()=>this.likes()}>
                <Text>Likes: {this.props.data.likes.length}</Text>
            </TouchableOpacity>
        </View>
  )
}
}

const styles = StyleSheet.create({
    imgCard:{
        height:150
    }
})