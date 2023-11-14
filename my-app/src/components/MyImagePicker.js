import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'
export default class MyImagePicker extends Component {
  constructor(props){
    super(props)
    this.state = {
        imagenCargada: ''
    }
  }

  activarPicker(){
    ImagePicker.launchImageLibraryAsync()
    .then(image => this.setState({
        imagenCargada: image.assets[0].uri
    }))
    .catch(e=> console.log(e))
  }
  aceptarImagen(){
    fetch(this.state.imagenCargada)
    .then(img => img.blob())
    .then(imagen => {
        let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
        ref.put(imagen)
        .then(()=>{
            ref.getDownloadURL()
            .then((url)=>{
                this.props.actualizarEstadoFotoDePerfil(url)
            })
        })
    })
    .catch(e => console.log(e))
  }

  render() {
    return (
      <View>
        
        {
            this.state.imagenCargada !== ''?
            <>
            <Image
            source={{uri: this.state.imagenCargada}}
            style = {styles.img}
            />
            <TouchableOpacity onPress={()=> this.aceptarImagen()}>
                <Text >Aceptar imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({imagenCargada: ''})}>
                <Text >Rechazar imagen</Text>
            </TouchableOpacity>
            </>
            :
            <>
            <TouchableOpacity onPress={()=> this.activarPicker()}>
                <Text >Seleccionar Foto</Text>
            </TouchableOpacity>
            </>
        }
        
      </View>
    )
  }
}


const styles = StyleSheet.create({
    img:{
        height: 200
    }
})