import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe suas telas aqui
import Login from './src/view/Login';
import Index from './src/view/Index';

//import AuthProvider from './src/control/auth'; // Importe o AuthProvider

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
               <Stack.Screen 
                name="Index"
                component={Index}
                options={{ headerShown: false }}
              />
             
            </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;