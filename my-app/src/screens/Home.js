import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          posteos: []
        }
    }

    componentDidMount(){
      db.collection('posts')
      .onSnapshot(docs => {
        let arrPosteos = []
        docs.forEach(doc => {
            arrPosteos.push({
                id: doc.id,
                data: doc.data()
            })
        })

        this.setState({
           posteos: arrPosteos 
        }, ()=> console.log(this.state.posteos))
    })
    }


render() {
    return (
      <Text>
        Este es el home
      </Text>
    )
  }
}