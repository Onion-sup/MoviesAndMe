import React from 'react';
import Search from './Components/Search'
import MovieDetails from './Components/MovieDetails'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import store from './store/store'
import { Provider } from 'react-redux'

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="MovieDetails" component={MovieDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
