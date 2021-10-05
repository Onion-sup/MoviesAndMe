import React from 'react';
import Search from './Components/Search'
import FavoriteMovies from './Components/FavoriteMovies';
import MovieDetails from './Components/MovieDetails'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import store from './store/store'
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator();

function searchToMovieDetailsNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="MovieDetails" component={MovieDetails}/>
  </Stack.Navigator>
  )
}
function favoriteMoviesToMovieDetailsNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="favoriteMovies" component={FavoriteMovies}/>
      <Stack.Screen name="MovieDetails" component={MovieDetails}/>
  </Stack.Navigator>
  )
}
export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => (
              { 
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({color, size}) => {
                let iconName
                if (route.name === "SearchTab"){
                  iconName = "search"
                }
                else if (route.name == "FavoriteMoviesTab"){
                  iconName = "heart"
                }
                return <Icon name={iconName} size={size} color={color}/>
                }
              })
          }>
          <Tab.Screen name="SearchTab" component={searchToMovieDetailsNavigation}/>
          <Tab.Screen name="FavoriteMoviesTab" component={favoriteMoviesToMovieDetailsNavigation}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}