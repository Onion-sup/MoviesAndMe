import { createStore } from 'redux'
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
import toogleFavorite from './reducers/toogleFavorite'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, toogleFavorite)

export default createStore(persistedReducer)