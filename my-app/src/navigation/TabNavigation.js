import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Post from '../screens/post'
import Search from '../screens/Search'
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size= {15} color='black'/>
        }}
        />
        <Tab.Screen 
        name='Post' 
        component={Post}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='camera' size= {15} color='black'/>

        }}
        />
        <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='search' size= {15} color='black'/>

        }}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='user' size= {15} color='black'/>

        }}
        />
    </Tab.Navigator>
  )
}