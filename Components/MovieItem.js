
import React from 'react'
import { Animated, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getMoviePosterUrl } from '../API/TMDBAPI'
import Icon from 'react-native-vector-icons/Ionicons'

class MovieItem extends React.Component{
    
    animeSlideValue = new Animated.Value(500)
    _display_favorite() {
      if (this.props.is_favorite){
        return (
            <Icon name="heart" size={25} color="#CC0033"/>
          )
     }
    }
    componentDidMount(){
      this.slideIn()
    }
    slideIn() {
      Animated.timing(this.animeSlideValue, {
        toValue: 0,
        duration: 450,
        useNativeDriver: false
      }).start()
    }
    render() {
        const { movie, onPress } = this.props;
        return (
          <Animated.View style={{paddingLeft: this.animeSlideValue}}>
            <TouchableOpacity onPress={()=> onPress(movie.id)}>
              <View style={styles.main_container}>
                  <Image style={styles.image} source={{uri: getMoviePosterUrl(movie.poster_path)}}/>
                  <View style={styles.content_container}>
                      <View style={styles.header_container}>
                          {this._display_favorite()}
                          <Text style={styles.title_text}>{movie.title}</Text>
                          <Text style={styles.vote_text}>{movie.vote_average}</Text>
                          <Icon name="star" size={25} color="orange"/>
                      </View>
                      <Text style={styles.desc_text} numberOfLines={6}>{movie.overview}</Text>
                      <Text style={styles.date_text}>Release date {movie.release_date}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )
    }
}

export default MovieItem;

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#666666'
  },
  favorite_icon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  description_text: {
    flex: 6,
    margin:5,
    color: '#666666'
  },
  date_text: {
    flex: 1,
    margin: 5,
    textAlign: 'right',
    fontSize: 14
  }
})