import { View, Text } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home'
import Search from '../screens/search';
import Profile from '../screens/Profile'
import Post from '../screens/post';

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false
        }}
        />
        <Tab.Screen 
        name='Post' 
        component={Post}
        options={{
            headerShown:false
        }}
        />
        <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
            headerShown:false
        }}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
            headerShown:false
        }}
        />
    </Tab.Navigator>
  )
}