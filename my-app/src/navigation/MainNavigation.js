import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';


import Register from '../screens/Register';
import Login from '../screens/login';
import Comments from '../screens/Comments';
import ProfileOtros from '../screens/ProfileOtros';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen 
          name='Register' 
          component={Register}
          options={{
            headerShown: false
          }}
          />
        <Stack.Screen 
        name='Login' 
        component={Login}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen 
        name='TabNavigation' 
        component={TabNavigation}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
          name='Comments'
          component={Comments}
          //options={
            //headerShown: false
          //}
        />
        <Stack.Screen 
          name='Perfil' 
          component={ProfileOtros}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}