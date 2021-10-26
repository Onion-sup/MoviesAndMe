import { isIDInArray } from '../../utils/functions'

const initialState = { favoriteMovies: [] }

function toogleFavorite (state = initialState, action) {
    var { favoriteMovies } = state
    switch (action.type) {
        case 'TOOGLE_FAVORITE':
            if (!isIDInArray(favoriteMovies, action.value.id)){
                favoriteMovies = [...favoriteMovies, action.value]
            }
            else{
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