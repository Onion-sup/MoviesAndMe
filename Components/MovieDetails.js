import React from "react";
import { getMovieDetails, getMoviePosterUrl } from "../API/TMDBAPI";
import { StyleSheet, Share, View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { isIDInArray } from '../utils/functions'
import numeral from 'numeral'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { EasingNode } from "react-native-reanimated";

class MovieDetails extends React.Component{
    favIconShrinkSize = 40
    favIconSpreadSize = 60

    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            isLoading: true,
        }
        this.animFavIcon = new Animated.Value(this.favIconShrinkSize)
    }

    favIconSpread() {
        Animated.timing(this.animFavIcon, {
            toValue: this.favIconSpreadSize,
            duration: 400,
            easing: EasingNode.bounce
        }).start()
    }
    favIconShrink() {
        Animated.timing(this.animFavIcon, {
            toValue: this.favIconShrinkSize,
            duration: 400,
            easing: EasingNode.bounce
        }).start()
    }
    componentDidMount(){
        getMovieDetails(this.props.route.params.movieId)
        .then((movie) => {this.setState({
            movie: movie,
            isLoading: false,
        })
        const isFavorite = isIDInArray(this.props.favoriteMovies, this.state.movie.id)
        if (!isFavorite){
            this.animFavIcon.setValue(this.favIconShrinkSize)
        }
        else {
            this.animFavIcon.setValue(this.favIconSpreadSize)
        }})
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => Share.share( {title: this.state.movie.title, message: this.state.movie.overview} )}>
                    <Icon name="share-social" size={40} color="grey"/>
                </TouchableOpacity>)
          })
    }
    _toggleFavorite() {
        var { favoriteMovies } = this.props
        var isFavorite = isIDInArray(favoriteMovies, this.state.movie.id)
        if (!isFavorite){
            console.log("[_toggleFavorite] is_favorite", isFavorite)
            this.favIconSpread()
        }
        else {
            this.favIconShrink()
        };
        const action = { type: "TOOGLE_FAVORITE", value: this.state.movie }
        this.props.dispatch(action)
        this.forceUpdate()
    }
    _diplayLoading(){
        if (this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color="#B0C4DE"/>
                </View>
            )
        }
    }
    _displayMovieDetails(){
        const { movie } = this.state
        if (movie){
            return (
                <ScrollView style={styles.main_container}>
                    <Image style={styles.movie_image} source={{uri: getMoviePosterUrl(movie.poster_path)}}/>
                    <TouchableOpacity style={styles.favorite_touchable_logo} onPress={() => this._toggleFavorite()}>
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
                <Animated.Image style={{width:this.animFavIcon, height:this.animFavIcon}} source={require("../images/ic_favorite.png")}/>
            )
        }
        else {
            return (
                <Animated.Image style={{width:this.animFavIcon, height:this.animFavIcon}} source={require("../images/ic_favorite_border.png")}/>
            )
        }
    }
    render() {
        return(
            <View>
                {this._diplayLoading()}
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
      top: 0,
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
