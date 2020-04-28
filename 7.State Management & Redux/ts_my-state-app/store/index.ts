

import {createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {mealReducer} from './meal/reducers'
import {MealState} from './meal/types'


export type RootState = {
    meal:MealState
}

const store = createStore(combineReducers({
    meal:mealReducer
}),__DEV__ && composeWithDevTools())

export default store;