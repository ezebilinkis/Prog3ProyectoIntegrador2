import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Posteo from '../components/Posteo'

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
        })
    })
    }


render() {
    return (
      <ScrollView>
        <FlatList
        data={this.state.posteos}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({ item })=> <Posteo navigation={this.props.navigation} data={item.data} id={item.id}/>
        }/>

      </ScrollView>
    )
  }
}