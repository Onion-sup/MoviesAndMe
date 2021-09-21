
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getMoviePosterUrl } from '../API/TMDBAPI'

class MovieItem extends React.Component{

    _display_favorite() {
      if (this.props.is_favorite){
        return (
          <Image style={styles.favorite_icon} source={require("../images/ic_favorite.png")}/>
        )
     }
    }

    render() {
        const { movie, onPress } = this.props;
        return (
          <TouchableOpacity onPress={()=> onPress(movie.id)}>
            <View style={styles.main_container}>
                <Image style={styles.image} source={{uri: getMoviePosterUrl(movie.poster_path)}}/>
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._display_favorite()}
                        <Text style={styles.title_text}>{movie.title}</Text>
                        <Text style={styles.vote_text}>{movie.vote_average}</Text>
                    </View>
                    <Text style={styles.desc_text} numberOfLines={6}>{movie.overview}</Text>
                    <Text style={styles.date_text}>Release date {movie.release_date}</Text>
                </View>
            </View>
            </TouchableOpacity>
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
    fontSize: 26,
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