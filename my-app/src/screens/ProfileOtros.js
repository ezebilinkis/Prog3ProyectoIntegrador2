import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios:[]
    }
  }

  componentDidMount(){
    db.collection('users').where('owner','==', this.props.route.params.email).onSnapshot((docs)=>{
      let perfil = []
      docs.forEach((doc) => {
        perfil.push({
          id:doc.id,
          data: doc.data()
        })
      })

      this.setState({
        usuarios : perfil
      })
    })
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View>
        <Text style={styles.miPerfilTxt}>Mi perfil:</Text>
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={ ( {item} ) => <View>
                <Text style={styles.datosMiPerfilTxt}>{item.data.name}</Text>
                <Text style={styles.datosMiPerfilTxt}>{item.data.minibio}</Text>
              </View>
               }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  signoutBtn:{ 
  backgroundColor: 'blue',
  padding: 10,
  borderWidth: 1,   
  alignItems: 'center',   
  justifyContent: 'center', 
  width: 150,  
  alignSelf: 'center'
},
signoutBtnText: {
  color: 'white',  
  fontSize: 16,   
  fontWeight: 'bold',  
},
miPerfilTxt:{
  color: 'black',
  fontSize: 25,
  fontWeight: 'bold',  
  alignItems: 'center',   
  justifyContent: 'center',
  alignSelf: 'center'


},
datosMiPerfilTxt:{
  fontSize:18,
  alignItems: 'center',   
  justifyContent: 'center',
  alignSelf: 'center'

}

})