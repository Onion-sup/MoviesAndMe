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
import topMovies from './Components/topMovies';

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
      <Stack.Screen name="FavoriteMovies" component={FavoriteMovies}/>
      <Stack.Screen name="MovieDetails" component={MovieDetails}/>
  </Stack.Navigator>
  )
}
function topMoviesToMovieDetailsNavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="TopMovies" component={topMovies}/>
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
                tabBarIcon: ({focused, color, size}) => {
                if (focused){
                  color = "black"
                }
                else{
                  color = "#B3B6B7"
                }
                let iconName
                if (route.name === "SearchTab"){
                  iconName = "search"
                }
                else if (route.name == "FavoriteMoviesTab"){
                  iconName = "heart"
                }
                else if (route.name == "NewMoviesTab"){
                  iconName = "ribbon"
                }
                return <Icon name={iconName} size={size} color={color}/>
                }
              })
          }>
          <Tab.Screen name="SearchTab" component={searchToMovieDetailsNavigation}/>
          <Tab.Screen name="FavoriteMoviesTab" component={favoriteMoviesToMovieDetailsNavigation}/>
          <Tab.Screen name="NewMoviesTab" component={topMoviesToMovieDetailsNavigation}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}