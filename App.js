import React from 'react';
import Search from './Components/Search'
import FavoriteMovies from './Components/FavoriteMovies';
import MovieDetails from './Components/MovieDetails'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import store from './store/store'
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

function moviesListToMmovieDetailsNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="MovieDetails" component={MovieDetails}/>
  </Stack.Navigator>
  )
}

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Search_" component={moviesListToMmovieDetailsNavigation}/>
          <Tab.Screen name="FavoriteMovies" component={FavoriteMovies}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

