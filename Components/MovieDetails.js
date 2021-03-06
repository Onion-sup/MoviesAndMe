import React from "react";
import { getMovieDetails, getMoviePosterUrl } from "../API/TMDBAPI";
import { StyleSheet, Share, View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { displayLoading, isIDInArray } from '../utils/functions'
import numeral from 'numeral'
import Icon from 'react-native-vector-icons/Ionicons'

class MovieDetails extends React.Component{
    favIconShrinkSize = 40
    favIconSpreadSize = 60

    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            isLoading: true,
        }
    }

    componentDidMount(){
        getMovieDetails(this.props.route.params.movieId)
        .then((movie) => {this.setState({
            movie: movie,
            isLoading: false,
        })}
        )
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => Share.share( {title: this.state.movie.title, message: this.state.movie.overview} )}>
                    <Icon name="share-social" size={40} color="grey"/>
                </TouchableOpacity>)
          })
    }
    _toggleFavorite() {
        const action = { type: "TOOGLE_FAVORITE", value: this.state.movie }
        this.props.dispatch(action)
        this.forceUpdate()
    }

    _displayMovieDetails(){
        const { movie } = this.state
        if (movie){
            return (
                <ScrollView style={styles.main_container}>
                    <Image style={styles.movie_image} source={{uri: getMoviePosterUrl(movie.poster_path)}}/>
                    <TouchableOpacity style={styles.favorite_touchable_logo} onPressIn={() => this._toggleFavorite()}>
                    {this._displayIsFavoriteImage()}
                    </TouchableOpacity>
                        <Text style={styles.movie_title}>{movie.title}</Text>
                        <Text style={styles.movie_description}>{movie.overview}</Text>
                        <Text style={styles.movie_info}>
                            release date: {movie.release_date}{"\n"}
                            Rating: {JSON.stringify(movie.vote_average)}/10{"\n"}
                            Genre(s): {movie.genres.map((genre) => genre.name).join(' / ')}{"\n"}
                            Budget: {numeral(movie.budget).format('0,0[.]00 $')}{"\n"}
                            Original language: {movie.original_language}{"\n"}
                            Production Companies: {movie.production_companies.map(company => company.name).join(' / ')}
                        </Text> 
                </ScrollView>
            )
        }
    }
    _displayIsFavoriteImage() {
        const { movie } = this.state
        var { favoriteMovies } = this.props
        var isFavorite = isIDInArray(favoriteMovies, movie.id)
        console.log()
        if (isFavorite){
            return (
                <Icon name="heart" size={40} color="#CC0033"/>
            )
        }
        else {
            return (
                <Icon name="heart-outline" size={40} color="#B3B6B7"/>
            )
        }
    }
    render() {
        return(
            <View>
                {this.state.isLoading ? displayLoading(styles.loading_container): null}
                {this._displayMovieDetails()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { favoriteMovies: state.favoriteMovies }
}
export default connect(mapStateToProps)(MovieDetails);
const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        marginBottom: 5
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    favorite_touchable_logo: {
        alignItems: 'center',
    },
    movie_image: {
        height: 180,
    },
    movie_description: {
        fontStyle: "italic",
        fontSize: 16,
        margin: 5
    },
    movie_title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: "bold"
    },
    movie_info: {
        fontSize: 10,
        fontWeight: "bold",
        marginLeft: 5
    }
})
