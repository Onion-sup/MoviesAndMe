import { connect } from 'react-redux';
import React from 'react'
import MoviesList from './MoviesList';
import { getTopMovies } from '../API/TMDBAPI';
import { displayLoading } from '../utils/functions';
import { StyleSheet, View } from 'react-native';

class TopMovies extends React.Component{
    state = {
        movies: [],
        isLoading: false
    }
    page = 0
    getTopMovies(){
        this.setState({isLoading: true})
        getTopMovies()
        .then(data => {
            this.setState({
                isLoading: false,
                movies: data.results
            })
        })
    }
    componentDidMount(){
        this.setState({movies: []})
        this._updateTopdMovies()
    }
    _updateTopdMovies() {
        this.setState({ isLoading: true });
        this.page ++;
        getTopMovies(this.page)
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
                });
            }
            this.setState({ isLoading: false });
        })

    }
    render(){
        return(
            <View>
                {this.state.isLoading ? displayLoading(styles.loading_container) : null}
                <MoviesList movies={this.state.movies} navigation={this.props.navigation} onReachEnd={()=>this._updateTopdMovies()}/>
            </View>
        )
    }
}

export default TopMovies;


const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0
      }
})