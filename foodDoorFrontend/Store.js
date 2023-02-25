import { createStore, applyMiddleware } from 'redux'
import Reducer from './src/store/reducer'
import thunk from 'redux-thunk'

const Store = createStore(Reducer, applyMiddleware(thunk))
const getToken = () => Store?.getState()?.generalState?.token

export { Store, getToken }
