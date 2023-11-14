import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
import Posteo from '../components/Posteo'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios:[],
      posts: []
      
    }
  }

  componentDidMount(){
    db.collection('users').where('owner','==',auth.currentUser.email).onSnapshot((docs)=>{
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
    db.collection('posts').onSnapshot((postDocs) => {
      let postsData = []
      postDocs.forEach((doc) => {
        postsData.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({ posts: postsData })
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
                <Text style={styles.datosMiPerfilTxt}>{item.data.owner}</Text>
              </View>
               }
        />
        
        <View>
          <TouchableOpacity
          style={styles.signoutBtn}
          onPress={()=> this.logout()}
          >
            <Text style={styles.signoutBtnText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

    
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