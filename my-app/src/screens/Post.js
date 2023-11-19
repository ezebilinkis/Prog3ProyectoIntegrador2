import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import FormPost from '../components/FormPost';
import Camara from '../components/Camara';


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
          descripcion: '',
          urlFoto: '',
          mostrarCamara: true,
          descFoto: '',
        }
    }


  actualizarDescripcion(texto){
    this.setState({
      descripcion : texto
    },()=> console.log(this.state.descripcion))
  }
  onSubmit({
    descripcion,
    fotoUrl
  }){
    if(fotoUrl === '' || descripcion === ''){
      alert('Debe agregar una imagen y rellenar la descripcion, recuerde tocar aceptar en la foto. ')
    }
    else{
      db.collection('posts').add(
      {
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        fotoUrl: fotoUrl,
        descripcion: descripcion,
        likes:[],
        comentarios: []
      }
    )
    .then(()=> this.props.navigation.navigate('Home'))
    .catch((e) => console.log(e))
    }
    

  }

  onImageUpload(url) {
    this.setState({
        mostrarCamara: false,
        urlFoto: url
    });
}


render() {
    return (
      <View style={styles.container}>  
        <FormPost 
        actuDesc = {(texto)=> this.actualizarDescripcion(texto)} 
        estadoDescripcion = {this.state.descripcion} />
      {/* Camara */}
      <Camara onImageUpload={(url)=>this.onImageUpload(url)}/>
         
        <TouchableOpacity
              onPress={()=> this.onSubmit({
                  descripcion: this.state.descripcion,
                  fotoUrl: this.state.urlFoto
              })}
            >
                <Text style={styles.enviar}> Enviar</Text>
            </TouchableOpacity> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  enviar: {
    color:'black',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Monserrat',
    padding: 10,
    fontWeight: 'bold',
    
  }
  
})
