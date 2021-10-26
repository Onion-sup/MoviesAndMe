import { connect } from 'react-redux';
import React from 'react'
import MoviesList from './MoviesList';
import useDeepCompareEffect from 'use-deep-compare-effect'

class FavoriteMovies extends React.Component{
    render(){
        return(
            <MoviesList movies={this.props.favoriteMovies} navigation={this.props.navigation} onReachEnd={undefined}/>
        )
    }
}

const mapStateToProps = (state) => {
    return { favoriteMovies: state.favoriteMovies }
}

export default connect(mapStateToProps)(FavoriteMovies);