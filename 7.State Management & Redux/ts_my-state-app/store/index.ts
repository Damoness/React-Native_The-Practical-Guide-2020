

import {createStore, combineReducers} from 'redux'
import {mealReducer} from './meal/reducers'
import {MealState} from './meal/types'


export type RootState = {
    meal:MealState
}

const store = createStore(combineReducers({
    meal:mealReducer
}))

export default store;