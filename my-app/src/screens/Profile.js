import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import { auth, db } from '../firebase/config'
import Posteo from '../components/Posteo'
export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios:[],
      posteo: [],
      esUserLogueado: false
    }
  }

  componentDidMount(){
    
    db.collection('users').where('owner','==', auth.currentUser.email).onSnapshot((docs)=>{
      let perfil = []
      docs.forEach((doc) => {
        perfil.push({
          id:doc.id,
          data: doc.data()
        })
      })
      
      this.setState({
        usuarios : perfil
      }, ()=>console.log(this.state.usuarios))
    })
    db.collection('posts').where('owner','==', auth.currentUser.email).onSnapshot((docs)=>{
      let post = []
      docs.forEach((doc) => {
        post.push({
          id:doc.id,
          data: doc.data()
        })
      })
      
      this.setState({
        posteo : post
      }, ()=> console.log(this.state.posteo))
    })
    
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }

  borrarPosteo(item){
    db.collection('posts').doc(item.id).delete()
    .then(()=>alert('El posteo fue eliminado correctamente'))
    
  }


  render() {
    return (
      <ScrollView>
        
        <Text style={styles.miPerfilTxt}>Perfil</Text>
        {console.log(this.state.usuarios)}
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={ ( {item} ) => <View style={styles.container}>
                <Text style={styles.datosMiPerfilTxt}>Nombre de usuario: {item.data.name}</Text>
                <Text style={styles.datosMiPerfilTxt}>Minibio: {item.data.minibio}</Text>
                <Text style={styles.datosMiPerfilTxt}>Email: {item.data.owner}</Text>
                {
                  item.data.fotoPerfil == ''?
                  <></>
                  :
                  <Image source={{uri: item.data.fotoPerfil}} style = {styles.img}/>
                }
                <Text style={styles.datosMiPerfilTxt}>Cantidad de posteos: {this.state.posteo.length}</Text>
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
        
        <ScrollView >
          <FlatList
            data={this.state.posteo}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({ item })=> <View>
              <Posteo navigation={this.props.navigation} data={item.data} id={item.id}/>
                <TouchableOpacity onPress={()=> this.borrarPosteo(item)}>
                  <Text>Borrar Posteo</Text>
                </TouchableOpacity>
              </View>
              }
            
          />
        </ScrollView>
        
      </ScrollView>
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

},
img:{
  height: 300,
  width: 300
},
container:{
  alignSelf: 'center',
  flex: 1
}

})