import React from 'react'
import { FlatList } from 'react-native'
import MovieItem from './MovieItem';
import { isIDInArray } from '../utils/functions';
import { connect } from "react-redux"
import { Text, View } from 'react-native';

class MoviesList extends React.Component{

    _is_favorite(movie){
        return isIDInArray(this.props.favoriteMovies, movie.id)
    }
    onPress(movieId){
        this.props.navigation.navigate('MovieDetailsStack', { movieId: movieId })
    }

    render(){
        const { movies, onReachEnd } = this.props;
        return(
            <View>
                
                <FlatList
                    data = {movies}
                    extraData = {this.props.favoriteMovies}
                    renderItem = {({item}) => <MovieItem movie={item} is_favorite={this._is_favorite(item)} onPress={(movieId) => {this.onPress(movieId)}}/>}
                    keyExtractor = {item => item.id.toString()}
                    onEndReachedThreshold={1}
                    onEndReached = {onReachEnd}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { favoriteMovies: state.favoriteMovies }
}
export default connect(mapStateToProps)(MoviesList);

