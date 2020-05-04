import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {productReducer} from './product/reducers'
import {cartReducer} from './cart/reducers'
import {orderReducer} from './order/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    product:productReducer,
    cart:cartReducer,  
    order:orderReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk)))