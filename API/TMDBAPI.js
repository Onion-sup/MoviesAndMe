
const API_TOKEN = 'd83cd3814095b0b526d0892a16c6b07b';

export function getMovies(searchText, page){
    var url = "https://api.themoviedb.org/3/search/movie?api_key="+API_TOKEN+"&query="+searchText+"&page="+page;
    return (
        fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
    )
}

export function getMoviePosterUrl(posterPath){
    return (
        "https://image.tmdb.org/t/p/w500/"+posterPath
    )
}
export function getTopMovies(page){
    var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_TOKEN + "&language=en-US&sort_by=popularity.desc&page=" + page
    return(
        fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error))
    )
}
export function getMovieDetails(movieId){
    var url = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+ API_TOKEN;

    return (
        fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
    )
}
