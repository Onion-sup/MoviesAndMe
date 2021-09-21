import React from 'react'
import { getMovies } from '../API/TMDBAPI.js'
import { StyleSheet, View, TextInput, ActivityIndicator, FlatList } from 'react-native'
import MovieItem from './MovieItem'
import { connect } from "react-redux"
import { isIDInArray } from "../utils/functions"
import { MoviesList } from './MoviesList.js'

class Search extends React.Component{
    state = {
        movies: [],
        isLoading: false,
        searchText: ""
    }
    page = 0
    _updateSearchedMovies(searchText) {
        this.setState({ isLoading: true });
        if (searchText.length > 0){
            this.page ++;
            getMovies(searchText, this.page)
            .then(data => {
                var newPageMovies = [];
                if (this.page <= data.total_pages ){
                    var moviesIdArray = [];
                    for (let movie of this.state.movies){
                        moviesIdArray.push(movie.id);
                    }
                    newPageMovies = data.results.filter(result => !moviesIdArray.includes(result.id));
                    this.setState({
                        movies: [...this.state.movies, ...newPageMovies],
                        searchText: searchText
                    });
                }
            })
        }
        else {
            this.setState({ movies: [], searchText: "" })
        }
        this.setState({ isLoading: false });
    }
    _displayLoading(){
        if (this.state.isLoading) {
            return(
            <View style={styles.loading_container}>
                <ActivityIndicator size="large"/>
            </View>
            )
        }
    }
    _is_favorite(movie){
        return isIDInArray(this.props.favoriteMovies, movie.id)
    }
    onPress(movieId){
        this.props.navigation.navigate('MovieDetails', { movieId: movieId })
    }
    render(){
        console.log("[Search][render] this.props.favoriteMovies.length", this.props.favoriteMovies.length)
        return (
            <View>
                <TextInput style={styles.textinput} placeholder = "Title" onChangeText={(text)=>{this.page=0; this.state.movies=[]; this._updateSearchedMovies(text)}} />
                {this._displayLoading()}
                <MoviesList movies={this.state.movies}/>
                {/* <FlatList
                    data = {this.state.movies}
                    extraData = {this.props.favoriteMovies}
                    renderItem = {({item}) => <MovieItem movie={item} is_favorite={this._is_favorite(item)} onPress={(movieId) => {this.onPress(movieId)}}/>}
                    keyExtractor = {item => item.id.toString()}
                    onEndReachedThreshold={1}
                    onEndReached = {()=> {this._updateSearchedMovies(this.state.searchText)}}
                */}
                
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return { favoriteMovies: state.favoriteMovies }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        fontSize : 20,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
      }
})
