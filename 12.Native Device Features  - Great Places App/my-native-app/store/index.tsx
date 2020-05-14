import {combineReducers,createStore,applyMiddleware} from 'redux';
import { placeReducer } from './reducers/place';
import ReduxThunk from 'redux-thunk';

const reducer = combineReducers({
    place:placeReducer,

})

const store = createStore(reducer,applyMiddleware(ReduxThunk))

export type RootState = ReturnType<typeof reducer>;

export default store;

