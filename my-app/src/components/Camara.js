import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

export default class Camara extends Component{
    constructor(props){
        super(props);
        this.state = {
            permiso: false,
            foto: '',
            mostrarCamara: true
        }
        this.metodosDeCamara = null
    }
    componentDidMount(){
        console.log('permisos');
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permiso: true
            })
        })
        .catch(e => console.log(e))
    }
    takePicture(){
        this.metodosDeCamara.takePictureAsync()
         .then(photo => {
            this.setState({
              foto: photo.uri, //Es una uri interna temporal de la foto.
              mostrarCamara: false
            })
        })
      }
      
      savePhoto(){
        fetch(this.state.foto)
         .then(res=>res.blob())
         .then(image =>{
           const ref=storage.ref(`fotos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                         })
                 })
         })
         .catch(e=>console.log(e))
       }
       clearPhoto(){
        this.setState({
            mostrarCamara: true,
            foto: ''
        })
    }
       
    render(){
        return(
            <View style= {styles.container}>
               {
                    this.state.permiso && this.state.mostrarCamara?
                <>
                    <Camera
                        style= {styles.camara}
                        type={Camera.Constants.Type.back}
                        ref={(metodosDeCamara)=> this.metodosDeCamara = metodosDeCamara}
                    />

                    <TouchableOpacity 
                        onPress={()=>this.takePicture()}>
                        <Text>Shoot</Text>
                    </TouchableOpacity>
                </>
                : this.state.permiso && this.state.mostrarCamara === false?
                <>
                    <Image style={styles.img}
                        source={ {uri:this.state.foto} }
                        resizeMode={'contain'}/>
                    
                    <TouchableOpacity onPress={()=>this.savePhoto()}>
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.clearPhoto()}>
                        <Text>Rechazar</Text>
                    </TouchableOpacity>
                </>
                :
                    <Text>No tienes permisos para usar la camara</Text>
               } 
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camara: {
      flex: 1,
      width: 400,
      height: 600
    },
    img: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });