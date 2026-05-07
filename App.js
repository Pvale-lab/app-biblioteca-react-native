import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';


// Agora, 'Stack' contém os componentes '.Navigator' e '.Screen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Acervo da Biblioteca' }} 
        />
        <Stack.Screen 
          name="Edit" 
          component={EditScreen} 
          options={{ title: 'Gerenciar Livro' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}