import React from 'react'
import { Text, View } from 'react-native';

export class MoviesList extends React.Component{

    
    render(){
        return(
            <Text>
                {console.log("[MoviesList][render]",this.props.movies)}
                Movies list: {this.props.movies.map((movie) => movie.title).join('\n')}
            </Text>
            // <View>
            //     <TextInput style={styles.textinput} placeholder = "Title" onChangeText={(text)=>{this.page=0; this.state.movies=[]; this._updateSearchedMovies(text)}} />
            //     <FlatList
            //         data = {this.state.movies}
            //         extraData = {this.props.favoriteMovies}
            //         renderItem = {({item}) => <MovieItem movie={item} is_favorite={this._is_favorite(item)} onPress={(movieId) => {this.onPress(movieId)}}/>}
            //         keyExtractor = {item => item.id.toString()}
            //         onEndReachedThreshold={1}
            //         onEndReached = {()=> {this._updateSearchedMovies(this.state.searchText)}}
            //     />
            // </View>
        )
    }
}