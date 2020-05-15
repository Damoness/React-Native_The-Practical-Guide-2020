import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {productReducer} from './product/reducers'
import {cartReducer} from './cart/reducers'
import {orderReducer} from './order/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './auth/reducers'

const rootReducer = combineReducers({
    product:productReducer,
    cart:cartReducer,  
    order:orderReducer,
    auth:authReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk)))