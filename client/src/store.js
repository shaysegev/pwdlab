import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/RootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
}

export default store()