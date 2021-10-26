import { isIDInArray } from '../../utils/functions'

const initialState = { favoriteMovies: [] }

function toogleFavorite (state = initialState, action) {
    var { favoriteMovies } = state
    switch (action.type) {
        case 'TOOGLE_FAVORITE':
            if (!isIDInArray(favoriteMovies, action.value.id)){
                console.log("[toogleFavorite] push movie")
                favoriteMovies = [...favoriteMovies, action.value]
            }
            else{
                console.log("[toogleFavorite] pop movie")
                favoriteMovies = favoriteMovies.filter(movie => movie.id != action.value.id)
            }
            newState = {
            ...state,
            favoriteMovies: favoriteMovies
            }
            return newState
        default:
            return state
    }
}


export default toogleFavorite