import React from 'react'
import { getMovies } from '../API/TMDBAPI.js'
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native'
import MoviesList from './MoviesList.js'

class Search extends React.Component{
    state = {
        movies: [],
        isLoading: false,
        searchText: ""
    }
    page = 0
    _updateSearchedMovies(searchText) {
        if (searchText.length > 0){
            this.setState({ isLoading: true });
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
                this.setState({ isLoading: false });
            })
        }
        else {
            this.setState({ movies: [], searchText: "" })
        }
    }
    _displayLoading(){
        if (this.state.isLoading) {
            return(
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" color="#B0C4DE"/>
            </View>
            )
        }
    }
    
    render(){
        return (
            <View>
                <TextInput style={styles.textinput} placeholder = "Title" onChangeText={(text)=>{this.page=0; this.state.movies=[]; this._updateSearchedMovies(text)}} />
                {this._displayLoading()}
                <MoviesList movies={this.state.movies} onReachEnd={() => this._updateSearchedMovies(this.state.searchText)} navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default Search;

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
        bottom: 0
      }
})
